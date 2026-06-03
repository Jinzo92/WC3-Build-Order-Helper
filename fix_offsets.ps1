$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
                        const aid = decompressed[p++];
                        if (aid === 0x10) {
                            if (p + 13 <= actionEnd) {
                                const abilityCode = String.fromCharCode(decompressed[p+9], decompressed[p+10], decompressed[p+11], decompressed[p+12]);
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
                            p += 14;
"@

$newBlock = @"
                        const aid = decompressed[p++];
                        if (aid === 0x10) {
                            if (p + 6 <= actionEnd) {
                                // Action 0x10: Ability/Build/Train
                                // Offset 0: Flags (2 bytes), Offset 2: Ability Code (4 bytes)
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
                            p += 14;
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
