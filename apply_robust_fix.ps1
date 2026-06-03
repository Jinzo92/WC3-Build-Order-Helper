$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
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
            let hex = "";
            for(let i=0; i<Math.min(decompressed.length, 100); i++) {
                hex += decompressed[i].toString(16).padStart(2, '0') + " ";
            }
            alert("Could not find any build actions in this replay.\nFirst 100 decomp bytes:\n" + hex + "\nNote: Only major build/train actions are detected.");
        }

    } catch (err) {
        console.error(err);
        alert("Error parsing replay: " + err.message + "\n\nThis parser is experimental and might not support all WC3 versions.");
    }
"@

$newBlock = @"
        const bo = [];
        let time = 0;
        
        // Robustly find start of Game Data
        let dPos = -1;
        for (let i = 0; i < decompressed.length - 100; i++) {
            if (decompressed[i] === 0x1E || decompressed[i] === 0x1F) {
                const bc = decompressed[i+1] | (decompressed[i+2] << 8);
                if (bc >= 2 && i + 3 + bc < decompressed.length) {
                    const nid = decompressed[i + 3 + bc];
                    if (nid === 0x1E || nid === 0x1F || nid === 0x17 || nid === 0x20 || nid === 0x22 || nid === 0x2F) {
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
            throw new Error("Could not find start of Game Data stream.\nFirst 100 bytes:\n" + hex);
        }

        while (dPos < decompressed.length - 5) {
            const blockId = decompressed[dPos];
            
            if (blockId === 0x1E || blockId === 0x1F) {
                const n = decompressed[dPos+1] | (decompressed[dPos+2] << 8);
                const timeInc = decompressed[dPos+3] | (decompressed[dPos+4] << 8);
                time += timeInc;
                
                let p = dPos + 5;
                const end = dPos + 3 + n;
                
                while (p < end - 3) {
                    const pid = decompressed[p++];
                    const actionLen = decompressed[p] | (decompressed[p+1] << 8);
                    p += 2;
                    
                    const actionEnd = p + actionLen;
                    while (p < actionEnd) {
                        const aid = decompressed[p++];
                        if (aid === 0x10) {
                            if (p + 13 <= actionEnd) {
                                const abilityCode = String.fromCharCode(decompressed[p+9], decompressed[p+10], decompressed[p+11], decompressed[p+12]);
                                const actionName = findActionNameByCode(abilityCode);
                                if (actionName) {
                                    bo.push({
                                        time: Math.floor(time / 1000),
                                        gold: 0, wood: 0, food: 0, foodMax: 0,
                                        action: actionName,
                                        icons: [actionName]
                                    });
                                }
                            }
                            p += 14;
                        } else if (aid === 0x11) {
                            p += 22;
                        } else if (aid === 0x12) {
                            p += 10;
                        } else if (aid === 0x13) {
                            p += 38;
                        } else if (aid === 0x14) {
                            p += 43;
                        } else if (aid === 0x16) {
                            p += 20;
                        } else if (aid === 0x17) {
                            p += 35;
                        } else if (aid === 0x18) {
                            p += 2;
                        } else if (aid === 0x19) {
                            p += 2;
                        } else if (aid === 0x1A) {
                            p += 1;
                        } else if (aid === 0x1B) {
                            p += 9;
                        } else if (aid === 0x1C) {
                            p += 9;
                        } else if (aid === 0x1D) {
                            p += 1;
                        } else if (aid === 0x21) {
                            p += 8;
                        } else if (aid === 0x27 || aid === 0x28 || aid === 0x2D) {
                            p += 5;
                        } else if (aid === 0x2E) {
                            p += 4;
                        } else if (aid === 0x60 || aid === 0x61 || aid === 0x62) {
                            p += 8;
                        } else if (aid === 0x6B) {
                            p += 9;
                        } else {
                            break;
                        }
                    }
                    p = actionEnd;
                }
                dPos = end;
            } else if (blockId === 0x17) {
                dPos += 13;
            } else if (blockId === 0x20) {
                dPos++; // ID
                dPos++; // PID
                const len = decompressed[dPos] | (decompressed[dPos+1] << 8);
                dPos += 2 + len;
            } else if (blockId === 0x22) {
                dPos++; // ID
                const len = decompressed[dPos++];
                dPos += len;
            } else if (blockId === 0x23) {
                dPos += 11;
            } else if (blockId === 0x2F) {
                dPos += 9;
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
            alert("Replay parsed but no build actions found.\nStream Length: " + decompressed.length + "\nGameData Start (dPos): " + dPos + "\nFirst 100 bytes:\n" + hex);
        }

    } catch (err) {
        console.error(err);
        alert("Error parsing replay: " + err.message + "\n\nThis parser is experimental and might not support all WC3 versions.");
    }
"@

if ($content.Contains($oldBlock)) {
    $newContent = $content.Replace($oldBlock, $newBlock)
    [IO.File]::WriteAllText($path, $newContent)
    Write-Host "SUCCESS"
} else {
    # Fallback to normalized comparison in case of line ending issues
    $oldBlockNorm = $oldBlock.Replace("`r`n", "`n")
    $contentNorm = $content.Replace("`r`n", "`n")
    if ($contentNorm.Contains($oldBlockNorm)) {
        $newContentNorm = $contentNorm.Replace($oldBlockNorm, $newBlock.Replace("`r`n", "`n"))
        [IO.File]::WriteAllText($path, $newContentNorm)
        Write-Host "SUCCESS (NORMALIZED)"
    } else {
        Write-Host "FAILURE: Old block not found"
        # Debugging: show first few lines of old block
        Write-Host "Expected first line: '$($oldBlock.Split("`n")[0])'"
    }
}
