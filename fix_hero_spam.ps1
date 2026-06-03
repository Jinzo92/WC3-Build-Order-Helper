$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
                                        const curT = Math.floor(time/1000);
                                        const last = bo[bo.length - 1];
                                        if (!last || last.action !== name || last.time !== curT) {
                                            bo.push({ time: curT, action: name, icons: [name], gold: 0, wood: 0, food: 0, foodMax: 0 });
                                        }
"@

$newBlock = @"
                                        const curT = Math.floor(time/1000);
                                        const last = bo[bo.length - 1];
                                        const isHero = ['Archmage', 'Paladin', 'Mountain King', 'Blood Mage', 'Blademaster', 'Far Seer', 'Tauren Chieftain', 'Shadow Hunter', 'Death Knight', 'Lich', 'Dreadlord', 'Crypt Lord', 'Keeper of the Grove', 'Priestess of the Moon', 'Demon Hunter', 'Warden'].includes(name);
                                        const alreadyHasHero = isHero && bo.some(entry => entry.action === name);
                                        
                                        if (!alreadyHasHero) {
                                            if (!last || last.action !== name || last.time !== curT) {
                                                bo.push({ time: curT, action: name, icons: [name], gold: 0, wood: 0, food: 0, foodMax: 0 });
                                            }
                                        }
"@

if ($content.Contains($oldBlock)) {
    $newContent = $content.Replace($oldBlock, $newBlock)
    [IO.File]::WriteAllText($path, $newContent)
    Write-Host "SUCCESS"
} else {
    Write-Host "FAILURE"
}
