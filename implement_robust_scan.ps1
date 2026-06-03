$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
                    const actionEnd = p + actionLen;
                    while (p < actionEnd) {
                        const aid = decompressed[p++];
                        if (aid === 0x10) {
                            if (p + 6 <= actionEnd) {
                                // Action 0x10: Ability/Build/Train
                                // Offset 0: Flags (2 bytes), Offset 2: Ability Code (4 bytes)
                                const abilityCode = String.fromCharCode(decompressed[p+5], decompressed[p+4], decompressed[p+3], decompressed[p+2]);
                                const actionName = findActionNameByCode(abilityCode);
                                if (!actionName && abilityCode.trim().length === 4) {
                                    let hex = "";
                                    for(let j=0; j<8; j++) hex += (decompressed[p+j] || 0).toString(16).padStart(2, '0') + " ";
                                    console.log("Unknown Code: [" + abilityCode + "] Hex at p: " + hex);
                                }
                                if (actionName) {
                                    bo.push({
                                        time: Math.floor(time / 1000),
                                        gold: 0, wood: 0, food: 0, foodMax: 0,
                                        action: actionName,
                                        icons: [actionName]
                                    });
                                }
                            }
                            p += 14;
                        } else if (aid === 0x11) {
                            if (p + 6 <= actionEnd) {
                                const abilityCode = String.fromCharCode(decompressed[p+5], decompressed[p+4], decompressed[p+3], decompressed[p+2]);
                                const actionName = findActionNameByCode(abilityCode);
                                if (actionName) {
                                    bo.push({
                                        time: Math.floor(time / 1000),
                                        gold: 0, wood: 0, food: 0, foodMax: 0,
                                        action: actionName,
                                        icons: [actionName]
                                    });
                                }
                            }
                            p += 22;
                        } else if (aid === 0x12) {
                            if (p + 6 <= actionEnd) {
                                const abilityCode = String.fromCharCode(decompressed[p+5], decompressed[p+4], decompressed[p+3], decompressed[p+2]);
                                const actionName = findActionNameByCode(abilityCode);
                                if (actionName) {
                                    bo.push({
                                        time: Math.floor(time / 1000),
                                        gold: 0, wood: 0, food: 0, foodMax: 0,
                                        action: actionName,
                                        icons: [actionName]
                                    });
                                }
                            }
                            p += 30; // 0x12 is usually 30+ bytes (Target Order)
"@

$newBlock = @"
                    const actionEnd = p + actionLen;
                    // Robust Scan: search the entire action block for known 4-char codes
                    while (p < actionEnd - 4) {
                        const c1 = decompressed[p];
                        const c2 = decompressed[p+1];
                        const c3 = decompressed[p+2];
                        const c4 = decompressed[p+3];
                        
                        // Check if these 4 bytes form a valid ASCII unit/building code
                        if (c1 >= 97 && c1 <= 122 && c2 >= 97 && c2 <= 122) {
                            const abilityCode = String.fromCharCode(c1, c2, c3, c4);
                            const actionName = findActionNameByCode(abilityCode);
                            if (actionName) {
                                bo.push({
                                    time: Math.floor(time / 1000),
                                    gold: 0, wood: 0, food: 0, foodMax: 0,
                                    action: actionName,
                                    icons: [actionName]
                                });
                                p += 4; // Skip the code we found
                                continue;
                            }
                        }
                        // Support for Hero codes (start with uppercase)
                        if (c1 >= 65 && c1 <= 90 && c2 >= 97 && c2 <= 122) {
                            const abilityCode = String.fromCharCode(c1, c2, c3, c4);
                            const actionName = findActionNameByCode(abilityCode);
                            if (actionName) {
                                bo.push({
                                    time: Math.floor(time / 1000),
                                    gold: 0, wood: 0, food: 0, foodMax: 0,
                                    action: actionName,
                                    icons: [actionName]
                                });
                                p += 4;
                                continue;
                            }
                        }
                        p++;
                    }
                    p = actionEnd;
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
