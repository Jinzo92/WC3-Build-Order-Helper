$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
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
"@

$newBlock = @"
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
"@

if ($content.Contains($oldBlock)) {
    $newContent = $content.Replace($oldBlock, $newBlock)
    [IO.File]::WriteAllText($path, $newContent)
    Write-Host "SUCCESS"
} else {
    Write-Host "FAILURE"
}
