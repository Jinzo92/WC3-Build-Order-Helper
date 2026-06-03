$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
                            if (aid === 0x10) { packetLen = 15; isBuildOrderAction = true; }
                            else if (aid === 0x11) { packetLen = 23; isBuildOrderAction = true; }
                            else if (aid === 0x12) { packetLen = 31; isBuildOrderAction = true; }
                            else if (aid === 0x13) { packetLen = 39; }
                            else if (aid === 0x14) { packetLen = 44; }
                            else if (aid === 0x16) { packetLen = 21; }
                            else if (aid === 0x17) { packetLen = 36; }
                            else if (aid === 0x1A) { packetLen = 2; }
"@

$newBlock = @"
                            if (aid === 0x10) { packetLen = 15; isBuildOrderAction = true; }
                            else if (aid === 0x11) { packetLen = 23; isBuildOrderAction = true; }
                            else if (aid === 0x12) { packetLen = 31; isBuildOrderAction = true; }
                            else if (aid === 0x19) { packetLen = 13; isBuildOrderAction = true; }
                            else if (aid === 0x1A) { packetLen = 10; isBuildOrderAction = true; }
                            else if (aid === 0x13) { packetLen = 39; }
                            else if (aid === 0x14) { packetLen = 44; }
                            else if (aid === 0x16) { packetLen = 21; }
                            else if (aid === 0x17) { packetLen = 36; }
"@

if ($content.Contains($oldBlock)) {
    $newContent = $content.Replace($oldBlock, $newBlock)
    [IO.File]::WriteAllText($path, $newContent)
    Write-Host "SUCCESS"
} else {
    Write-Host "FAILURE"
}
