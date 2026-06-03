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
                        // This handles Little Endian as well by checking both orientations
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
                            continue;
                        }
                        p++;
                        } else if (aid === 0x13) {
                            p += 38;
                        } else if (aid === 0x14) {
                            p += 43;
                        } else if (aid === 0x16) {
                            p += 20;
                        } else if (aid === 0x17) {
                            p += 35;
                        } else if (aid === 0x18) {
                            p += 2;
                        } else if (aid === 0x19) {
                            p += 2;
                        } else if (aid === 0x1A) {
                            p += 1;
                        } else if (aid === 0x1B) {
                            p += 9;
                        } else if (aid === 0x1C) {
                            p += 9;
                        } else if (aid === 0x1D) {
                            p += 1;
                        } else if (aid === 0x21) {
                            p += 8;
                        } else if (aid === 0x27 || aid === 0x28 || aid === 0x2D) {
                            p += 5;
                        } else if (aid === 0x2E) {
                            p += 4;
                        } else if (aid === 0x60 || aid === 0x61 || aid === 0x62) {
                            p += 8;
                        } else if (aid === 0x6B) {
                            p += 9;
                        } else {
                            break;
                        }
                    }
"@

$newBlock = @"
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
