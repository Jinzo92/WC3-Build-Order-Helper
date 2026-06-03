$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
                    while (p < actionEnd) {
                        const pStart = p;
                        const aid = decompressed[p++];
                        let foundCode = "";
                        let totalLen = 0;

                        if (aid === 0x10) {
                            foundCode = String.fromCharCode(decompressed[p+5], decompressed[p+4], decompressed[p+3], decompressed[p+2]);
                            totalLen = 15;
                        } else if (aid === 0x11) {
                            foundCode = String.fromCharCode(decompressed[p+5], decompressed[p+4], decompressed[p+3], decompressed[p+2]);
                            totalLen = 23;
                        } else if (aid === 0x12) {
                            foundCode = String.fromCharCode(decompressed[p+5], decompressed[p+4], decompressed[p+3], decompressed[p+2]);
                            totalLen = 31;
                        } else if (aid === 0x13) { totalLen = 39; }
                        else if (aid === 0x14) { totalLen = 44; }
                        else if (aid === 0x16) { totalLen = 21; }
                        else if (aid === 0x17) { totalLen = 36; }
                        else if (aid === 0x19) {
                            foundCode = String.fromCharCode(decompressed[p+4], decompressed[p+3], decompressed[p+2], decompressed[p+1]);
                            totalLen = 13;
                        } else if (aid === 0x1A) {
                            foundCode = String.fromCharCode(decompressed[p+4], decompressed[p+3], decompressed[p+2], decompressed[p+1]);
                            totalLen = 10;
                        } else if (aid === 0x1B || aid === 0x1C) { totalLen = 10; }
                        else if (aid === 0x21) { totalLen = 9; }
                        else if (aid === 0x27 || aid === 0x28 || aid === 0x2D) { totalLen = 6; }
                        else if (aid === 0x2E) { totalLen = 5; }
                        else if (aid === 0x60 || aid === 0x61 || aid === 0x62) { totalLen = 9; }
                        else if (aid === 0x6B) { totalLen = 10; }

                        if (foundCode) {
                            const actionName = findActionNameByCode(foundCode);
                            if (actionName) {
                                bo.push({
                                    time: Math.floor(time / 1000),
                                    gold: 0, wood: 0, food: 0, foodMax: 0,
                                    action: actionName,
                                    icons: [actionName]
                                });
                            }
                        }
                        
                        if (totalLen > 0) p = pStart + totalLen;
                        else break; 
                    }
"@

$newBlock = @"
                    while (p < actionEnd) {
                        const pStart = p;
                        const aid = decompressed[p++];
                        let totalLen = 0;

                        // Identify packet length first
                        if (aid === 0x10) { totalLen = 15; } 
                        else if (aid === 0x11) { totalLen = 23; } 
                        else if (aid === 0x12) { totalLen = 31; } 
                        else if (aid === 0x13) { totalLen = 39; }
                        else if (aid === 0x14) { totalLen = 44; }
                        else if (aid === 0x16) { totalLen = 21; }
                        else if (aid === 0x17) { totalLen = 36; }
                        else if (aid === 0x19) { totalLen = 13; }
                        else if (aid === 0x1A) { totalLen = 10; }
                        else if (aid === 0x1B || aid === 0x1C) { totalLen = 10; }
                        else if (aid === 0x21) { totalLen = 9; }
                        else if (aid === 0x27 || aid === 0x28 || aid === 0x2D) { totalLen = 6; }
                        else if (aid === 0x2E) { totalLen = 5; }
                        else if (aid === 0x60 || aid === 0x61 || aid === 0x62) { totalLen = 9; }
                        else if (aid === 0x6B) { totalLen = 10; }

                        if (totalLen > 0) {
                            // Multi-Offset Scan within this packet
                            // We look for ANY known code at any valid position in the packet
                            for (let offset = 0; offset < totalLen - 4; offset++) {
                                const checkPos = pStart + 1 + offset;
                                const c1 = decompressed[checkPos];
                                const c2 = decompressed[checkPos+1];
                                const c3 = decompressed[checkPos+2];
                                const c4 = decompressed[checkPos+3];
                                
                                const code1 = String.fromCharCode(c1, c2, c3, c4);
                                const code2 = String.fromCharCode(c4, c3, c2, c1);
                                
                                const action1 = findActionNameByCode(code1);
                                const action2 = findActionNameByCode(code2);
                                const finalAction = action1 || action2;

                                if (finalAction) {
                                    // Add only if not a duplicate in the SAME packet
                                    bo.push({
                                        time: Math.floor(time / 1000),
                                        gold: 0, wood: 0, food: 0, foodMax: 0,
                                        action: finalAction,
                                        icons: [finalAction]
                                    });
                                    break; // Found one code in this packet, move to next packet
                                }
                            }
                            p = pStart + totalLen;
                        } else {
                            break; 
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
