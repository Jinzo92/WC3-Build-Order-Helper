$content = Get-Content -Path 'main.js' -Raw

$target = @"
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
            let hex = "";
            for(let i=0; i<Math.min(decompressed.length, 100); i++) {
                hex += decompressed[i].toString(16).padStart(2, '0') + " ";
            }
            alert("Could not find any build actions in this replay.\nFirst 100 decomp bytes:\n" + hex + "\nNote: Only major build/train actions are detected.");
        }
"@

$replacement = @"
        // Find start of Game Data by looking for two consecutive valid TimeSlot blocks
        let dPos = -1;
        for (let i = 0; i < 4000 && i < decompressed.length - 10; i++) {
            if (decompressed[i] === 0x1E || decompressed[i] === 0x1F) {
                const bc = decompressed[i+1] | (decompressed[i+2] << 8);
                if (bc >= 2 && i + 1 + bc < decompressed.length) {
                    const nid = decompressed[i + 1 + bc];
                    if (nid === 0x1E || nid === 0x1F) {
                        const bc2 = decompressed[i + 1 + bc + 1] | (decompressed[i + 1 + bc + 2] << 8);
                        if (bc2 >= 2 && i + 1 + bc + 1 + bc2 < decompressed.length) {
                            const nnid = decompressed[i + 1 + bc + 1 + bc2];
                            if ([0x1E, 0x1F, 0x17, 0x20, 0x22, 0x2F, 0].includes(nnid)) {
                                dPos = i;
                                break;
                            }
                        }
                    } else if ([0x17, 0x20, 0x22, 0x2F, 0].includes(nid)) {
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
            throw new Error("Could not find start of Game Data stream.\nFirst 100 decomp bytes:\n" + hex);
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
                            // Unknown action ID, break and skip rest of block
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
                while (dPos < decompressed.length && decompressed[dPos] -ne 0) dPos++;
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
                // Unknown block
                break;
            }
        }

        if (bo.length > 0) {
            applyBuildOrder(bo, file.name.replace('.w3g', ''));
        } else {
            alert("Could not find any major build/train actions in this replay.\nThe stream was parsed, but no 0x10 actions matched our dictionary.");
        }
"@

if ($content.Contains($target)) {
    $content = $content.Replace($target, $replacement)
    Set-Content -Path 'main.js' -Value $content
    Write-Host "PATCH_SUCCESS"
} else {
    Write-Host "TARGET_NOT_FOUND"
}
