$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
                        } else if (aid === 0x11) {
                            p += 22;
                        } else if (aid === 0x12) {
                            p += 10;
"@

$newBlock = @"
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
