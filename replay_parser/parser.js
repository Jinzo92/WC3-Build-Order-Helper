const W3GReplay = require('w3gjs').default || require('w3gjs');
const fs = require('fs');
const path = require('path');

// MONKEY PATCH: Disable chat to avoid the crash
W3GReplay.prototype.handleChatMessage = function() {};

const ABILITY_CODES = {
    'hpea': 'Peasant', 'hfoo': 'Footman', 'hkni': 'Knight', 'hrit': 'Rifleman', 'hmtm': 'Mortar Team',
    'hgyr': 'Flying Machine', 'hgry': 'Gryphon Rider', 'hsor': 'Sorceress', 'hpri': 'Priest', 'hmsy': 'Spellbreaker',
    'hpal': 'Paladin', 'hamg': 'Archmage', 'hmtk': 'Mountain King', 'hblm': 'Blood Mage',
    'hhou': 'Farm', 'hwtw': 'Scout Tower', 'halt': 'Altar of Kings', 'hbar': 'Barracks', 'hbla': 'Blacksmith',
    'hcas': 'Castle', 'hkee': 'Keep', 'htow': 'Town Hall', 'hlum': 'Lumber Mill', 'hars': 'Arcane Sanctum',
    'hwsy': 'Workshop', 'hvlt': 'Arcane Vault', 'hgtw': 'Guard Tower', 'hatw': 'Cannon Tower', 'hbtw': 'Arcane Tower',
    'opeo': 'Peon', 'ogru': 'Grunt', 'orai': 'Raider', 'otae': 'Tauren', 'ohun': 'Troll Headhunter',
    'ocat': 'Demolisher', 'okod': 'Kodo Beast', 'owyv': 'Wind Rider', 'odoc': 'Witch Doctor', 'oshm': 'Shaman',
    'ospw': 'Spirit Walker', 'ofar': 'Far Seer', 'otch': 'Tauren Chieftain', 'oshd': 'Shadow Hunter', 'obla': 'Blademaster',
    'ogre': 'Great Hall', 'ostr': 'Stronghold', 'ofor': 'Fortress', 'oalt': 'Altar of Storms', 'obar': 'Barracks',
    'owam': 'War Mill', 'obea': 'Beastiary', 'osly': 'Spirit Lodge', 'otau': 'Tauren Totem', 'ovoo': 'Voodoo Lounge',
    'obur': 'Orc Burrow', 'owtg': 'Watch Tower',
    'uaco': 'Acolyte', 'ugho': 'Ghoul', 'ucry': 'Crypt Fiend', 'uabo': 'Abomination', 'umvc': 'Meat Wagon',
    'uobs': 'Obsidian Statue', 'ufro': 'Frost Wyrm', 'ugar': 'Gargoyle', 'uban': 'Banshee', 'unec': 'Necromancer',
    'udea': 'Death Knight', 'ulic': 'Lich', 'udre': 'Dreadlord', 'uclp': 'Crypt Lord',
    'unec': 'Necropolis', 'uhal': 'Halls of the Dead', 'ublk': 'Black Citadel', 'uabc': 'Altar of Darkness',
    'uzig': 'Ziggurat', 'unp1': 'Nerubian Tower', 'unp2': 'Spirit Tower', 'ugra': 'Graveyard', 'ucry': 'Crypt',
    'utem': 'Temple of the Damned', 'uslh': 'Slaughterhouse', 'utom': 'Tomb of Relics',
    'ewsp': 'Wisp', 'earc': 'Archer', 'hunt': 'Huntress', 'ebal': 'Glaive Thrower', 'edry': 'Dryad',
    'edoc': 'Druid of the Claw', 'edot': 'Druid of the Talon', 'emtg': 'Mountain Giant', 'ehip': 'Hippogryph',
    'edem': 'Demon Hunter', 'ekee': 'Keeper of the Grove', 'epri': 'Priestess of the Moon', 'ewrd': 'Warden',
    'etol': 'Tree of Life', 'etoa': 'Tree of Ages', 'etoe': 'Tree of Eternity', 'eate': 'Altar of Elders',
    'eaoo': 'Ancient of War', 'eaom': 'Ancient of Lore', 'eaoe': 'Ancient of Wind', 'eaow': 'Ancient of Wonders', 
    'emow': 'Moon Well', 'edhr': 'Hunter\'s Hall', 'eate': 'Ancient Protector'
};

const HEROES = [
    'Archmage', 'Paladin', 'Mountain King', 'Blood Mage', 'Blademaster', 'Far Seer', 'Tauren Chieftain', 'Shadow Hunter', 
    'Death Knight', 'Lich', 'Dreadlord', 'Crypt Lord', 'Keeper of the Grove', 'Priestess of the Moon', 'Demon Hunter', 'Warden'
];

async function parse(replayPath) {
    const replay = new W3GReplay();
    
    const playerStats = {}; // Store BOs per player ID
    const playerNames = {};

    replay.on('player', (p) => {
        playerNames[p.id] = p.name;
        if (!playerStats[p.id]) playerStats[p.id] = { bo: [], heroes: new Set(), lastAction: "", lastTime: -1, race: p.race };
        console.log(`Detected Player: ${p.name} (ID: ${p.id})`);
    });

    // Keep track of actions for each player ID
    const playerActions = {};
    
    // Fallback names for IDs 1-12 in case the library is slow to identify them
    const fallbackNames = {
        1: "Player_1", 2: "Player_2", 3: "Player_3", 4: "Player_4",
        5: "Player_5", 6: "Player_6", 7: "Player_7", 8: "Player_8"
    };

    replay.on('action', (action, player) => {
        const playerId = action.playerId || (player ? player.id : null);
        if (!playerId) return;

        if (!playerActions[playerId]) {
            playerActions[playerId] = [];
        }

        // Catch-all for ANY action that has a code
        const code = action.itemId || action.abilityId || action.buildingId;
        
        if (code) {
            // Check if we know it, otherwise keep it as 'Unknown'
            const info = ABILITY_CODES[code];
            playerActions[playerId].push({
                time: Math.floor(action.msElapsed / 1000),
                action: info ? info.name : `Unknown Code (${code})`,
                icon: info ? info.icon : "Standard",
                type: info ? info.type : "Unknown",
                rawCode: code,
                actionId: action.id
            });
        }
    });

    try {
        console.log("Starting Debug Capture Parse...");
        await replay.parse(replayPath);
    } catch (err) {
        // Continue to finally
    } finally {
        console.log("\n--- FINISHING ---");
        let filesCreated = 0;
        
        for (const playerId in playerActions) {
            const actions = playerActions[playerId];
            if (actions.length === 0) continue;

            let name = (replay.players && replay.players[playerId]) ? replay.players[playerId].name : (fallbackNames[playerId] || `Player_${playerId}`);
            const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const outputFilename = `debug_build_order_${safeName}.json`;
            const outputPath = path.join(path.dirname(replayPath), outputFilename);
            
            try {
                fs.writeFileSync(outputPath, JSON.stringify(actions, null, 2));
                console.log(`SUCCESS: Captured ${actions.length} actions to ${outputFilename}`);
                filesCreated++;
            } catch (fsErr) {
                console.error(`Error saving:`, fsErr);
            }
        }
        
        if (filesCreated === 0) {
            console.log("WARNING: No relevant actions (Units/Buildings) were found in the replay.");
        } else {
            console.log(`\nDONE! Created ${filesCreated} file(s).`);
        }
    }
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.log("Usage: node parser.js <path_to_replay.w3g>");
} else {
    parse(args[0]).catch(err => console.error(err));
}
