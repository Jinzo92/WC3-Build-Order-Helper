$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @'
                                        // Categorization
                                        const heroes = ['Archmage', 'Paladin', 'Mountain King', 'Blood Mage', 'Blademaster', 'Far Seer', 'Tauren Chieftain', 'Shadow Hunter', 'Death Knight', 'Lich', 'Dreadlord', 'Crypt Lord', 'Keeper of the Grove', 'Priestess of the Moon', 'Demon Hunter', 'Warden'];
                                        const buildings = ['Farm', 'Scout Tower', 'Altar of Kings', 'Barracks', 'Blacksmith', 'Castle', 'Keep', 'Town Hall', 'Lumber Mill', 'Arcane Sanctum', 'Workshop', 'Arcane Vault', 'Guard Tower', 'Cannon Tower', 'Arcane Tower', 'Great Hall', 'Stronghold', 'Fortress', 'Altar of Storms', 'War Mill', 'Beastiary', 'Spirit Lodge', 'Tauren Totem', 'Voodoo Lounge', 'Orc Burrow', 'Watch Tower'];
                                        
                                        const isHero = heroes.includes(name);
                                        const isBuilding = buildings.includes(name);
                                        
                                        // Deduplication Rules
                                        let shouldAdd = false;
                                        if (isHero) {
                                            // Heroes: Only the very first occurrence in the whole game
                                            if (!bo.some(entry => entry.action === name)) shouldAdd = true;
                                        } else if (isBuilding) {
                                            // Buildings: Once per second (allow fast placement)
                                            if (!last || last.action !== name || last.time !== curT) shouldAdd = true;
                                        } else {
                                            // Units/Items: 2-second cooldown to filter selection/spam clicks
                                            const lastOfSameType = [...bo].reverse().find(entry => entry.action === name);
                                            if (!lastOfSameType || (curT - lastOfSameType.time) > 2) shouldAdd = true;
                                        }

                                        if (shouldAdd) {
                                            bo.push({ time: curT, action: name, icons: [name], gold: 0, wood: 0, food: 0, foodMax: 0 });
                                        }
'@

$newBlock = @'
                                        const curT = Math.floor(time/1000);
                                        const last = bo[bo.length - 1];
                                        const isHero = ['Archmage', 'Paladin', 'Mountain King', 'Blood Mage', 'Blademaster', 'Far Seer', 'Tauren Chieftain', 'Shadow Hunter', 'Death Knight', 'Lich', 'Dreadlord', 'Crypt Lord', 'Keeper of the Grove', 'Priestess of the Moon', 'Demon Hunter', 'Warden'].includes(name);
                                        
                                        let shouldAdd = false;
                                        if (isHero) {
                                            if (!bo.some(e => e.action === name)) shouldAdd = true;
                                        } else {
                                            // Normal Units/Buildings: Deduplicate only if exact same time and action
                                            if (!last || last.action !== name || last.time !== curT) shouldAdd = true;
                                        }

                                        if (shouldAdd) {
                                            bo.push({ time: curT, action: name, icons: [name], gold: 0, wood: 0, food: 0, foodMax: 0 });
                                        }
'@

if ($content.Contains($oldBlock)) {
    $newContent = $content.Replace($oldBlock, $newBlock)
    [IO.File]::WriteAllText($path, $newContent)
    Write-Host "SUCCESS"
} else {
    Write-Host "FAILURE"
}
