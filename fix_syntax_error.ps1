$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
                        } else if (aid === 0x1A) {
                            foundCode = String.fromCharCode(decompressed[p+4], decompressed[p+3], decompressed[p+2], decompressed[p+1]);
                            totalLen = 10;
                        else if (aid === 0x1B || aid === 0x1C) {
"@

$newBlock = @"
                        } else if (aid === 0x1A) {
                            foundCode = String.fromCharCode(decompressed[p+4], decompressed[p+3], decompressed[p+2], decompressed[p+1]);
                            totalLen = 10;
                        } else if (aid === 0x1B || aid === 0x1C) {
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
