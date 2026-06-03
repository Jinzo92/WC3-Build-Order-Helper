$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
const ABILITY_CODES = {
    'hpea': 'Peasant', 'hfoo': 'Footman', 'hkni': 'Knight', 'hrit': 'Rifleman', 'hmtm': 'Mortar Team',
    'hgyr': 'Flying Machine', 'hgry': 'Gryphon Rider', 'hsor': 'Sorceress', 'hpri': 'Priest', 'hmsy': 'Spellbreaker',
    'hwat': 'Water Elemental', 'hpal': 'Paladin', 'hamg': 'Archmage', 'hmtk': 'Mountain King', 'hblm': 'Blood Mage',
    'hhou': 'Farm', 'hwtw': 'Scout Tower', 'halt': 'Altar of Kings', 'hbar': 'Barracks', 'hbla': 'Blacksmith',
    'hcas': 'Castle', 'hkee': 'Keep', 'htow': 'Town Hall', 'hlum': 'Lumber Mill', 'hars': 'Arcane Sanctum',
    'hwsy': 'Workshop', 'hvlt': 'Arcane Vault', 'hgtw': 'Guard Tower', 'hatw': 'Cannon Tower', 'hbtw': 'Arcane Tower',
    
    'opeo': 'Peon', 'ogru': 'Grunt', 'orai': 'Raider', 'otae': 'Tauren', 'otrj': 'Troll Headhunter',
    'ocat': 'Demolisher', 'okod': 'Kodo Beast', 'owyv': 'Wind Rider', 'odoc': 'Witch Doctor', 'oshm': 'Shaman',
    'ospw': 'Spirit Walker', 'ofar': 'Far Seer', 'otch': 'Tauren Chieftain', 'oshd': 'Shadow Hunter', 'obm': 'Blademaster',
    'ogre': 'Great Hall', 'ostr': 'Stronghold', 'ofor': 'Fortress', 'oalt': 'Altar of Storms', 'obar': 'Barracks',
    'ofor': 'War Mill', 'obea': 'Beastiary', 'oshy': 'Spirit Lodge', 'otau': 'Tauren Totem', 'ovoo': 'Voodoo Lounge',
    'obur': 'Orc Burrow', 'owtg': 'Watch Tower',
    
    'uaco': 'Acolyte', 'ugho': 'Ghoul', 'ucrypt': 'Crypt Fiend', 'uabo': 'Abomination', 'umvc': 'Meat Wagon',
    'uobs': 'Obsidian Statue', 'ufro': 'Frost Wyrm', 'ugar': 'Gargoyle', 'uban': 'Banshee', 'unec': 'Necromancer',
    'udkn': 'Death Knight', 'ulch': 'Lich', 'udrd': 'Dreadlord', 'ucry': 'Crypt Lord',
    'unec': 'Necropolis', 'uhall': 'Halls of the Dead', 'ublk': 'Black Citadel', 'uabc': 'Altar of Darkness',
    'uzig': 'Ziggurat', 'unp1': 'Nerubian Tower', 'unp2': 'Spirit Tower', 'ugra': 'Graveyard', 'ucry': 'Crypt',
    'utem': 'Temple of the Damned', 'uslh': 'Slaughterhouse', 'uapb': 'Ancient Protectors', 'utom': 'Tomb of Relics',
    
    'ewsp': 'Wisp', 'earc': 'Archer', 'hunt': 'Huntress', 'ebal': 'Glaive Thrower', 'edry': 'Dryad',
    'edon': 'Druid of the Claw', 'edoc': 'Druid of the Talon', 'emtg': 'Mountain Giant', 'ehip': 'Hippogryph',
    'efon': 'Treant', 'edem': 'Demon Hunter', 'ekee': 'Keeper of the Grove', 'emgp': 'Priestess of the Moon', 'ewrd': 'Warden',
    'etoe': 'Tree of Life', 'etoa': 'Tree of Ages', 'etoe': 'Tree of Eternity', 'eate': 'Altar of Elders',
    'eaoo': 'Ancient of War', 'eaom': 'Ancient of Lore', 'eaoe': 'Ancient of Wind', 'eaol': 'Ancient of Lore',
    'eden': 'Ancient of Wonders', 'eate': 'Ancient Protector', 'emow': 'Moon Well', 'edhr': 'Hunter\'s Hall'
};
"@

$newBlock = @"
const ABILITY_CODES = {
    // Human Units
    'hpea': 'Peasant', 'hfoo': 'Footman', 'hkni': 'Knight', 'hrit': 'Rifleman', 'hmtm': 'Mortar Team',
    'hgyr': 'Flying Machine', 'hgry': 'Gryphon Rider', 'hsor': 'Sorceress', 'hpri': 'Priest', 'hmsy': 'Spellbreaker',
    'hpal': 'Paladin', 'hamg': 'Archmage', 'hmtk': 'Mountain King', 'hblm': 'Blood Mage',
    // Human Buildings
    'hhou': 'Farm', 'hwtw': 'Scout Tower', 'halt': 'Altar of Kings', 'hbar': 'Barracks', 'hbla': 'Blacksmith',
    'hcas': 'Castle', 'hkee': 'Keep', 'htow': 'Town Hall', 'hlum': 'Lumber Mill', 'hars': 'Arcane Sanctum',
    'hwsy': 'Workshop', 'hvlt': 'Arcane Vault', 'hgtw': 'Guard Tower', 'hatw': 'Cannon Tower', 'hbtw': 'Arcane Tower',

    // Orc Units
    'opeo': 'Peon', 'ogru': 'Grunt', 'orai': 'Raider', 'otae': 'Tauren', 'ohun': 'Troll Headhunter',
    'ocat': 'Demolisher', 'okod': 'Kodo Beast', 'owyv': 'Wind Rider', 'odoc': 'Witch Doctor', 'oshm': 'Shaman',
    'ospw': 'Spirit Walker', 'ofar': 'Far Seer', 'otch': 'Tauren Chieftain', 'oshd': 'Shadow Hunter', 'obla': 'Blademaster',
    // Orc Buildings
    'ogre': 'Great Hall', 'ostr': 'Stronghold', 'ofor': 'Fortress', 'oalt': 'Altar of Storms', 'obar': 'Barracks',
    'owam': 'War Mill', 'obea': 'Beastiary', 'osly': 'Spirit Lodge', 'otau': 'Tauren Totem', 'ovoo': 'Voodoo Lounge',
    'obur': 'Orc Burrow', 'owtg': 'Watch Tower',

    // Undead Units
    'uaco': 'Acolyte', 'ugho': 'Ghoul', 'ucry': 'Crypt Fiend', 'uabo': 'Abomination', 'umvc': 'Meat Wagon',
    'uobs': 'Obsidian Statue', 'ufro': 'Frost Wyrm', 'ugar': 'Gargoyle', 'uban': 'Banshee', 'unec': 'Necromancer',
    'udea': 'Death Knight', 'ulic': 'Lich', 'udre': 'Dreadlord', 'uclp': 'Crypt Lord',
    // Undead Buildings
    'unec': 'Necropolis', 'uhal': 'Halls of the Dead', 'ublk': 'Black Citadel', 'uabc': 'Altar of Darkness',
    'uzig': 'Ziggurat', 'unp1': 'Nerubian Tower', 'unp2': 'Spirit Tower', 'ugra': 'Graveyard', 'ucry': 'Crypt',
    'utem': 'Temple of the Damned', 'uslh': 'Slaughterhouse', 'utom': 'Tomb of Relics',

    // Night Elf Units
    'ewsp': 'Wisp', 'earc': 'Archer', 'hunt': 'Huntress', 'ebal': 'Glaive Thrower', 'edry': 'Dryad',
    'edoc': 'Druid of the Claw', 'edot': 'Druid of the Talon', 'emtg': 'Mountain Giant', 'ehip': 'Hippogryph',
    'edem': 'Demon Hunter', 'ekee': 'Keeper of the Grove', 'epri': 'Priestess of the Moon', 'ewrd': 'Warden',
    // Night Elf Buildings
    'etol': 'Tree of Life', 'etoa': 'Tree of Ages', 'etoe': 'Tree of Eternity', 'eate': 'Altar of Elders',
    'eaoo': 'Ancient of War', 'eaom': 'Ancient of Lore', 'eaoe': 'Ancient of Wind', 'eaow': 'Ancient of Wonders', 
    'emow': 'Moon Well', 'edhr': 'Hunter\'s Hall', 'eate': 'Ancient Protector'
};
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
