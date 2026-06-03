$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
                    // Robust Scan: search the entire action block for known 4-char codes
                    while (p < actionEnd - 4) {
                        const c1 = decompressed[p];
                        const c2 = decompressed[p+1];
                        const c3 = decompressed[p+2];
                        const c4 = decompressed[p+3];
                        
                        // Check if these 4 bytes form a valid unit/building code (fourCC)
                        const code1 = String.fromCharCode(c1, c2, c3, c4);
                        const code2 = String.fromCharCode(c4, c3, c2, c1);
                        
                        const action1 = findActionNameByCode(code1);
                        const action2 = findActionNameByCode(code2);
                        const finalAction = action1 || action2;

                        if (finalAction) {
                            bo.push({
                                time: Math.floor(time / 1000),
                                gold: 0, wood: 0, food: 0, foodMax: 0,
                                action: finalAction,
                                icons: [finalAction]
                            });
                            p += 4;
                        } else {
                            p++;
                        }
                    }
"@

$newBlock = @"
                    let lastActionTime = -1;
                    let lastActionName = "";

                    while (p < actionEnd) {
                        const aid = decompressed[p++];
                        let foundCode = "";
                        let skip = 0;

                        if (aid === 0x10) {
                            foundCode = String.fromCharCode(decompressed[p+5], decompressed[p+4], decompressed[p+3], decompressed[p+2]);
                            skip = 14;
                        } else if (aid === 0x11) {
                            foundCode = String.fromCharCode(decompressed[p+5], decompressed[p+4], decompressed[p+3], decompressed[p+2]);
                            skip = 22;
                        } else if (aid === 0x12) {
                            foundCode = String.fromCharCode(decompressed[p+5], decompressed[p+4], decompressed[p+3], decompressed[p+2]);
                            skip = 30;
                        } else if (aid === 0x13) { skip = 38; }
                        else if (aid === 0x14) { skip = 43; }
                        else if (aid === 0x16) { skip = 20; }
                        else if (aid === 0x17) { skip = 35; }
                        else if (aid === 0x1A) { skip = 1; }
                        else if (aid === 0x1B || aid === 0x1C) { skip = 9; }
                        else if (aid === 0x21) { skip = 8; }
                        else if (aid === 0x27 || aid === 0x28 || aid === 0x2D) { skip = 5; }
                        else if (aid === 0x2E) { skip = 4; }

                        if (foundCode) {
                            const actionName = findActionNameByCode(foundCode);
                            const currentTime = Math.floor(time / 1000);
                            
                            // Deduplicate: ignore same action within 1 second (prevents click spam)
                            if (actionName && (actionName !== lastActionName || currentTime > lastActionTime + 1)) {
                                bo.push({
                                    time: currentTime,
                                    gold: 0, wood: 0, food: 0, foodMax: 0,
                                    action: actionName,
                                    icons: [actionName]
                                });
                                lastActionName = actionName;
                                lastActionTime = currentTime;
                            }
                        }
                        
                        if (skip > 0) p += skip;
                        else break; // Safety break
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
