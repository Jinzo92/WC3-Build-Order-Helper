const fs = require('fs');
const content = fs.readFileSync('main.js', 'utf8');

// A minimal context to evaluate
const sandbox = {};
const parseFnText = content.substring(
    content.indexOf('function parseBuildOrderText(text) {'),
    content.indexOf('// Paste Build Order UI Logic')
);
const wc3costsText = content.substring(
    content.indexOf('const WC3_COSTS = {'),
    content.indexOf('function parseBuildOrderText')
);

eval(wc3costsText + '\n' + parseFnText);

const testText = `00:02	Built a Peasant
6
00:18	Built an Altar of Kings
01:32	Built a Paladin
HERO
02:08	Cancelled Peasant
02:30	Trained Holy Light Level 1
03:30	Upgraded Keep
TECH`;

const bo = parseBuildOrderText(testText);
console.log(JSON.stringify(bo, null, 2));
