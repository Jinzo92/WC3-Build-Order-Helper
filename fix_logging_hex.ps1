$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
                                if (!actionName && abilityCode.trim().length === 4) {
                                    console.log("Skipping unknown code: " + abilityCode);
                                }
"@

$newBlock = @"
                                if (!actionName && abilityCode.trim().length === 4) {
                                    let hex = "";
                                    for(let j=0; j<8; j++) hex += (decompressed[p+j] || 0).toString(16).padStart(2, '0') + " ";
                                    console.log("Unknown Code: [" + abilityCode + "] Hex at p: " + hex);
                                }
"@

if ($content.Contains($oldBlock)) {
    $newContent = $content.Replace($oldBlock, $newBlock)
    [IO.File]::WriteAllText($path, $newContent)
    Write-Host "SUCCESS"
} else {
    Write-Host "FAILURE"
}
