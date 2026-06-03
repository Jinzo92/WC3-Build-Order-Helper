$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
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
                            if (actionName) {
                                bo.push({
                                    time: Math.floor(time / 1000),
                                    gold: 0, wood: 0, food: 0, foodMax: 0,
                                    action: actionName,
                                    icons: [actionName]
                                });
                            }
                        }
                        
                        if (skip > 0) p += skip;
                        else break; // Safety break
                    }
"@

$newBlock = @"
                    while (p < actionEnd) {
                        const pStart = p;
                        const aid = decompressed[p++];
                        let foundCode = "";
                        let totalLen = 0;

                        if (aid === 0x10) {
                            foundCode = String.fromCharCode(decompressed[p+4], decompressed[p+3], decompressed[p+2], decompressed[p+1]);
                            totalLen = 15;
                        } else if (aid === 0x11) {
                            foundCode = String.fromCharCode(decompressed[p+4], decompressed[p+3], decompressed[p+2], decompressed[p+1]);
                            totalLen = 23;
                        } else if (aid === 0x12) {
                            foundCode = String.fromCharCode(decompressed[p+4], decompressed[p+3], decompressed[p+2], decompressed[p+1]);
                            totalLen = 31;
                        } else if (aid === 0x13) { totalLen = 39; }
                        else if (aid === 0x14) { totalLen = 44; }
                        else if (aid === 0x16) { totalLen = 21; }
                        else if (aid === 0x17) { totalLen = 36; }
                        else if (aid === 0x1A) { totalLen = 2; }
                        else if (aid === 0x1B || aid === 0x1C) { totalLen = 10; }
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
