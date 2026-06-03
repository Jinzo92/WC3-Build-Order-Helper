$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
                        } else if (aid === 0x1B || aid === 0x1C) { totalLen = 10; }
                        else if (aid === 0x21) { totalLen = 9; }
"@

$newBlock = @"
                        } else if (aid === 0x19) {
                            foundCode = String.fromCharCode(decompressed[p+4], decompressed[p+3], decompressed[p+2], decompressed[p+1]);
                            totalLen = 13;
                        } else if (aid === 0x1A) {
                            foundCode = String.fromCharCode(decompressed[p+4], decompressed[p+3], decompressed[p+2], decompressed[p+1]);
                            totalLen = 10;
                        } else if (aid === 0x1B || aid === 0x1C) { totalLen = 10; }
                        else if (aid === 0x21) { totalLen = 9; }
"@

if ($content.Contains($oldBlock)) {
    $newContent = $content.Replace($oldBlock, $newBlock)
    [IO.File]::WriteAllText($path, $newContent)
    Write-Host "SUCCESS"
} else {
    Write-Host "FAILURE"
}
