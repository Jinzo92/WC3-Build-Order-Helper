$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
                    if (actionLen > 0 && (myPlayerId === -1 || pid === myPlayerId)) {
                        // Scan entire action block for known codes
                        while (p < actionEnd - 3) {
                            const c1 = decompressed[p], c2 = decompressed[p+1], c3 = decompressed[p+2], c4 = decompressed[p+3];
                            const code1 = String.fromCharCode(c1, c2, c3, c4);
                            const code2 = String.fromCharCode(c4, c3, c2, c1);
                            const name = findActionNameByCode(code1) || findActionNameByCode(code2);
                            if (name) {
                                const curT = Math.floor(time/1000);
                                const last = bo[bo.length - 1];
                                // Deduplicate: Skip if same action at the exact same second
                                if (!last || last.action !== name || last.time !== curT) {
                                    bo.push({ time: curT, action: name, icons: [name], gold: 0, wood: 0, food: 0, foodMax: 0 });
                                }
                                p += 4;
                            } else { p++; }
                        }
                    }
"@

$newBlock = @"
                    if (actionLen > 0 && (myPlayerId === -1 || pid === myPlayerId)) {
                        while (p < actionEnd) {
                            const pStart = p;
                            const aid = decompressed[p++];
                            let packetLen = 0;
                            let isBuildOrderAction = false;

                            // ONLY scan packets that are actual commands (0x10, 0x11, 0x12)
                            if (aid === 0x10) { packetLen = 15; isBuildOrderAction = true; }
                            else if (aid === 0x11) { packetLen = 23; isBuildOrderAction = true; }
                            else if (aid === 0x12) { packetLen = 31; isBuildOrderAction = true; }
                            else if (aid === 0x13) { packetLen = 39; }
                            else if (aid === 0x14) { packetLen = 44; }
                            else if (aid === 0x16) { packetLen = 21; }
                            else if (aid === 0x17) { packetLen = 36; }
                            else if (aid === 0x1A) { packetLen = 2; }
                            else if (aid === 0x21) { packetLen = 9; }
                            else if (aid === 0x27 || aid === 0x28 || aid === 0x2D) { packetLen = 6; }
                            else if (aid === 0x2E) { packetLen = 5; }
                            
                            if (isBuildOrderAction) {
                                // Scan ONLY this specific command packet for a code
                                for (let i = 0; i < packetLen - 4; i++) {
                                    const checkPos = pStart + 1 + i;
                                    if (checkPos + 4 > actionEnd) break;
                                    const c1 = decompressed[checkPos], c2 = decompressed[checkPos+1], c3 = decompressed[checkPos+2], c4 = decompressed[checkPos+3];
                                    const code1 = String.fromCharCode(c1, c2, c3, c4);
                                    const code2 = String.fromCharCode(c4, c3, c2, c1);
                                    const name = findActionNameByCode(code1) || findActionNameByCode(code2);
                                    if (name) {
                                        const curT = Math.floor(time/1000);
                                        const last = bo[bo.length - 1];
                                        if (!last || last.action !== name || last.time !== curT) {
                                            bo.push({ time: curT, action: name, icons: [name], gold: 0, wood: 0, food: 0, foodMax: 0 });
                                        }
                                        break; 
                                    }
                                }
                            }
                            
                            if (packetLen > 0) p = pStart + packetLen;
                            else break;
                        }
                    }
"@

if ($content.Contains($oldBlock)) {
    $newContent = $content.Replace($oldBlock, $newBlock)
    [IO.File]::WriteAllText($path, $newContent)
    Write-Host "SUCCESS"
} else {
    $oldBlockNorm = $oldBlock.Replace("`r`n", "`n")
    $contentNorm = $content.Replace("`r`n", "`n")
    if ($contentNorm.Contains($oldBlockNorm)) {
        $newContentNorm = $contentNorm.Replace($oldBlockNorm, $newBlock.Replace("`r`n", "`n"))
        [IO.File]::WriteAllText($path, $newContentNorm)
        Write-Host "SUCCESS (NORMALIZED)"
    } else {
        Write-Host "FAILURE"
    }
}
