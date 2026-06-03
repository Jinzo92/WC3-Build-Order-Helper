$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$newFunction = @"
async function handleReplayUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (typeof pako === 'undefined') {
        alert("Error: The compression library (pako) could not be loaded. If you are running this locally via file://, your browser might be blocking external scripts.");
        return;
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        
        if (data.length < 48) throw new Error("File too small to be a WC3 replay.");

        const headerSize = data[28] | (data[29] << 8) | (data[30] << 16) | (data[31] << 24);
        const buildNo = data[56] | (data[57] << 8);
        const isReforged = buildNo >= 6089;
        const blockHeaderSize = isReforged ? 12 : 8;
        
        let decompressed = new Uint8Array(0);
        let pos = headerSize;

        while (pos < data.length - blockHeaderSize) {
            const blockSize = data[pos] | (data[pos+1] << 8);
            if (blockSize === 0) break;
            
            pos += blockHeaderSize;
            if (pos + blockSize > data.length) break;

            try {
                const block = data.slice(pos, pos + blockSize);
                const inflator = new pako.Inflate();
                inflator.push(block, 2); 
                
                let inflated;
                if (inflator.strm && inflator.strm.output && inflator.strm.next_out > 0) {
                    inflated = inflator.strm.output.subarray(0, inflator.strm.next_out);
                }
                
                if (inflated && inflated.length > 0) {
                    const newDecomp = new Uint8Array(decompressed.length + inflated.length);
                    newDecomp.set(decompressed);
                    newDecomp.set(inflated, decompressed.length);
                    decompressed = newDecomp;
                }
            } catch (inflateErr) { console.warn(inflateErr); }
            pos += blockSize;
        }

        if (decompressed.length === 0) throw new Error("Decompression failed.");

        const bo = [];
        let time = 0;
        let myPlayerId = -1;

        // Detect Player ID for "jinzo"
        for (let i = 0; i < Math.min(decompressed.length, 10000); i++) {
            if (decompressed[i] === 0x10) {
                let pName = "";
                for(let j=i+6; j<i+60 && decompressed[j] !== 0; j++) pName += String.fromCharCode(decompressed[j]);
                if (pName.toLowerCase().includes("jinzo")) {
                    myPlayerId = decompressed[i+1];
                    console.log("Detected Player ID: " + myPlayerId);
                    break;
                }
            }
        }

        // Find Game Data Start
        let dPos = -1;
        for (let i = 0; i < decompressed.length - 100; i++) {
            if (decompressed[i] === 0x1F || decompressed[i] === 0x1E) {
                dPos = i;
                break;
            }
        }

        if (dPos === -1) throw new Error("Could not find start of Game Data stream.");

        while (dPos < decompressed.length - 2) {
            const blockId = decompressed[dPos];
            if (blockId === 0x1F || blockId === 0x1E) {
                const bc = decompressed[dPos+1] | (decompressed[dPos+2] << 8);
                const dt = decompressed[dPos+3] | (decompressed[dPos+4] << 8);
                time += dt;
                
                let p = dPos + 5;
                const end = dPos + 3 + bc;
                
                while (p < end - 3) {
                    const pid = decompressed[p++];
                    const actionLen = decompressed[p] | (decompressed[p+1] << 8);
                    p += 2;
                    const actionEnd = Math.min(p + actionLen, end);
                    
                    if (actionLen > 0 && (myPlayerId === -1 || pid === myPlayerId)) {
                        // Scan entire action block for known codes
                        while (p < actionEnd - 3) {
                            const c1 = decompressed[p], c2 = decompressed[p+1], c3 = decompressed[p+2], c4 = decompressed[p+3];
                            const code1 = String.fromCharCode(c1, c2, c3, c4);
                            const code2 = String.fromCharCode(c4, c3, c2, c1);
                            const name = findActionNameByCode(code1) || findActionNameByCode(code2);
                            if (name) {
                                bo.push({ time: Math.floor(time/1000), action: name, icons: [name], gold: 0, wood: 0, food: 0, foodMax: 0 });
                                p += 4;
                            } else { p++; }
                        }
                    }
                    p = actionEnd;
                }
                dPos = end;
            } else if (blockId === 0x20) {
                const len = decompressed[dPos+2] | (decompressed[dPos+3] << 8);
                dPos += 4 + len;
            } else if (blockId === 0x22) { dPos += (2 + decompressed[dPos+1]); }
            else if (blockId === 0x17) { dPos += 13; }
            else if (blockId === 0x23) { dPos += 11; }
            else if (blockId === 0x2F) { dPos += 9; }
            else { dPos++; }
        }

        if (bo.length > 0) {
            applyBuildOrder(bo, file.name.replace('.w3g', ''));
        } else {
            alert("No build actions found for your player in this replay.");
        }

    } catch (err) {
        console.error(err);
        alert("Error parsing replay: " + err.message);
    }
    e.target.value = '';
}
"@

# Define the start and end patterns for the function to replace
$startPattern = "async function handleReplayUpload(e) {"
$endPattern = "e.target.value = '';" # This is near the end of the function

# Find the start and end indices
$startIndex = $content.IndexOf($startPattern)
$endIndex = $content.IndexOf($endPattern, $startIndex)
if ($startIndex -ge 0 -and $endIndex -gt $startIndex) {
    # Move endIndex to the end of the line containing the pattern and the following '}'
    $endOfLine = $content.IndexOf("}", $endIndex)
    $afterFunction = $endOfLine + 1
    
    $newContent = $content.Substring(0, $startIndex) + $newFunction + $content.Substring($afterFunction)
    [IO.File]::WriteAllText($path, $newContent)
    Write-Host "SUCCESS"
} else {
    Write-Host "FAILURE: Could not find function boundaries ($startIndex, $endIndex)"
}
