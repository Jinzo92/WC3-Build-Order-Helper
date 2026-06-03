$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
                            if (name) {
                                bo.push({ time: Math.floor(time/1000), action: name, icons: [name], gold: 0, wood: 0, food: 0, foodMax: 0 });
                                p += 4;
                            } else { p++; }
"@

$newBlock = @"
                            if (name) {
                                const curT = Math.floor(time/1000);
                                const last = bo[bo.length - 1];
                                // Deduplicate: Skip if same action at the exact same second
                                if (!last || last.action !== name || last.time !== curT) {
                                    bo.push({ time: curT, action: name, icons: [name], gold: 0, wood: 0, food: 0, foodMax: 0 });
                                }
                                p += 4;
                            } else { p++; }
"@

if ($content.Contains($oldBlock)) {
    $newContent = $content.Replace($oldBlock, $newBlock)
    [IO.File]::WriteAllText($path, $newContent)
    Write-Host "SUCCESS"
} else {
    Write-Host "FAILURE"
}
