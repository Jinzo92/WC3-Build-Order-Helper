$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$logMsg = "console.log('--- REPLAY PARSER v2.0 LOADED ---');`n"
if (-not $content.StartsWith("console.log")) {
    $content = $logMsg + $content
    [IO.File]::WriteAllText($path, $content)
    Write-Host "SUCCESS"
} else {
    Write-Host "ALREADY ADDED"
}
