var fso = new ActiveXObject("Scripting.FileSystemObject");
var f = fso.OpenTextFile("main.js", 1);
var content = f.ReadAll();
f.Close();

var replacement = `        let dPos = -1;
        
        // Find start of Game Data by looking for two consecutive valid TimeSlot blocks
        for (var i = 0; i < 4000 && i < decompressed.length - 10; i++) {
            if (decompressed[i] === 0x1E || decompressed[i] === 0x1F) {
                var bc = decompressed[i+1] | (decompressed[i+2] << 8);
                if (bc >= 2 && i + 1 + bc < decompressed.length) {
                    var nid = decompressed[i + 1 + bc];
                    if (nid === 0x1E || nid === 0x1F) {
                        var bc2 = decompressed[i + 1 + bc + 1] | (decompressed[i + 1 + bc + 2] << 8);
                        if (bc2 >= 2 && i + 1 + bc + 1 + bc2 < decompressed.length) {
                            var nnid = decompressed[i + 1 + bc + 1 + bc2];
                            if (nnid === 0x1E || nnid === 0x1F || nnid === 0x17 || nnid === 0x20 || nnid === 0x22 || nnid === 0x2F || nnid === 0) {
                                dPos = i;
                                break;
                            }
                        }
                    } else if (nid === 0x17 || nid === 0x20 || nid === 0x22 || nid === 0x2F || nid === 0) {
                        dPos = i;
                        break;
                    }
                }
            }
        }

        if (dPos === -1) {
            let hex = "";
            for(let i=0; i<Math.min(decompressed.length, 100); i++) {
                hex += decompressed[i].toString(16).padStart(2, '0') + " ";
            }
            throw new Error("Could not find start of Game Data stream.\\nFirst 100 decomp bytes:\\n" + hex);
        }

        // Robust GameDataBlock parser
        while (dPos < decompressed.length) {
            const blockId = decompressed[dPos++];
            
            if (blockId === 0x1E || blockId === 0x1F) {
                const byteCount = decompressed[dPos] | (decompressed[dPos+1] << 8);
                const timeInc = decompressed[dPos+2] | (decompressed[dPos+3] << 8);
                time += timeInc;
                
                let cPos = dPos + 4;
                const endPos = dPos + byteCount;
                
                while (cPos < endPos) {
                    const playerId = decompressed[cPos++];
                    const actionBlockLength = decompressed[cPos] | (decompressed[cPos+1] << 8);
                    cPos += 2;
                    
                    let aPos = cPos;
                    const aEnd = cPos + actionBlockLength;
                    
                    while (aPos < aEnd) {
                        const actionId = decompressed[aPos++];
                        if (actionId === 0x10) {
                            const abilityCode = String.fromCharCode(decompressed[aPos+10], decompressed[aPos+11], decompressed[aPos+12], decompressed[aPos+13]);
                            const actionName = findActionNameByCode(abilityCode);
                            if (actionName) {
                                bo.push({
                                    time: Math.floor(time / 1000),
                                    gold: 0, wood: 0, food: 0, foodMax: 0,
                                    action: actionName,
                                    icons: [actionName]
                                });
                            }
                            aPos += 14;
                        } else if (actionId === 0x11) {
                            aPos += 22;
                        } else if (actionId === 0x12) {
                            aPos += 10;
                        } else {
                            break;
                        }
                    }
                    cPos = aEnd; // ALWAYS skip to the end of the action block
                }
                dPos += byteCount;
            } else if (blockId === 0x17) {
                dPos += 13;
            } else if (blockId === 0x1a || blockId === 0x1b || blockId === 0x1c) {
                dPos += 4;
            } else if (blockId === 0x20) {
                dPos++; // playerId
                const msgLen = decompressed[dPos] | (decompressed[dPos+1] << 8);
                dPos += 2;
                const flags = decompressed[dPos++];
                if (flags === 0x20) dPos += 4;
                while (dPos < decompressed.length && decompressed[dPos] !== 0) dPos++;
                dPos++; // skip null
            } else if (blockId === 0x22) {
                const len = decompressed[dPos++];
                dPos += len;
            } else if (blockId === 0x23) {
                dPos += 10;
            } else if (blockId === 0x2f) {
                dPos += 8;
            } else if (blockId === 0) {
                break;
            } else {
                break;
            }
        }

        if (bo.length > 0) {`;

content = content.replace(/let dPos = 0;[\s\S]*?if \(bo\.length > 0\) \{/g, replacement);

var f2 = fso.OpenTextFile("main.js", 2);
f2.Write(content);
f2.Close();
WScript.Echo("DONE");
