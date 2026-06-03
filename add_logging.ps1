$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
                                const actionName = findActionNameByCode(abilityCode);
                                if (actionName) {
                                    bo.push({
"@

$newBlock = @"
                                const actionName = findActionNameByCode(abilityCode);
                                if (actionName) {
                                    bo.push({
"@

# I want to add the console.log if actionName is NOT found
$oldBlock2 = @"
                                const actionName = findActionNameByCode(abilityCode);
                                if (actionName) {
"@

$newBlock2 = @"
                                const actionName = findActionNameByCode(abilityCode);
                                if (!actionName && abilityCode.trim().length === 4) {
                                    console.log("Skipping unknown code: " + abilityCode);
                                }
                                if (actionName) {
"@

if ($content.Contains($oldBlock2)) {
    $newContent = $content.Replace($oldBlock2, $newBlock2)
    [IO.File]::WriteAllText($path, $newContent)
    Write-Host "SUCCESS"
} else {
    Write-Host "FAILURE"
}
