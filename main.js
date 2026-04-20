const SUPPLY_ICON = `<img src="icons/Supply.png" alt="Supply">`;
const GOLD_ICON = `<img src="icons/Gold.png" alt="Gold">`;
const WOOD_ICON = `<img src="icons/Wood.png" alt="Wood">`;

// --- Sound System Configuration ---
const SOUND_PATH = 'Sound/WC3/';
const SPECIAL_SOUNDS = {
    'tier2': 'tier2.mp3',
    'tier3': 'tier3.mp3',
    'hero': 'hero.mp3',
    'default': 'ping.mp3'
};
const TIER2_KEYWORDS = ["Keep", "Stronghold", "Halls of the Dead", "Tree of Ages", "Tier 2", "Tech 2"];
const TIER3_KEYWORDS = ["Castle", "Fortress", "Black Citadel", "Tree of Eternity", "Tier 3", "Tech 3"];
const HERO_KEYWORDS = ["Altars", "Train Archmage", "Train Paladin", "Train Mountain King", "Train Blood Mage", "Train Blademaster", "Train Far Seer", "Train Tauren Chieftain", "Train Shadow Hunter", "Train Death Knight", "Train Lich", "Train Dreadlord", "Train Crypt Lord", "Train Demon Hunter", "Train Keeper", "Train Priestess", "Train Warden"];

function playActionSound(actionText) {
    try {
        let soundFile = SPECIAL_SOUNDS['default'];
        
        const lowerAction = actionText.toLowerCase();
        if (TIER2_KEYWORDS.some(k => lowerAction.includes(k.toLowerCase()))) {
            soundFile = SPECIAL_SOUNDS['tier2'];
        } else if (TIER3_KEYWORDS.some(k => lowerAction.includes(k.toLowerCase()))) {
            soundFile = SPECIAL_SOUNDS['tier3'];
        } else if (HERO_KEYWORDS.some(k => lowerAction.includes(k.toLowerCase()))) {
            soundFile = SPECIAL_SOUNDS['hero'];
        }

        const audio = new Audio(SOUND_PATH + soundFile);
        audio.volume = 0.4;
        audio.play().catch(e => {
            // Audio might be blocked by browser until user interacts
            console.warn("Audio playback failed (interaction required?):", e);
        });
    } catch (err) {
        console.error("Sound error:", err);
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
    "Anti-magic Potion": "Anti-magic Potion",
    "Book of the Dead": "BookOfTheDead",
    "Boots of Speed": "BootsOfSpeed",
    "Circlet of Nobility": "CircletofNobility",
    "Claws of Attack": "ClawsOfAttack",
    "Cloak of Flames": "CloakOfFlames",
    "Cloak of Shadows": "Cloakofshadows",
    "Dust of Appearance": "DustOfAppearance",
    "Gloves of Speed": "Glovesofspeed",
    "Healing Salve": "HealingSalve",
    "Healing Ward": "HealingWard",
    "Ivory Tower": "IvoryTower",
    "Gold Mine": "Goldmine",
    "Gold": "Gold",
    "Wood": "Wood",
    "Spacer": "Blank",
    "Arrow Right": "ArrowRight",
    "Lesser Clarity Potion": "LesserClarityPotion",
    "Lesser Invisibility": "LesserInvisibility",
    "Mantle of Intelligence": "MantleOfIntelligence",
    "Mechanical Critter": "MechanicalCritter",
    "Moon Stone": "MoonStone",
    "Orb of Corruption": "OrbOfCorruption",
    "Orb of Lightning": "OrbOfLightning",
    "Orb of Venom": "OrbOfVenom",
    "Orb of Slow": "OrbofSlowness",
    "Periapt of Vitality": "PeriaptofVitality",
    "Potion of Healing": "PotionofHealing",
    "Potion of Lesser Invulnerability": "BTNPotionofLesserInvulneralbility",
    "Potion of Mana": "PotionofMana",
    "Ritual Dagger": "RitualDagger",
    "Rod of Necromancy": "RodOfNecromancy",
    "Sacrificial Skull": "SacrificialSkull",
    "Scroll of Healing": "ScrollOfHealing",
    "Scroll of Protection": "ScrollOfProtection",
    "Scroll of Regeneration": "ScrollOfRegeneration",
    "Scroll of Speed": "ScrollOfSpeed",
    "Scroll of Town Portal": "ScrollofTownPortal",
    "Staff of Preservation": "StaffOfPreservation",
    "Staff of Sanctuary": "StaffOfSanctuary",
    "Staff of Teleportation": "StaffOfTeleportation",
    "Tiny Great Hall": "BTNTinyGreatHall",
    "Tome of Retraining": "TomeOfRetraining",
    "Wand of Negation": "WandOfNegation"
};

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
        "Items": [
            "Scroll of Town Portal", "Potion of Healing", "Potion of Mana", "Scroll of Regeneration", "Lesser Clarity Potion", "Ivory Tower", "Orb of Slow", "Staff of Sanctuary", "Mechanical Critter", "Tiny Great Hall",
            "Scroll of Healing", "Scroll of Protection", "Boots of Speed", "Dust of Appearance", "Potion of Lesser Invulnerability", "Staff of Teleportation", "Tome of Retraining", "Circlet of Nobility", "Periapt of Vitality", "Wand of Negation"
        ],
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
        "Items": [
            "Scroll of Town Portal", "Healing Salve", "Lesser Clarity Potion", "Scroll of Speed", "Orb of Lightning", "Tiny Great Hall",
            "Potion of Healing", "Potion of Mana", "Scroll of Healing", "Scroll of Protection", "Boots of Speed", "Dust of Appearance", "Potion of Lesser Invulnerability", "Staff of Teleportation", "Tome of Retraining", "Circlet of Nobility", "Periapt of Vitality", "Wand of Negation"
        ],
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
        "Items": [
            "Scroll of Town Portal", "Rod of Necromancy", "Sacrificial Skull", "Ritual Dagger", "Dust of Appearance", "Orb of Corruption",
            "Potion of Healing", "Potion of Mana", "Scroll of Healing", "Scroll of Protection", "Boots of Speed", "Potion of Lesser Invulnerability", "Staff of Teleportation", "Tome of Retraining", "Circlet of Nobility", "Periapt of Vitality", "Wand of Negation"
        ],
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
        "Items": [
            "Scroll of Town Portal", "Moon Stone", "Lesser Clarity Potion", "Dust of Appearance", "Staff of Preservation", "Orb of Venom", "Anti-magic Potion",
            "Potion of Healing", "Potion of Mana", "Scroll of Healing", "Scroll of Protection", "Boots of Speed", "Potion of Lesser Invulnerability", "Staff of Teleportation", "Tome of Retraining", "Circlet of Nobility", "Periapt of Vitality", "Wand of Negation"
        ],
        "Resources": [
            "Gold Mine", "Gold", "Wood", "Spacer"
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
        
        html += `<img src="${trys[0]}" alt="${iconName}" class="${customClass}" data-retry="0" onerror="${fallbackCode}" id="img_${uniqueTimeId}_${arrIdx}">`;
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
                playActionSound(event.action);
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
                <span class="highlight-gold">${currentNextEvent.action}</span>
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

const raceDropdown = document.getElementById('raceDropdown');
const dropdownSelected = document.getElementById('dropdownSelected');
const dropdownOptionsEls = document.querySelectorAll('.dropdown-option');

function applyRaceUI(raceValue) {
    const opt = document.querySelector(`.dropdown-option[data-value="${raceValue}"]`);
    if(opt) {
        const selImg = document.querySelector('#dropdownSelected img');
        const selText = document.querySelector('#selectedRaceText');
        selImg.style.display = '';
        selImg.src = opt.dataset.img;
        selText.textContent = opt.dataset.text;
    }
}
applyRaceUI(savedRace);

dropdownSelected.addEventListener('click', (e) => {
    raceDropdown.classList.toggle('open');
    e.stopPropagation();
});

dropdownOptionsEls.forEach(option => {
    option.addEventListener('click', () => {
        const val = option.dataset.value;
        localStorage.setItem('wc3_selected_race', val);
        savedRace = val;
        applyRaceUI(val);
        raceDropdown.classList.remove('open');
        
        if(editorModal.classList.contains('active')) {
            renderEditor();
        }
    });
});

document.addEventListener('click', () => {
    raceDropdown.classList.remove('open');
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
        <input type="text" class="editor-input" value="${item.action}">
        <div class="icons-wrapper" style="display:flex; flex-direction:column;">
            <div class="icons-list" style="display:flex; flex-direction:column;">
                ${iconsContainerHtml}
            </div>
            <button type="button" class="add-icon-btn" style="background:rgba(16, 185, 129, 0.1); color:#10b981; border:1px solid rgba(16, 185, 129, 0.3); border-radius:8px; cursor:pointer; width:100%; padding:3px; transition: all 0.2s; margin-top:2px;" title="Add another icon to this row">➕</button>
        </div>
        <button type="button" class="del-btn">🗑️</button>
    `;
    
    // Delegation for dropdowns within the row
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
            return;
        }

        const removeBtn = e.target.closest('.remove-icon-btn');
        if (removeBtn) {
            removeBtn.closest('.icon-select-group').remove();
            return;
        }

        const delBtn = e.target.closest('.del-btn');
        if (delBtn) {
            div.remove();
            return;
        }
    });

    const iconsList = div.querySelector('.icons-list');
    div.querySelector('.add-icon-btn').addEventListener('click', () => {
        const firstBuilding = RACE_ENTITIES_CATEGORIZED[savedRace].Buildings[0];
        const newSelectStr = buildSelectHTML(firstBuilding);
        iconsList.insertAdjacentHTML('beforeend', newSelectStr);
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
const loadFolderBtn = document.getElementById('loadFolderBtn');
const boSelect = document.getElementById('boSelect');
const folderInput = document.getElementById('folderInput');

let loadedBOFiles = {}; // Maps filename to either a File object (local) or a URL string (remote)

// GitHub Config
const GITHUB_USER = 'Jinzo92';
const GITHUB_REPO = 'WC3-Build-Order-Helper';
const GITHUB_PATH = 'build-orders';

async function fetchGithubBuildOrders() {
    try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`);
        if (!response.ok) throw new Error('GitHub API not available');
        
        const files = await response.json();
        const jsonFiles = files.filter(f => f.name.endsWith('.json'));
        
        if (jsonFiles.length > 0) {
            // Only clear if we actually have remote files
            boSelect.innerHTML = '<option value="">-- Select GitHub BO --</option>';
            
            jsonFiles.forEach(file => {
                const option = document.createElement('option');
                option.value = 'remote:' + file.download_url; // Prefix to distinguish from local
                option.textContent = "🌐 " + file.name.replace('.json', '');
                boSelect.appendChild(option);
            });
            boSelect.style.display = 'block';
        }
    } catch (err) {
        console.warn("Could not load BOs from GitHub:", err);
    }
}

if (loadFolderBtn && folderInput && boSelect) {
    // Show select by default (will be filled by GitHub or stay empty/hidden if error)
    boSelect.style.display = 'block';
    fetchGithubBuildOrders();

    loadFolderBtn.addEventListener('click', () => {
        folderInput.click();
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
            fetchGithubBuildOrders();
            return;
        }

        if (val.startsWith('remote:')) {
            // Load from GitHub URL
            const url = val.replace('remote:', '');
            try {
                const response = await fetch(url);
                const imported = await response.json();
                applyBuildOrder(imported, val); // val contains the URL/name
            } catch (err) {
                alert("Error loading build order from GitHub!");
            }
        } else {
            // Load from local File object (stored in loadedBOFiles)
            const file = loadedBOFiles[val];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    try {
                        const imported = JSON.parse(evt.target.result);
                        applyBuildOrder(imported, val); // val is the filename
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
    editorRows.appendChild(createRow({time: 0, gold: 0, wood: 0, food: 0, foodMax: 0, action: 'New Action', icons: [firstIcon]}));
});

saveEditorBtn.addEventListener('click', () => {
    const newOrder = [];
    editorRows.querySelectorAll('.editor-row').forEach(row => {
        const inputs = row.querySelectorAll('.editor-input');
        
        let rowIcons = Array.from(row.querySelectorAll('.entity-select-trigger')).map(trigger => trigger.dataset.value);
        
        newOrder.push({
            time: parseInt(inputs[0].value) || 0,
            gold: parseInt(inputs[1].value) || 0,
            wood: parseInt(inputs[2].value) || 0,
            food: parseInt(inputs[3].value) || 0,
            foodMax: parseInt(inputs[4].value) || 0,
            action: inputs[5].value,
            icons: rowIcons
        });
    });
    newOrder.sort((a,b) => a.time - b.time);
    
    buildOrder = newOrder;
    localStorage.setItem('wc3_build_order', JSON.stringify(buildOrder));
    
    // Save delay setting
    const delayInput = document.getElementById('delayInput');
    if (delayInput) {
        const val = parseInt(delayInput.value);
        savedDelay = isNaN(val) ? 5 : val;
        localStorage.setItem('wc3_delay', savedDelay);
    }
    
    editorModal.classList.remove('active');
    
    resetTimer();
    initTimeline();
    updateDisplay();
});

exportBtn.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(buildOrder, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `wc3_build_order_${savedRace}.json`);
    dlAnchorElem.click();
});

importFile.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (Array.isArray(imported)) {
                buildOrder = imported.map(item => ({
                    ...item,
                    gold: item.gold || 0,
                    wood: item.wood || 0,
                    foodMax: item.foodMax || 0,
                    icons: item.icons || (item.icon ? [item.icon] : [])
                }));
                renderEditor();
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

// Start
initTimeline();
updateDisplay();

const loadCustomIconsBtn = document.getElementById('loadCustomIconsBtn');
const customIconInput = document.getElementById('customIconInput');

loadCustomIconsBtn.addEventListener('click', () => {
    customIconInput.click();
});

customIconInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    let newCustomIcons = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const name = file.name;
        
        // Only accept images
        if (/\.(png|webp|jpg|jpeg)$/i.test(name)) {
            // Create a pretty name: remove BTN prefix and extension
            let cleanName = name.replace(/^BTN/i, '').replace(/\.(png|webp|jpg|jpeg)$/i, '');
            // Add spaces back for readability if it was CamelCase (optional but nice)
            cleanName = cleanName.replace(/([A-Z])/g, ' $1').trim();
            
            newCustomIcons.push(cleanName);
            
            // Map the pretty name to the actual filename for loading
            ICON_MAPPING[cleanName] = name.replace(/\.(png|webp|jpg|jpeg)$/i, '');
        }
    }

    if (newCustomIcons.length > 0) {
        // Remove duplicates and update all races
        newCustomIcons = [...new Set(newCustomIcons)];
        
        for (let race in RACE_ENTITIES_CATEGORIZED) {
            RACE_ENTITIES_CATEGORIZED[race].Custom = newCustomIcons;
        }
        
        alert(`${newCustomIcons.length} Custom Icons geladen! Du findest sie jetzt ganz unten im Editor.`);
        
        // Re-render editor to show new options
        if (editorModal.classList.contains('active')) {
            renderEditor();
        }
    }
});
