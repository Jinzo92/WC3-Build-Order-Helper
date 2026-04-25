const SUPPLY_ICON = `<img src="icons/Supply.png" alt="Supply">`;
const GOLD_ICON = `<img src="icons/Gold.png" alt="Gold">`;
const WOOD_ICON = `<img src="icons/Wood.png" alt="Wood">`;

// --- Sound System Configuration ---
const SOUND_BASE_PATH = 'Sound/';
const SOUND_CATALOG = {
    "Warcraft": [
        "aaaaahhhh.mp3", "die insect.mp3", "for the alliance.mp3", "ghoul urgh.mp3", 
        "gnomedeath.mp3", "gryphon.mp3", "human death.mp3", "i got magic hands.mp3", 
        "loktar.mp3", "me lord.mp3", "quest done.mp3", "ready to serve.mp3", 
        "stelth.mp3", "thrall hall.mp3", "work work.mp3", "yes me lord.mp3"
    ],
    "Voice": [
        "base.mp3", "be happy.mp3", "buy items.mp3", "check worker.mp3", "creep.mp3", 
        "defend base.mp3", "expand.mp3", "fix army.mp3", "harass.mp3", "level up.mp3", 
        "positioning.mp3", "scout enemy.mp3", "t2 buildings.mp3", 
        "t3 buildings.mp3", "tech 2.mp3", "tech 3.mp3", "train hero.mp3", "train units.mp3", 
        "use items.mp3"
    ],
    "Other": [
        "amongus.mp3", "applepay.mp3", "faaah.mp3", "fortnite.mp3", 
        "undertaker.mp3", "woooow.mp3", "wrong buzzer.mp3"
    ],
    "Custom": []
};

let CUSTOM_SOUND_OBJECTS = {}; // Maps name to Blob URL

function playSound(path, volume = 0.5) {
    try {
        let finalUrl = '';
        if (path.startsWith('custom/')) {
            const fileName = path.replace('custom/', '');
            finalUrl = CUSTOM_SOUND_OBJECTS[fileName];
        } else {
            finalUrl = SOUND_BASE_PATH + path;
        }

        if (!finalUrl) return;

        const audio = new Audio(finalUrl);
        audio.volume = volume;
        audio.play().catch(e => console.warn("Playback failed:", e));
    } catch (err) {
        console.error("Sound error:", err);
    }
}

function playActionSound(actionText, customSound = null) {
    if (customSound) {
        playSound(customSound, 0.6);
    }
}
// ----------------------------------

const ICON_MAPPING = {
    // Human
    "Iron Forged Swords": "IronForgedSwords", 
    "Steel Forged Swords": "SteelForgedSwords",
    "Mithril Forged Swords": "MithrilForgedSwords",
    "Plating": "HumanArmorUpOne",
    "Steel Plating": "HumanArmorUpTwo",
    "Mithril Plating": "HumanArmorUpThree",
    "Gunpowder": "HumanMissileUpOne",
    "Refined Gunpowder": "HumanMissileUpTwo",
    "Superfine Gunpowder": "HumanMissileUpThree",
    "Leather Armor": "LeatherUpgradeOne",
    "Reinforced Leather": "LeatherUpgradeTwo",
    "Dragonhide Armor": "LeatherUpgradeThree",
    "Lumber Harvesting": "HumanLumberUpgrade1",
    "Advanced Lumber Harvesting": "HumanLumberUpgrade2",
    "Fragmentation Shards": "FragmentationBombs",
    "Orb of Slow": "OrbofSlowness",
    // Orc
    "Melee Weapons": "OrcMeleeUpOne",
    "Steel Melee Weapons": "OrcMeleeUpTwo",
    "Thorium Melee Weapons": "OrcMeleeUpThree",
    "Armor": "OrcArmorUpOne",
    "Steel Armor": "SteelArmor",
    "Thorium Armor": "ThoriumArmor",
    "Arcanite Armor": "ArcaniteArmor",
    "Steel Ranged Weapons": "SteelRangedweapons",
    "Thorium Ranged Weapons": "ThoriumRangedweapons",
    "Arcanite Ranged": "ArcaniteRangedweapons",
    "Arcanite Ranged": "ArcaniteRangedweapons",
    "Envenomed Spears": "EnvenomedSpear",
    // Undead
    "Disease Cloud": "PlagueCloud",
    "Necromancer Adept Training": "NecromancerAdepttraining",
    "Necromancer Master Training": "NecromancerMastertraining",
    "Banshee Adept Training": "BansheeAdepttraining",
    "Banshee Master Training": "BansheeMastertraining",
    // Nightelf
    "Druid of the Claw Adept Training": "DOCAdeptTraining",
    "Druid of the Claw Master Training": "DOCMasterTraining",
    "Druid of the Talon Adept Training": "DOTAdeptTraining",
    "Druid of the Talon Master Training": "DOTMasterTraining",
    
    // Items Naming Fixes
    "Anti-magic Potion": "antimagicpotion",
    "Book of the Dead": "bookofthedead",
    "Boots of Speed": "bootsofspeed",
    "Circlet of Nobility": "circletofnobility",
    "Claws of Attack": "clawsofattack",
    "Cloak of Flames": "cloakofflames",
    "Cloak of Shadows": "cloakofshadows",
    "Dust of Appearance": "dustofappearance",
    "Gloves of Speed": "glovesofspeed",
    "Healing Salve": "healingsalve",
    "Healing Ward": "healingward",
    "Ivory Tower": "ivorytower",
    "Lesser Clarity Potion": "lesserclaritypotion",
    "Lesser Invisibility": "lesserinvisibility",
    "Mantle of Intelligence": "mantleofintelligence",
    "Mechanical Critter": "mechanicalcritter",
    "Moon Stone": "moonstone",
    "Orb of Corruption": "orbofcorruption",
    "Orb of Lightning": "orboflightning",
    "Orb of Venom": "orbofvenom",
    "Orb of Slow": "orbofslowness",
    "Periapt of Vitality": "periaptofvitality",
    "Potion of Healing": "potionofhealing",
    "Potion of Lesser Invulnerability": "potionoflesserinvulneralbility",
    "Potion of Mana": "potionofmana",
    "Ritual Dagger": "ritualdagger",
    "Rod of Necromancy": "rodofnecromancy",
    "Sacrificial Skull": "sacrificialskull",
    "Scroll of Healing": "scrollofhealing",
    "Scroll of Protection": "scrollofprotection",
    "Scroll of Regeneration": "scrollofregeneration",
    "Scroll of Speed": "scrollofspeed",
    "Scroll of Town Portal": "scrolloftownportal",
    "Staff of Preservation": "staffofpreservation",
    "Staff of Sanctuary": "staffofsanctuary",
    "Staff of Teleportation": "staffofteleportation",
    "Tiny Great Hall": "tinygreathall",
    "Tome of Retraining": "tomeofretraining",
    "Wand of Negation": "wandofnegation",
    "Gold Mine": "goldmine",
    "Gold": "gold",
    "Wood": "wood",
    "Spacer": "blank",
    "Arrow Right": "arrowright"
};

const ALL_ITEMS = [
    "Anti-magic Potion", "Book of the Dead", "Boots of Speed", "Circlet of Nobility", "Claws of Attack",
    "Cloak of Flames", "Cloak of Shadows", "Dust of Appearance", "Gloves of Speed", "Healing Salve",
    "Healing Ward", "Ivory Tower", "Lesser Clarity Potion", "Lesser Invisibility", "Mantle of Intelligence",
    "Mechanical Critter", "Moon Stone", "Orb of Corruption", "Orb of Lightning", "Orb of Slow",
    "Orb of Venom", "Periapt of Vitality", "Potion of Healing", "Potion of Lesser Invulnerability", "Potion of Mana",
    "Ritual Dagger", "Rod of Necromancy", "Sacrificial Skull", "Scroll of Healing", "Scroll of Protection",
    "Scroll of Regeneration", "Scroll of Speed", "Scroll of Town Portal", "Staff of Preservation", "Staff of Sanctuary",
    "Staff of Teleportation", "Tiny Great Hall", "Tome of Retraining", "Wand of Negation"
];

const RACE_ENTITIES_CATEGORIZED = {
    human: {
        Buildings: [
            "Town Hall", "Keep", "Castle", "Farm", "Altar of Kings", "Barracks", "Blacksmith", "Lumber Mill", "Arcane Sanctum", "Workshop", "Gryphon Aviary", "Arcane Vault", "Scout Tower", "Guard Tower", "Arcane Tower", "Cannon Tower"
        ],
        Units: [
            "Peasant", "Militia", "Footman", "Rifleman", "Knight", "Priest", "Sorceress", "Spell Breaker", "Flying Machine", "Mortar Team", "Siege Engine", "Gryphon Rider", "Dragonhawk Rider", "Archmage", "Mountain King", "Paladin", "Blood Mage"
        ],
        Upgrades: [
            "Iron Forged Swords", "Steel Forged Swords", "Mithril Forged Swords",
            "Plating", "Steel Plating", "Mithril Plating",
            "Gunpowder", "Refined Gunpowder", "Superfine Gunpowder",
            "Leather Armor", "Reinforced Leather", "Dragonhide Armor",
            "Lumber Harvesting", "Advanced Lumber Harvesting",
            "Improved Masonry", "Advanced Masonry", "Imbued Masonry",
            "Defend", "Animal War Training", "Long Rifles", "Magic Sentry", 
            "Flak Cannons", "Fragmentation Shards", "Barrage", "Storm Hammers", 
            "Control Magic", "Cloud", "Flying Machine Bombs", "Flare", "Backpack",
            "Priest Adept Training", "Priest Master Training", "Sorceress Adept Training", "Sorceress Master Training"
        ],
        "Tavern Heroes": [
            "Alchemist", "Beastmaster", "Dark Ranger", "Firelord", "Naga Sea Witch", "Pandaren Brewmaster", "Pit Lord", "Tinker"
        ],
        "Neutral Units": [
            "Forest Troll Berserker", "Forest Troll Shadow Priest", "Goblin Sapper", "Goblin Shredder", "Goblin Zeppelin", "Mud Golem", "Ogre Mauler"
        ],
        "Items": ALL_ITEMS,
        "Resources": [
            "Gold Mine", "Gold", "Wood", "Spacer", "Arrow Right"
        ],
        "Custom": [
            "Level Up", "Order Now", "Conquer"
        ]
    },
    orc: {
        Buildings: [
            "Great Hall", "Stronghold", "Fortress", "Burrow", "Altar of Storms", "Barracks", "War Mill", "Spirit Lodge", "Beastiary", "Tauren Totem", "Voodoo Lounge", "Watch Tower"
        ],
        Units: [
            "Peon", "Grunt", "Headhunter", "Demolisher", "Raider", "Kodo Beast", "Wind Rider", "Batrider", "Shaman", "Witch Doctor", "Spirit Walker", "Tauren", "Blademaster", "Far Seer", "Tauren Chieftain", "Shadow Hunter"
        ],
        Upgrades: [
            "Orc Melee Up One", "Orc Melee Up Two", "Orc Melee Up Three",
            "Steel Ranged Weapons", "Thorium Ranged Weapons", "Arcanite Ranged",
            "Steel Armor", "Thorium Armor", "Arcanite Armor",
            "Spiked Barricades", "Improved Spiked Barricades", "Advanced Spiked Barricades",
            "Brute Strength", "Berserker Upgrade", "Troll Regeneration",
            "Burning Oil", "Ensnare", "Envenomed Spears", "War Drums", "Liquid Fire", 
            "Pillage", "Pulverize", "Backpack",
            "Shaman Adept Training", "Shaman Master Training", 
            "Witch Doctor Adept Training", "Witch Doctor Master Training", 
            "Spirit Walker Adept Training", "Spirit Walker Master Training"
        ],
        "Tavern Heroes": [
            "Alchemist", "Beastmaster", "Dark Ranger", "Firelord", "Naga Sea Witch", "Pandaren Brewmaster", "Pit Lord", "Tinker"
        ],
        "Neutral Units": [
            "Forest Troll Berserker", "Forest Troll Shadow Priest", "Goblin Sapper", "Goblin Shredder", "Goblin Zeppelin", "Mud Golem", "Ogre Mauler"
        ],
        "Items": ALL_ITEMS,
        "Resources": [
            "Gold Mine", "Gold", "Wood", "Spacer", "Arrow Right"
        ],
        "Custom": [
            "Level Up", "Order Now", "Conquer"
        ]
    },
    undead: {
        Buildings: [
            "Necropolis", "Halls of the Dead", "Black Citadel", "Ziggurat", "Spirit Tower", "Nerubian Tower", "Altar of Darkness", "Crypt", "Graveyard", "Slaughterhouse", "Temple of the Damned", "Sacrificial Pit", "Boneyard", "Tomb of Relics"
        ],
        Units: [
            "Acolyte", "Ghoul", "Crypt Fiend", "Gargoyle", "Abomination", "Meat Wagon", "Obsidian Statue", "Destroyer", "Frost Wyrm", "Necromancer", "Banshee", "Death Knight", "Lich", "Dreadlord", "Crypt Lord"
        ],
        Upgrades: [
            "Unholy Strength", "Improved Unholy Strength", "Advanced Unholy Strength",
            "Unholy Armor", "Improved Unholy Armor", "Advanced Unholy Armor",
            "Creature Attack", "Improved Creature Attack", "Advanced Creature Attack",
            "Creature Carapace", "Improved Creature Carapace", "Advanced Creature Carapace",
            "Cannibalize", "Ghoul Frenzy", "Web", "Stone Form", "Disease Cloud", 
            "Skeletal Longevity", "Skeletal Mastery", "Freezing Breath", "Destroyer Form", 
            "Burrow", "Exhume Corpses", "Backpack",
            "Necromancer Adept Training", "Necromancer Master Training", 
            "Banshee Adept Training", "Banshee Master Training"
        ],
        "Tavern Heroes": [
            "Alchemist", "Beastmaster", "Dark Ranger", "Firelord", "Naga Sea Witch", "Pandaren Brewmaster", "Pit Lord", "Tinker"
        ],
        "Neutral Units": [
            "Forest Troll Berserker", "Forest Troll Shadow Priest", "Goblin Sapper", "Goblin Shredder", "Goblin Zeppelin", "Mud Golem", "Ogre Mauler"
        ],
        "Items": ALL_ITEMS,
        "Resources": [
            "Gold Mine", "Gold", "Wood", "Spacer", "Arrow Right"
        ],
        "Custom": [
            "Level Up", "Order Now", "Conquer"
        ]
    },
    nightelf: {
        Buildings: [
            "Tree of Life", "Tree of Ages", "Tree of Eternity", "Moon Well", "Altar of Elders", "Ancient of War", "Hunter's Hall", "Ancient of Lore", "Ancient of Wind", "Ancient Protector", "Chimaera Roost", "Ancient of Wonders"
        ],
        Units: [
            "Wisp", "Archer", "Huntress", "Dryad", "Druid of the Claw", "Mountain Giant", "Hippogryph", "Hippogryph Rider", "Druid of the Talon", "Faerie Dragon", "Glaive Thrower", "Chimaera", "Demon Hunter", "Keeper of the Grove", "Priestess of the Moon", "Warden"
        ],
        Upgrades: [
            "Strength of the Moon", "Improved Strength of the Moon", "Advanced Strength of the Moon",
            "Moon Armor", "Improved Moon Armor", "Advanced Moon Armor",
            "Strength of the Wild", "Improved Strength of the Wild", "Advanced Strength of the Wild",
            "Reinforced Hides", "Improved Reinforced Hides", "Advanced Reinforced Hides",
            "Improved Bows", "Marksmanship", "Sentinel", "Moon Glaive", "Vorpal Blades", 
            "Abolish Magic", "Corrosive Breath", "Nature's Blessing", "Ultravision", 
            "Well Spring", "Hardened Skin", "Resistant Skin", "Mark of the Claw", "Mark of the Talon", "Backpack",
            "Druid of the Claw Adept Training", "Druid of the Claw Master Training", 
            "Druid of the Talon Adept Training", "Druid of the Talon Master Training"
        ],
        "Tavern Heroes": [
            "Alchemist", "Beastmaster", "Dark Ranger", "Firelord", "Naga Sea Witch", "Pandaren Brewmaster", "Pit Lord", "Tinker"
        ],
        "Neutral Units": [
            "Forest Troll Berserker", "Forest Troll Shadow Priest", "Goblin Sapper", "Goblin Shredder", "Goblin Zeppelin", "Mud Golem", "Ogre Mauler"
        ],
        "Items": ALL_ITEMS,
        "Resources": [
            "Gold Mine", "Gold", "Wood", "Spacer", "Arrow Right"
        ],
        "Custom": [
            "Level Up", "Order Now", "Conquer"
        ]
    }
};

for (let race in RACE_ENTITIES_CATEGORIZED) {
    for (let category in RACE_ENTITIES_CATEGORIZED[race]) {
        // Only sort categories where alphabetical order is preferred
        if (["Items", "Tavern Heroes", "Neutral Units"].includes(category)) {
            RACE_ENTITIES_CATEGORIZED[race][category].sort();
        }
    }
}

const defaultBuildOrders = {
    human: [
        { time: 0, gold: 75, wood: 0, food: 1, foodMax: 12, action: 'Queue Peasant', icons: ['Peasant'] },
        { time: 10, gold: 180, wood: 50, food: 0, foodMax: 0, action: 'Altar of Kings', icons: ['Altar of Kings'] },
        { time: 15, gold: 160, wood: 60, food: 0, foodMax: 0, action: 'Barracks', icons: ['Barracks'] },
        { time: 30, gold: 80, wood: 20, food: 0, foodMax: 0, action: 'Farm', icons: ['Farm'] },
        { time: 50, gold: 425, wood: 100, food: 5, foodMax: 0, action: 'Train Archmage', icons: ['Archmage'] },
        { time: 65, gold: 135, wood: 0, food: 2, foodMax: 20, action: 'Train Footman', icons: ['Footman'] }
    ],
    orc: [
        { time: 0, gold: 75, wood: 0, food: 1, foodMax: 11, action: 'Queue Peon', icons: ['Peon'] },
        { time: 10, gold: 180, wood: 50, food: 0, foodMax: 0, action: 'Altar of Storms', icons: ['Altar of Storms'] },
        { time: 15, gold: 160, wood: 50, food: 0, foodMax: 0, action: 'Barracks', icons: ['Barracks'] },
        { time: 30, gold: 160, wood: 40, food: 0, foodMax: 0, action: 'Burrow', icons: ['Burrow'] },
        { time: 50, gold: 425, wood: 100, food: 5, foodMax: 0, action: 'Train Blademaster', icons: ['Blademaster'] },
        { time: 65, gold: 200, wood: 0, food: 3, foodMax: 20, action: 'Train Grunt', icons: ['Grunt'] }
    ],
    undead: [
        { time: 0, gold: 75, wood: 0, food: 1, foodMax: 10, action: 'Queue Acolyte', icons: ['Acolyte'] },
        { time: 10, gold: 180, wood: 50, food: 0, foodMax: 0, action: 'Altar of Darkness', icons: ['Altar of Darkness'] },
        { time: 15, gold: 200, wood: 50, food: 0, foodMax: 0, action: 'Crypt', icons: ['Crypt'] },
        { time: 30, gold: 150, wood: 50, food: 0, foodMax: 0, action: 'Ziggurat', icons: ['Ziggurat'] },
        { time: 50, gold: 425, wood: 100, food: 5, foodMax: 0, action: 'Train Death Knight', icons: ['Death Knight'] },
        { time: 65, gold: 120, wood: 0, food: 2, foodMax: 20, action: 'Train Ghoul', icons: ['Ghoul'] }
    ],
    nightelf: [
        { time: 0, gold: 60, wood: 10, food: 1, foodMax: 10, action: 'Queue Wisp', icons: ['Wisp'] },
        { time: 10, gold: 180, wood: 50, food: 0, foodMax: 0, action: 'Altar of Elders', icons: ['Altar of Elders'] },
        { time: 15, gold: 150, wood: 60, food: 0, foodMax: 0, action: 'Ancient of War', icons: ['Ancient of War'] },
        { time: 30, gold: 180, wood: 40, food: 0, foodMax: 0, action: 'Moon Well', icons: ['Moon Well'] },
        { time: 50, gold: 425, wood: 100, food: 5, foodMax: 0, action: 'Train Demon Hunter', icons: ['Demon Hunter'] },
        { time: 65, gold: 130, wood: 10, food: 2, foodMax: 20, action: 'Train Archer', icons: ['Archer'] }
    ]
};

let currentFileName = "None";
let isUnsaved = false;

function markAsUnsaved() {
    isUnsaved = true;
    const warning = document.getElementById('unsavedWarning');
    if (warning) warning.style.opacity = '1';
}

function clearUnsaved() {
    isUnsaved = false;
    const warning = document.getElementById('unsavedWarning');
    if (warning) warning.style.opacity = '0';
}

function updateFileNameDisplay(name) {
    currentFileName = decodeURIComponent(name || "None");
    const el = document.getElementById('currentBOFileName');
    if (el) el.textContent = currentFileName.replace('.json', '');
    
    updateSaveModeUI();
    clearUnsaved();
}

function updateSaveModeUI() {
    const modeText = document.getElementById('saveModeText');
    const modeIndicator = document.getElementById('saveModeIndicator');
    
    if (currentFileHandle && supportsFileSystemAccess) {
        if (modeText) modeText.textContent = "💾 Overwrite Mode";
        if (modeText) modeText.style.color = "var(--accent-food)";
    } else {
        if (modeText) modeText.textContent = "📥 Download Mode";
        if (modeText) modeText.style.color = "var(--text-muted)";
    }
}

let savedRace = localStorage.getItem('wc3_selected_race') || 'human';

let buildOrder = [];
try {
    const saved = localStorage.getItem('wc3_build_order');
    if (saved) {
        let loaded = JSON.parse(saved);
        buildOrder = loaded.map(item => ({
            ...item,
            gold: item.gold || 0,
            wood: item.wood || 0,
            foodMax: item.foodMax || 0,
            icons: item.icons || (item.icon ? [item.icon] : [])
        }));
    } else {
        buildOrder = [...defaultBuildOrders[savedRace]];
    }
} catch (e) {
    buildOrder = [...defaultBuildOrders[savedRace]];
}

const timerDisplay = document.getElementById('timerDisplay');
const playPauseBtn = document.getElementById('playPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timelineTrack = document.getElementById('timelineTrack');
const upcomingAction = document.getElementById('upcomingAction');

let isRunning = false;
let startTime = 0;
let savedDelay = parseInt(localStorage.getItem('wc3_delay') || '5');
let elapsedTime = -(savedDelay * 1000);
let animationFrameId = null;

const pixelsPerSecond = 30;

const historyList = document.getElementById('historyList');

function renderIconsHTML(iconsArray, raceId, type = 'event') {
    if (!iconsArray || iconsArray.length === 0) return '';
    
    let html = '';
    const uniqueTimeId = Date.now() + Math.random().toString(36).substr(2, 9);
    
    iconsArray.forEach((iconName, arrIdx) => {
        if(!iconName) return;
        
        let customClass = "";
        if (type === 'upcoming') customClass = "upcoming-icon-item";
        else if (type === 'history') customClass = "history-icon-item";
        else customClass = "event-icon-item";
        
        if(iconName.includes('/') || iconName.includes('.')) {
            html += `<img src="${iconName}" class="${customClass}" alt="${iconName}">`;
            return;
        }

        let folder = raceId.toLowerCase();
        
        // Use mapping if available, otherwise fallback to sanitized name
        let iconKey = ICON_MAPPING[iconName] || iconName;
        let fileName = iconKey.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        
        let trys = [
            `icons/${fileName}.png`,
            `icons/${fileName}.webp`,
            `icons/Custom/${iconName}.png`,
            `icons/Custom/${iconName}.webp`,
            `icons/Items/btn${fileName}.webp`,
            `icons/Items/btn${fileName}.png`,
            `icons/Items/${fileName}.webp`,
            `icons/Items/${fileName}.png`,
            `icons/${folder}/btnhero${fileName}.webp`,
            `icons/${folder}/btnhero${fileName}.png`,
            `icons/${folder}/btn${fileName}.webp`,
            `icons/${folder}/btn${fileName}.png`,
            `icons/${folder}/${fileName}.webp`,
            `icons/${folder}/${fileName}.png`,
            `icons/Other/btnhero${fileName}.webp`,
            `icons/Other/btnhero${fileName}.png`,
            `icons/Other/btn${fileName}.webp`,
            `icons/Other/btn${fileName}.png`,
            `icons/Other/${fileName}.webp`,
            `icons/Other/${fileName}.png`,
            `icons/Custom/${fileName}.webp`,
            `icons/Custom/${fileName}.png`,
            `icons/Missing.webp`
        ];
        
        let fallbackCode = `
            let idx = parseInt(this.dataset.retry || 0);
            let urls = ['${trys.join("','")}'];
            if(idx < urls.length - 1) {
                this.dataset.retry = idx + 1;
                this.src = urls[idx + 1];
            } else {
                this.src = 'icons/Missing.webp';
                this.onerror = null;
            }
        `;
        
        html += `<img src="${trys[0]}" alt="${iconName}" class="${customClass}" style="opacity:0; transition: opacity 0.3s ease; background: rgba(0,0,0,0.2);" data-retry="0" onload="this.style.opacity=1" onerror="${fallbackCode}" id="img_${uniqueTimeId}_${arrIdx}">`;
    });
    
    return html;
}

function initTimeline() {
    upcomingAction.dataset.lastIndex = '';
    timelineTrack.innerHTML = '';
    buildOrder.forEach((event, index) => {
        const node = document.createElement('div');
        node.classList.add('event-node');
        node.id = `node-${index}`;
        node.style.left = `${event.time * pixelsPerSecond}px`;
        
        let resHTML = '';
        if (event.gold > 0) resHTML += `<div class="event-resource" title="Gold">${GOLD_ICON} ${event.gold}</div>`;
        if (event.wood > 0) resHTML += `<div class="event-resource" title="Wood">${WOOD_ICON} ${event.wood}</div>`;
        
        if (event.food > 0 || event.foodMax > 0) {
            let supplyText = event.foodMax > 0 ? `${event.food} / ${event.foodMax}` : `${event.food}`;
            resHTML += `<div class="event-resource" title="Supply">${SUPPLY_ICON} ${supplyText}</div>`;
        }
        
        node.innerHTML = `
            <div class="event-resources">${resHTML}</div>
            <div class="event-action">
                <div class="event-icons-container">${renderIconsHTML(event.icons, savedRace, 'event')}</div>
                <div class="event-text">${event.action}</div>
            </div>
        `;
        timelineTrack.appendChild(node);
    });
    
    renderLog(0);
}

let lastLogIdx = -1;

function renderLog(activeIndex) {
    if (!historyList || buildOrder.length === 0) return;
    historyList.innerHTML = '';
    
    // Attempt to show a constant window of 11 items
    let start = activeIndex - 5;
    let end = activeIndex + 5;
    
    // Adjust window at the start
    if (start < 0) {
        end = Math.min(buildOrder.length - 1, end + Math.abs(start));
        start = 0;
    }
    // Adjust window at the end
    if (end > buildOrder.length - 1) {
        start = Math.max(0, start - (end - (buildOrder.length - 1)));
        end = buildOrder.length - 1;
    }
    
    for (let i = start; i <= end; i++) {
        const event = buildOrder[i];
        const status = i < activeIndex ? 'passed' : (i === activeIndex ? 'active' : 'upcoming');
        
        let mins = Math.floor(event.time / 60).toString().padStart(2, '0');
        let secs = (event.time % 60).toString().padStart(2, '0');
        
        let resHTML = '';
        if (event.gold > 0) resHTML += `<span>${GOLD_ICON} ${event.gold}</span>`;
        if (event.wood > 0) resHTML += `<span>${WOOD_ICON} ${event.wood}</span>`;
        if (event.food > 0 || event.foodMax > 0) {
            let sText = event.foodMax > 0 ? `${event.food}/${event.foodMax}` : `${event.food}`;
            resHTML += `<span>${SUPPLY_ICON} ${sText}</span>`;
        }

        let itemHTML = `
            <div class="history-item ${status}">
                <div class="history-time">${mins}:${secs}</div>
                <div class="history-details">
                    <div class="history-action">${event.action}</div>
                    <div class="history-resources">${resHTML}</div>
                </div>
                <div class="history-mini-icons" style="display:flex; gap:3px; flex-wrap:wrap; max-width:80px; justify-content:flex-end;">
                    ${renderIconsHTML(event.icons, savedRace, 'history')}
                </div>
            </div>
        `;
        historyList.insertAdjacentHTML('beforeend', itemHTML);
    }
}

function updateDisplay() {
    let totalSeconds = 0;
    if (elapsedTime < 0) {
        totalSeconds = Math.ceil(elapsedTime / 1000);
    } else {
        totalSeconds = Math.floor(elapsedTime / 1000);
    }
    
    const isNegative = elapsedTime < 0 && totalSeconds < 0;
    const absSecs = Math.abs(totalSeconds);
    const mins = Math.floor(absSecs / 60).toString().padStart(2, '0');
    const secs = (absSecs % 60).toString().padStart(2, '0');
    const displayPrefix = (elapsedTime < 0 && absSecs === 0) ? '-' : (isNegative ? '-' : '');
    const newTimeText = `${displayPrefix}${mins}:${secs}`;
    if (timerDisplay.textContent !== newTimeText) {
        timerDisplay.textContent = newTimeText;
    }

    const offsetX = -(elapsedTime / 1000) * pixelsPerSecond;
    timelineTrack.style.transform = `translateY(-50%) translateX(${offsetX}px)`;

    let currentNextEvent = null;
    let currentNextEventIndex = -1;
    
    // Find active event
    buildOrder.forEach((event, index) => {
        const node = document.getElementById(`node-${index}`);
        if (!node) return;
        
        if (totalSeconds >= event.time) {
            // Trigger sound if this event just passed and hasn't played yet
            if (isRunning && !event.hasPlayedSound) {
                event.hasPlayedSound = true;
                // ONLY play if the sound checkbox is enabled for this event
                if (event.useSound) {
                    playActionSound(event.action, event.sound);
                }
            }
            
            node.classList.add('passed');
            node.classList.remove('active');
        } else {
            node.classList.remove('passed');
            if (!currentNextEvent) {
                currentNextEvent = event;
                currentNextEventIndex = index;
                node.classList.add('active');
            } else {
                node.classList.remove('active');
            }
        }
    });

    // Update History Log Window if index changed
    if (lastLogIdx !== currentNextEventIndex) {
        lastLogIdx = currentNextEventIndex;
        // If all complete, show the last few as passed
        if (currentNextEventIndex === -1 && buildOrder.length > 0) {
            renderLog(buildOrder.length); 
        } else {
            renderLog(currentNextEventIndex);
        }
    }

    if (upcomingAction.dataset.lastIndex !== String(currentNextEventIndex)) {
        upcomingAction.dataset.lastIndex = currentNextEventIndex;

        if (currentNextEvent) {
            let imgMarkup = `<div class="upcoming-icons-container">${renderIconsHTML(currentNextEvent.icons, savedRace, 'upcoming')}</div>`;
            
            let resourcesMarkup = '';
            if (currentNextEvent.gold > 0) resourcesMarkup += `<div class="upcoming-resource">${GOLD_ICON} ${currentNextEvent.gold}</div>`;
            if (currentNextEvent.wood > 0) resourcesMarkup += `<div class="upcoming-resource">${WOOD_ICON} ${currentNextEvent.wood}</div>`;
            
            if (currentNextEvent.food > 0 || currentNextEvent.foodMax > 0) {
                let sText = currentNextEvent.foodMax > 0 ? `${currentNextEvent.food} / ${currentNextEvent.foodMax}` : `${currentNextEvent.food}`;
                resourcesMarkup += `<div class="upcoming-resource">${SUPPLY_ICON} ${sText}</div>`;
            }

            upcomingAction.innerHTML = `
                ${imgMarkup}
                <div class="upcoming-action-text-wrapper">
                    <span class="highlight-gold">${currentNextEvent.action}</span>
                    ${currentNextEvent.subtext ? `<span class="upcoming-subtext">${currentNextEvent.subtext}</span>` : ''}
                </div>
                <div class="upcoming-resources">
                    ${resourcesMarkup}
                </div>
            `;
        } else {
            upcomingAction.innerHTML = `<span class="highlight-gold">Build Order Complete!</span>`;
        }
    }
}

function tick(timestamp) {
    if (!startTime) startTime = timestamp - elapsedTime;
    elapsedTime = timestamp - startTime;
    
    updateDisplay();
    
    if (isRunning) {
        animationFrameId = requestAnimationFrame(tick);
    }
}

function togglePlay() {
    if (isRunning) {
        isRunning = false;
        playPauseBtn.innerHTML = '<span id="playIcon">▶</span> Play';
        cancelAnimationFrame(animationFrameId);
    } else {
        isRunning = true;
        playPauseBtn.innerHTML = '<span id="playIcon">⏸</span> Pause';
        startTime = performance.now() - elapsedTime;
        animationFrameId = requestAnimationFrame(tick);
    }
}

function resetTimer() {
    isRunning = false;
    playPauseBtn.innerHTML = '<span id="playIcon">▶</span> Play';
    cancelAnimationFrame(animationFrameId);
    elapsedTime = -(savedDelay * 1000);
    startTime = 0;
    
    // Reset sound flags for all events
    buildOrder.forEach(event => {
        event.hasPlayedSound = false;
    });
    
    updateDisplay();
}

playPauseBtn.addEventListener('click', togglePlay);
resetBtn.addEventListener('click', resetTimer);

const hotkeyBtn = document.getElementById('hotkeyBtn');
let currentHotkey = localStorage.getItem('wc3_hotkey') || 'Space';
let isListeningForHotkey = false;

if(hotkeyBtn) {
    hotkeyBtn.textContent = currentHotkey === ' ' ? 'Space' : currentHotkey.toUpperCase();

    hotkeyBtn.addEventListener('click', () => {
        isListeningForHotkey = true;
        hotkeyBtn.classList.add('listening');
        hotkeyBtn.textContent = 'Press Key...';
    });
}

document.addEventListener('keydown', (e) => {
    if (isListeningForHotkey) {
        e.preventDefault();
        let key = e.key;
        if(key === ' ') key = 'Space';
        
        currentHotkey = key;
        localStorage.setItem('wc3_hotkey', currentHotkey);
        
        hotkeyBtn.textContent = currentHotkey.toUpperCase();
        hotkeyBtn.classList.remove('listening');
        isListeningForHotkey = false;
        return;
    }
    
    if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') return;
    
    let checkKey = e.key;
    if(checkKey === ' ') checkKey = 'Space';
    
    if (checkKey.toLowerCase() === currentHotkey.toLowerCase()) {
        e.preventDefault();
        togglePlay();
    }
});

document.addEventListener('mousedown', (e) => {
    // Nur reagieren auf mittlere (1), zurueck (3) oder vorwaerts (4) maustaste
    let mouseName = null;
    if (e.button === 1) mouseName = 'Mouse Middle';
    if (e.button === 3) mouseName = 'Mouse Back';
    if (e.button === 4) mouseName = 'Mouse Forward';
    
    // Ignoriere Links (0) und Rechts (2) komplett!
    if (!mouseName) return;

    if (isListeningForHotkey) {
        e.preventDefault();
        currentHotkey = mouseName;
        localStorage.setItem('wc3_hotkey', currentHotkey);
        
        hotkeyBtn.textContent = currentHotkey.toUpperCase();
        hotkeyBtn.classList.remove('listening');
        isListeningForHotkey = false;
        return;
    }
    
    if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') return;
    
    if (mouseName.toLowerCase() === currentHotkey.toLowerCase()) {
        e.preventDefault();
        togglePlay();
    }
});

function applyRaceUI(raceValue) {
    // Custom Editor Dropdown updates
    const editorOpt = document.querySelector(`#editorRaceOptions .dropdown-option[data-value="${raceValue}"]`);
    if(editorOpt) {
        const selImg = document.querySelector('#editorRaceSelected img');
        const selText = document.querySelector('#editorSelectedRaceText');
        if(selImg) selImg.src = editorOpt.dataset.img;
        if(selText) selText.textContent = editorOpt.dataset.text;
    }
}
applyRaceUI(savedRace);

const editorRaceSelected = document.getElementById('editorRaceSelected');
const editorRaceDropdown = document.getElementById('editorRaceDropdown');
if(editorRaceSelected && editorRaceDropdown) {
    editorRaceSelected.addEventListener('click', (e) => {
        editorRaceDropdown.classList.toggle('open');
        e.stopPropagation();
    });
}

document.querySelectorAll('#editorRaceOptions .dropdown-option').forEach(opt => {
    opt.addEventListener('click', () => {
        const val = opt.dataset.value;
        savedRace = val;
        localStorage.setItem('wc3_selected_race', val);
        applyRaceUI(val); 
        if(editorRaceDropdown) editorRaceDropdown.classList.remove('open');
        if(editorModal.classList.contains('active')) {
            renderEditor();
        }
    });
});

document.addEventListener('click', () => {
    const editorRaceDropdown = document.getElementById('editorRaceDropdown');
    if(editorRaceDropdown) editorRaceDropdown.classList.remove('open');
});

const editBtn = document.getElementById('editBtn');
const editorModal = document.getElementById('editorModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const addRowBtn = document.getElementById('addRowBtn');
const saveEditorBtn = document.getElementById('saveEditorBtn');
const editorRows = document.getElementById('editorRows');
const exportBtn = document.getElementById('exportBtn');
const importFile = document.getElementById('importFile');

function getEntityIconPath(iconName, raceId) {
    let iconKey = ICON_MAPPING[iconName] || iconName;
    let fileName = iconKey.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    let folder = raceId.toLowerCase();
    
    // We return a primary path, fallback logic will handle the rest via onerror
    // Trying items folder first as it's common now
    return `icons/Items/btn${fileName}.webp`;
}

function buildSelectHTML(selectedVal) {
    const categories = RACE_ENTITIES_CATEGORIZED[savedRace];
    let listHtml = '';
    let selectedText = selectedVal || "Select Entity";
    let selectedImg = getEntityIconPath(selectedText, savedRace);

    for (const [category, items] of Object.entries(categories)) {
        listHtml += `<div class="entity-group-label">${category}</div>`;
        items.forEach(entity => {
            let isSelected = (selectedVal === entity) ? 'selected' : '';
            let imgPath = getEntityIconPath(entity, savedRace);
            
            // Build robust fallback logic using a retry counter
            let iconKey = ICON_MAPPING[entity] || entity;
            let fileName = iconKey.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            let folder = savedRace.toLowerCase();
            let trys = [
                `icons/${fileName}.png`,
                `icons/${fileName}.webp`,
                `icons/Items/btn${fileName}.webp`,
                `icons/Items/btn${fileName}.png`,
                `icons/Items/${fileName}.webp`,
                `icons/Items/${fileName}.png`,
                `icons/${folder}/btn${fileName}.webp`,
                `icons/${folder}/btn${fileName}.png`,
                `icons/${folder}/${fileName}.webp`,
                `icons/${folder}/${fileName}.png`,
                `icons/Other/btn${fileName}.webp`,
                `icons/Other/btn${fileName}.png`,
                `icons/Missing.webp`
            ];
            
            let fallback = `let idx=parseInt(this.dataset.retry||0); let urls=['${trys.join("','")}']; if(idx<urls.length-1){ this.dataset.retry=idx+1; this.src=urls[idx+1]; }else{ this.src='icons/Missing.webp'; this.onerror=null; }`;

            listHtml += `
                <div class="entity-option ${isSelected}" data-value="${entity}">
                    <img src="${trys[0]}" data-retry="0" onerror="${fallback}" alt="">
                    <span>${entity}</span>
                </div>
            `;
        });
    }

    return `
        <div class="icon-select-group" style="display: flex; gap: 5px; margin-bottom: 5px;">
            <div class="entity-select-container">
                <div class="entity-select-trigger" data-value="${selectedVal}">
                    <img src="${selectedImg}" data-retry="0" onerror="let idx=parseInt(this.dataset.retry||0); let urls=['icons/Items/btn${(ICON_MAPPING[selectedText]||selectedText).replace(/[^a-zA-Z0-9]/g,'').toLowerCase()}.webp','icons/Items/${(ICON_MAPPING[selectedText]||selectedText).replace(/[^a-zA-Z0-9]/g,'').toLowerCase()}.webp','icons/${savedRace.charAt(0).toUpperCase()+savedRace.slice(1)}/btn${(ICON_MAPPING[selectedText]||selectedText).replace(/[^a-zA-Z0-9]/g,'').toLowerCase()}.webp','icons/Missing.webp']; if(idx<urls.length-1){ this.dataset.retry=idx+1; this.src=urls[idx+1]; }else{ this.src='icons/Missing.webp'; this.onerror=null; }" alt="">
                    <span>${selectedText}</span>
                </div>
                <div class="entity-dropdown-list">
                    ${listHtml}
                </div>
            </div>
            <button type="button" class="remove-icon-btn" style="background:rgba(239, 68, 68, 0.1); color:#ef4444; border:1px solid rgba(239, 68, 68, 0.3); border-radius:8px; cursor:pointer; padding:0 8px; transition: all 0.2s;" title="Remove icon">➖</button>
        </div>
    `;
}

function createRow(item) {
    const div = document.createElement('div');
    div.className = 'editor-row';
    
    let iconsContainerHtml = '';
    let itemIcons = item.icons && item.icons.length > 0 ? item.icons : [RACE_ENTITIES_CATEGORIZED[savedRace].Buildings[0]];
    itemIcons.forEach(ic => {
        iconsContainerHtml += buildSelectHTML(ic);
    });

    div.innerHTML = `
        <input type="number" class="editor-input" value="${item.time}" min="0">
        <input type="number" class="editor-input" value="${item.gold}" min="0" placeholder="Gold">
        <input type="number" class="editor-input" value="${item.wood}" min="0" placeholder="Wood">
        <input type="number" class="editor-input" value="${item.food}" min="0" placeholder="Spend">
        <input type="number" class="editor-input" value="${item.foodMax || 0}" min="0" placeholder="Max">
        <div class="editor-action-container">
            <input type="text" class="editor-input editor-headline" value="${item.action}" placeholder="Headline">
            <input type="text" class="editor-input editor-subtext" value="${item.subtext || ''}" placeholder="Subtext (optional)">
        </div>
        <div class="icons-wrapper" style="display:flex; flex-direction:column;">
            <div class="icons-list" style="display:flex; flex-direction:column;">
                ${iconsContainerHtml}
            </div>
            <button type="button" class="add-icon-btn" style="background:rgba(16, 185, 129, 0.1); color:#10b981; border:1px solid rgba(16, 185, 129, 0.3); border-radius:8px; cursor:pointer; width:100%; padding:3px; transition: all 0.2s; margin-top:2px;" title="Add another icon to this row">➕</button>
            
            <div class="sound-select-row" style="margin-top: 8px; display: ${item.useSound ? 'flex' : 'none'}; align-items: center; gap: 5px;">
                <select class="editor-input sound-dropdown" style="flex: 1; font-size: 0.85rem; padding: 4px;">
                    ${Object.entries(SOUND_CATALOG).map(([cat, files]) => `
                        <optgroup label="${cat}">
                            ${files.map(f => `<option value="${cat.toLowerCase()}/${f}" ${item.sound === (cat.toLowerCase()+'/'+f) ? 'selected' : ''}>${f.replace('.mp3','')}</option>`).join('')}
                        </optgroup>
                    `).join('')}
                </select>
                <button type="button" class="play-sound-btn" style="background:none; border:none; cursor:pointer; font-size: 1.1rem;" title="Preview Sound">▶️</button>
            </div>
        </div>
        <div class="row-actions" style="display:flex; flex-direction:column; gap:5px; align-items:center;">
            <button type="button" class="del-btn">🗑️</button>
            <div class="sound-toggle-wrapper" style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                <label style="cursor:pointer; display:flex; flex-direction:column; align-items:center;">
                    <img src="icons/sound.png" style="width:30px; height:30px; opacity:${item.useSound ? '1' : '0.4'}; filter: brightness(0) invert(1); transition:all 0.2s;" class="sound-icon-status">
                    <input type="checkbox" class="sound-checkbox" ${item.useSound ? 'checked' : ''} style="margin-top:2px;">
                </label>
            </div>
        </div>
    `;
    
    // Delegation for dropdowns within the row
    const soundCheckbox = div.querySelector('.sound-checkbox');
    const soundSelectRow = div.querySelector('.sound-select-row');
    const soundIconStatus = div.querySelector('.sound-icon-status');

    if (soundCheckbox) {
        soundCheckbox.addEventListener('change', () => {
            const isChecked = soundCheckbox.checked;
            soundSelectRow.style.display = isChecked ? 'flex' : 'none';
            soundIconStatus.style.opacity = isChecked ? '1' : '0.4';
        });
    }

    const playSoundBtn = div.querySelector('.play-sound-btn');
    if (playSoundBtn) {
        playSoundBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent row click from firing
            const soundPath = div.querySelector('.sound-dropdown').value;
            playSound(soundPath, 0.7);
        });
    }

    div.addEventListener('click', (e) => {
        const trigger = e.target.closest('.entity-select-trigger');
        if (trigger) {
            const list = trigger.nextElementSibling;
            // Close other open ones
            document.querySelectorAll('.entity-dropdown-list.active').forEach(l => {
                if (l !== list) l.classList.remove('active');
            });
            
            list.classList.toggle('active');
            
            // Smart positioning: if too close to bottom of the screen, open upwards
            if (list.classList.contains('active')) {
                const rect = trigger.getBoundingClientRect();
                const spaceBelow = window.innerHeight - rect.bottom;
                
                if (spaceBelow < 350) {
                    list.classList.add('open-up');
                } else {
                    list.classList.remove('open-up');
                }
            }
            return;
        }

        const option = e.target.closest('.entity-option');
        if (option) {
            const container = option.closest('.entity-select-container');
            const trigger = container.querySelector('.entity-select-trigger');
            const list = container.querySelector('.entity-dropdown-list');
            const newVal = option.dataset.value;
            const newImg = option.querySelector('img').src;

            trigger.dataset.value = newVal;
            trigger.querySelector('span').textContent = newVal;
            trigger.querySelector('img').src = newImg;
            list.classList.remove('active');
            markAsUnsaved();
            return;
        }

        const removeBtn = e.target.closest('.remove-icon-btn');
        if (removeBtn) {
            removeBtn.closest('.icon-select-group').remove();
            markAsUnsaved();
            return;
        }

        const delBtn = e.target.closest('.del-btn');
        if (delBtn) {
            div.remove();
            markAsUnsaved();
            return;
        }
    });

    const iconsList = div.querySelector('.icons-list');
    div.querySelector('.add-icon-btn').addEventListener('click', () => {
        // Get the value of the last icon trigger in this row
        const existingTriggers = div.querySelectorAll('.entity-select-trigger');
        let lastIconInRow = null;
        if (existingTriggers.length > 0) {
            lastIconInRow = existingTriggers[existingTriggers.length - 1].dataset.value;
        }

        const defaultIcon = lastIconInRow || RACE_ENTITIES_CATEGORIZED[savedRace].Buildings[0];
        const newSelectStr = buildSelectHTML(defaultIcon);
        iconsList.insertAdjacentHTML('beforeend', newSelectStr);
        markAsUnsaved();
    });
    
    return div;
}

// Close dropdowns on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.entity-select-container')) {
        document.querySelectorAll('.entity-dropdown-list.active').forEach(list => {
            list.classList.remove('active');
        });
    }
});


function renderEditor() {
    editorRows.innerHTML = '';
    buildOrder.forEach(item => {
        editorRows.appendChild(createRow(item));
    });
    
    // Add change detection
    editorRows.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', markAsUnsaved);
    });
}

const resetEditorBtn = document.getElementById('resetEditorBtn');
if (resetEditorBtn) {
    resetEditorBtn.addEventListener('click', () => {
        if (confirm('⚠️ Are you sure you want to reset the entire editor?\nThis will delete ALL rows and cannot be undone!')) {
            buildOrder = [];
            renderEditor();
        }
    });
}

// --- Build Order Loader (GitHub & Local) ---
let loadedBOFiles = {}; // Maps filename to either a File object (local) or a URL string (remote)
let fileHandles = {};  // Maps filename to FileSystemFileHandle for direct saving
let currentFileHandle = null;

// Check for File System Access API support
const supportsFileSystemAccess = 'showDirectoryPicker' in window;

async function loadFolderWithAPI() {
    try {
        const dirHandle = await window.showDirectoryPicker();
        // Request permission to write
        if ((await dirHandle.requestPermission({ mode: 'readwrite' })) !== 'granted') {
            alert("Permission denied. Direct saving will not be possible.");
        }
        
        loadedBOFiles = {};
        fileHandles = {};
        boSelect.innerHTML = '<option value="">-- Select Local BO --</option>';
        
        let fileCount = 0;
        for await (const entry of dirHandle.values()) {
            if (entry.kind === 'file' && entry.name.endsWith('.json')) {
                const file = await entry.getFile();
                loadedBOFiles[entry.name] = file;
                fileHandles[entry.name] = entry;
                
                const option = document.createElement('option');
                option.value = entry.name;
                option.textContent = "📁 " + entry.name.replace('.json', '');
                boSelect.appendChild(option);
                fileCount++;
            }
        }
        
        if (fileCount > 0) {
            const divider = document.createElement('option');
            divider.disabled = true;
            divider.textContent = "-------------------";
            boSelect.appendChild(divider);

            const backOpt = document.createElement('option');
            backOpt.value = "action:reload_github";
            backOpt.textContent = "🔄 Back to GitHub Builds";
            boSelect.appendChild(backOpt);
        } else {
            alert('No .json files found in that folder!');
            fetchGithubBuildOrders();
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error("FS API Error:", err);
            // Fallback: trigger the hidden input if API fails or user cancels
            folderInput.click();
        }
    }
}

// GitHub Config
const GITHUB_USER = 'Jinzo92';
const GITHUB_REPO = 'WC3-Build-Order-Helper';
const GITHUB_PATH = 'build-orders';

function renderGithubBOs(jsonFiles) {
    if (jsonFiles.length > 0) {
        boSelect.innerHTML = '<option value="">-- Select GitHub BO --</option>';
        jsonFiles.forEach(file => {
            const option = document.createElement('option');
            option.value = 'remote:' + (file.download_url || file.url); 
            option.textContent = "🌐 " + file.name.replace('.json', '');
            boSelect.appendChild(option);
        });
        boSelect.style.display = 'block';
    }
}


async function fetchGithubBuildOrders() {
    const CACHE_KEY = 'wc3_github_bo_cache';
    const CACHE_TIME_KEY = 'wc3_github_bo_cache_time';
    const CACHE_DURATION = 15 * 60 * 1000; // 15 Minutes

    try {
        // Try to load from cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

        if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime) < CACHE_DURATION)) {
            renderGithubBOs(JSON.parse(cachedData));
            console.log("Loaded Build Orders from local cache (GitHub API limit avoided)");
            return;
        }

        const response = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`);
        if (!response.ok) {
            if (response.status === 403) throw new Error('GitHub API Rate Limit Exceeded. Try again in a few minutes or use local folder.');
            throw new Error('GitHub API not available');
        }
        
        const files = await response.json();
        const jsonFiles = files.filter(f => f.name.endsWith('.json'));
        
        if (jsonFiles.length > 0) {
            localStorage.setItem(CACHE_KEY, JSON.stringify(jsonFiles));
            localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
            renderGithubBOs(jsonFiles);
        }
    } catch (err) {
        console.warn("Could not load BOs from GitHub:", err.message);
        // If we have old cache, use it as fallback on error
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            renderGithubBOs(JSON.parse(cachedData));
            console.log("API Error - Fallback to expired cache used");
        }
    }
}

if (loadFolderBtn && folderInput && boSelect) {
    // Show select by default (will be filled by GitHub or stay empty/hidden if error)
    boSelect.style.display = 'block';
    fetchGithubBuildOrders();

    loadFolderBtn.addEventListener('click', () => {
        if (supportsFileSystemAccess) {
            loadFolderWithAPI();
        } else {
            folderInput.click();
        }
    });
    
    // When the user selects a folder
    folderInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        
        loadedBOFiles = {};
        let fileCount = 0;
        
        // Clear and add local options
        boSelect.innerHTML = '<option value="">-- Select Local BO --</option>';
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.name.endsWith('.json')) {
                const option = document.createElement('option');
                option.value = file.name;
                option.textContent = "📁 " + file.name.replace('.json', '');
                boSelect.appendChild(option);
                
                loadedBOFiles[file.name] = file;
                fileCount++;
            }
        }
        
        if (fileCount > 0) {
            // Add a reload button to switch back to GitHub
            const divider = document.createElement('option');
            divider.disabled = true;
            divider.textContent = "-------------------";
            boSelect.appendChild(divider);

            const backOpt = document.createElement('option');
            backOpt.value = "action:reload_github";
            backOpt.textContent = "🔄 Back to GitHub Builds";
            boSelect.appendChild(backOpt);
        } else {
            alert('No .json files found in that folder!');
            fetchGithubBuildOrders(); // Revert to GitHub if nothing found
        }
        e.target.value = '';
    });

    boSelect.addEventListener('change', async (e) => {
        const val = e.target.value;
        if (!val) return;

        if (val === "action:reload_github") {
            currentFileHandle = null;
            fetchGithubBuildOrders();
            return;
        }

        if (val.startsWith('remote:')) {
            currentFileHandle = null;
            // Load from GitHub URL
            const url = val.replace('remote:', '');
            try {
                const response = await fetch(url);
                const imported = await response.json();
                applyBuildOrder(imported, val.replace('remote:', '').split('/').pop()); 
            } catch (err) {
                alert("Error loading build order from GitHub!");
            }
        } else {
            // Load from local File object (stored in loadedBOFiles)
            const file = loadedBOFiles[val];
            currentFileHandle = fileHandles[val] || null;
            
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    try {
                        const imported = JSON.parse(evt.target.result);
                        applyBuildOrder(imported, val); 
                    } catch (err) {
                        alert("Error reading file! Is it valid JSON?");
                    }
                };
                reader.readAsText(file);
            }
        }
    });
}

function applyBuildOrder(data, fileName = '') {
    if (Array.isArray(data)) {
        // Ensure currentFileHandle is set if it exists in our map
        if (fileName && fileHandles[fileName]) {
            currentFileHandle = fileHandles[fileName];
        }
        
        // --- Auto Race Detection ---
        let detectedRace = null;
        const allIcons = data.flatMap(item => item.icons || []);
        const nameToSearch = (fileName + " " + (data[0]?.action || "")).toLowerCase();

        // 1. Check by keywords in name/first action
        if (nameToSearch.includes('human')) detectedRace = 'human';
        else if (nameToSearch.includes('orc')) detectedRace = 'orc';
        else if (nameToSearch.includes('undead')) detectedRace = 'undead';
        else if (nameToSearch.includes('nightelf') || nameToSearch.includes('night elf')) detectedRace = 'nightelf';

        // 2. Fallback: Check by key icons
        if (!detectedRace) {
            const raceCheckMap = {
                human: ['Peasant', 'Town Hall', 'Altar of Kings', 'Farm'],
                orc: ['Peon', 'Great Hall', 'Altar of Storms', 'Burrow'],
                undead: ['Acolyte', 'Necropolis', 'Altar of Darkness', 'Ziggurat'],
                nightelf: ['Wisp', 'Tree of Life', 'Altar of Elders', 'Moon Well']
            };
            
            for (const [r, icons] of Object.entries(raceCheckMap)) {
                if (allIcons.some(icon => icons.includes(icon))) {
                    detectedRace = r;
                    break;
                }
            }
        }

        if (detectedRace && detectedRace !== savedRace) {
            savedRace = detectedRace;
            localStorage.setItem('wc3_selected_race', savedRace);
            applyRaceUI(savedRace); // Update the dropdown UI
        }
        // ---------------------------

        buildOrder = data.map(item => ({
            ...item,
            gold: item.gold || 0,
            wood: item.wood || 0,
            foodMax: item.foodMax || 0,
            icons: item.icons || (item.icon ? [item.icon] : [])
        }));
        
        updateFileNameDisplay(fileName);
        localStorage.setItem('wc3_build_order', JSON.stringify(buildOrder));
        resetTimer();
        initTimeline();
        updateDisplay();
        if (editorModal.classList.contains('active')) renderEditor();
    }
}
// -----------------------------

editBtn.addEventListener('click', () => {
    renderEditor();
    const delayInput = document.getElementById('delayInput');
    if (delayInput) delayInput.value = savedDelay;
    editorModal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    editorModal.classList.remove('active');
});

addRowBtn.addEventListener('click', () => {
    const firstIcon = RACE_ENTITIES_CATEGORIZED[savedRace]['Buildings'][0];
    const newRow = createRow({time: 0, gold: 0, wood: 0, food: 0, foodMax: 0, action: 'New Action', subtext: '', icons: [firstIcon]});
    editorRows.appendChild(newRow);
    markAsUnsaved();
});
// --- Editor Logic ---
const delayInput = document.getElementById('delayInput');

saveEditorBtn.addEventListener('click', () => {
    const newOrder = [];
    editorRows.querySelectorAll('.editor-row').forEach(row => {
        const timeInput = row.querySelectorAll('.editor-input')[0];
        const goldInput = row.querySelectorAll('.editor-input')[1];
        const woodInput = row.querySelectorAll('.editor-input')[2];
        const spendInput = row.querySelectorAll('.editor-input')[3];
        const maxInput = row.querySelectorAll('.editor-input')[4];
        
        const headlineInput = row.querySelector('.editor-headline');
        const subtextInput = row.querySelector('.editor-subtext');
        
        let rowIcons = Array.from(row.querySelectorAll('.entity-select-trigger')).map(trigger => trigger.dataset.value);
        
        const soundDropdown = row.querySelector('.sound-dropdown');
        const soundCheckbox = row.querySelector('.sound-checkbox');

        newOrder.push({
            time: parseInt(timeInput.value) || 0,
            gold: parseInt(goldInput.value) || 0,
            wood: parseInt(woodInput.value) || 0,
            food: parseInt(spendInput.value) || 0,
            foodMax: parseInt(maxInput.value) || 0,
            action: headlineInput.value,
            subtext: subtextInput.value,
            icons: rowIcons,
            useSound: soundCheckbox.checked,
            sound: soundDropdown.value
        });
    });
    newOrder.sort((a,b) => a.time - b.time);
    
    buildOrder = newOrder;
    localStorage.setItem('wc3_build_order', JSON.stringify(buildOrder));
    // NOTE: isUnsaved is NOT cleared here because it's not saved to FILE yet.
    
    // Save delay setting
    const delayInput = document.getElementById('delayInput');
    if (delayInput) {
        const val = parseInt(delayInput.value);
        savedDelay = isNaN(val) ? 5 : val;
        localStorage.setItem('wc3_delay', savedDelay);
    }
    
    editorModal.classList.remove('active');
    
    // Show a brief loading state to prevent flickering
    const upcomingAction = document.getElementById('upcomingAction');
    upcomingAction.innerHTML = `<div style="display:flex; align-items:center; gap:10px; color:var(--text-muted); padding: 20px;"><div class="spinner"></div> Lade Build Order...</div>`;
    
    setTimeout(() => {
        resetTimer();
        initTimeline();
        updateDisplay();
    }, 400);
});

exportBtn.addEventListener('click', async () => {
    const jsonContent = JSON.stringify(buildOrder, null, 2);
    
    // Direct save if handle exists
    if (currentFileHandle && supportsFileSystemAccess) {
        try {
            // Request permission again if it was lost
            if ((await currentFileHandle.requestPermission({ mode: 'readwrite' })) === 'granted') {
                const writable = await currentFileHandle.createWritable();
                await writable.write(jsonContent);
                await writable.close();
                console.log("File saved directly to disk.");
                clearUnsaved();
                return; // Done
            }
        } catch (err) {
            console.error("Direct save failed:", err);
            // Fallback to download below
        }
    }

    // Standard Download Fallback
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonContent);
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", currentFileName.endsWith('.json') ? currentFileName : `wc3_build_order_${savedRace}.json`);
    dlAnchorElem.click();
    clearUnsaved();
});

const headerSaveBtn = document.getElementById('headerSaveBtn');
if (headerSaveBtn) {
    headerSaveBtn.addEventListener('click', () => {
        exportBtn.click();
    });
}

importFile.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    currentFileHandle = null; // No handle from standard input
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (Array.isArray(imported)) {
                applyBuildOrder(imported, file.name);
            } else {
                alert("Invalid Build Order Format!");
            }
        } catch (err) {
            alert("Error reading file. Is it valid JSON?");
        }
    };
    reader.readAsText(file);
    event.target.value = '';
});

// Single File Overwrite Support via API
async function importWithAPI() {
    try {
        const [handle] = await window.showOpenFilePicker({
            types: [{ description: 'JSON Build Order', accept: { 'application/json': ['.json'] } }],
            multiple: false
        });
        const file = await handle.getFile();
        const content = await file.text();
        const imported = JSON.parse(content);
        
        if (Array.isArray(imported)) {
            currentFileHandle = handle;
            applyBuildOrder(imported, file.name);
        }
    } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
    }
}

const importBtn = document.getElementById('importBtn');
if (importBtn) {
    importBtn.addEventListener('click', () => {
        if (supportsFileSystemAccess) {
            importWithAPI();
        } else {
            importFile.click();
        }
    });
}
const importReplayBtn = document.getElementById('importReplayBtn');
const replayInput = document.getElementById('replayInput');

if (importReplayBtn && replayInput) {
    importReplayBtn.addEventListener('click', () => replayInput.click());
    replayInput.addEventListener('change', handleReplayUpload);
}

async function handleReplayUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (typeof pako === 'undefined') {
        alert("Error: The compression library (pako) could not be loaded. If you are running this locally via file://, your browser might be blocking external scripts. Please try running via a local server or host it on GitHub Pages.");
        return;
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        
        if (data.length < 48) throw new Error("File too small to be a WC3 replay.");

        // --- W3G Parsing ---
        // 1. Decompress Blocks
        let decompressed = new Uint8Array(0);
        const headerSize = data[28] | (data[29] << 8) | (data[30] << 16) | (data[31] << 24);
        let pos = headerSize; 
        let lastError = "";
        while (pos < data.length - 8) {
            const compSize = data[pos] | (data[pos+1] << 8);
            const decompSize = data[pos+2] | (data[pos+3] << 8);
            
            if (compSize === 0) {
                pos++;
                continue;
            }

            pos += 8; // skip block header (2+2+4)
            
            if (pos + compSize > data.length) break;

            try {
                const block = data.slice(pos, pos + compSize);
                // Optional: Check for Zlib header (0x78)
                const inflated = pako.inflate(block);
                
                const newDecomp = new Uint8Array(decompressed.length + inflated.length);
                newDecomp.set(decompressed);
                newDecomp.set(inflated, decompressed.length);
                decompressed = newDecomp;
            } catch (inflateErr) {
                lastError = inflateErr.message;
                console.warn("Block at " + pos + " failed: ", inflateErr.message);
            }
            
            pos += compSize;
        }

        if (decompressed.length === 0) {
            let hex = "";
            for (let i = 0; i < Math.min(data.length, 50); i++) {
                hex += data[i].toString(16).padStart(2, '0') + " ";
            }
            throw new Error("Decompression failed. Last error: " + lastError + "\nChecked: " + pos + " bytes.\n\nFirst 50 bytes (Hex):\n" + hex);
        }

        // 2. Scan Actions
        const bo = [];
        let time = 0;
        let dPos = 0;
        
        // Basic scan for '0x10' (Ability/Build) packets
        // This is a simplified parser
        while (dPos < decompressed.length - 20) {
            const blockId = decompressed[dPos];
            
            if (blockId === 0x1E || blockId === 0x1F) {
                const blockSize = decompressed[dPos+1] | (decompressed[dPos+2] << 8);
                const blockData = decompressed.slice(dPos, dPos + blockSize);
                
                // Read Time Increment
                const timeInc = blockData[1] | (blockData[2] << 8);
                time += timeInc;
                
                // Scan for actions in this block
                let aPos = 5; // Start of actions
                while (aPos < blockData.length - 10) {
                    const actionId = blockData[aPos];
                    if (actionId === 0x10) {
                        // Action 0x10: Ability Command
                        const abilityCode = String.fromCharCode(blockData[aPos+10], blockData[aPos+11], blockData[aPos+12], blockData[aPos+13]);
                        const actionName = findActionNameByCode(abilityCode);
                        
                        if (actionName) {
                            bo.push({
                                time: Math.floor(time / 1000),
                                gold: 0, wood: 0, food: 0, foodMax: 0,
                                action: actionName,
                                icons: [actionName]
                            });
                        }
                        aPos += 14; // Approximate size
                    } else if (actionId === 0x11) {
                        aPos += 22;
                    } else if (actionId === 0x12) {
                        aPos += 10;
                    } else {
                        aPos++;
                    }
                }
                dPos += blockSize;
            } else if (blockId === 0x17) {
                dPos += 4; // Skip info
            } else {
                dPos++;
            }
        }

        if (bo.length > 0) {
            applyBuildOrder(bo, file.name.replace('.w3g', ''));
        } else {
            alert("Could not find any build actions in this replay. Note: Only major build/train actions are detected.");
        }

    } catch (err) {
        console.error(err);
        alert("Error parsing replay: " + err.message + "\n\nThis parser is experimental and might not support all WC3 versions.");
    }
    e.target.value = '';
}

// Map of common WC3 internal codes to names
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

function findActionNameByCode(code) {
    code = code.toLowerCase();
    return ABILITY_CODES[code] || null;
}

// Unused logic removed.
// --- Feedback System ---
const feedbackBtn = document.getElementById('feedbackBtn');
const feedbackModal = document.getElementById('feedbackModal');
const closeFeedbackBtn = document.getElementById('closeFeedbackBtn');
const submitFeedbackBtn = document.getElementById('submitFeedbackBtn');
const feedbackNameInput = document.getElementById('feedbackName');
const feedbackMsgInput = document.getElementById('feedbackMessage');

if (feedbackBtn && feedbackModal && closeFeedbackBtn && submitFeedbackBtn) {
    feedbackBtn.addEventListener('click', () => {
        feedbackModal.classList.add('active');
    });

    closeFeedbackBtn.addEventListener('click', () => {
        feedbackModal.classList.remove('active');
    });

    submitFeedbackBtn.addEventListener('click', () => {
        const name = feedbackNameInput.value.trim() || 'Anonymous';
        const msg = feedbackMsgInput.value.trim();
        
        if (!msg) {
            alert('Please enter a message first!');
            return;
        }

        const title = encodeURIComponent(`[Feedback/Bug] from ${name}`);
        const body = encodeURIComponent(`Feedback/Bug Content:\n\n${msg}\n\n--- Submitted via Build Order Helper ---`);
        const url = `https://github.com/Jinzo92/WC3-Build-Order-Helper/issues/new?title=${title}&body=${body}`;
        
        window.open(url, '_blank');
        feedbackModal.classList.remove('active');
        feedbackNameInput.value = '';
        feedbackMsgInput.value = '';
    });
}
// -----------------------------

// Start
initTimeline();
updateDisplay();

