$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
        let time = 0;
        let dPos = -1;

        // Robust dPos search: find first block that looks like a valid TimeSlot (1E or 1F)
        // and is followed by another valid block ID at the expected offset.
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
"@

$newBlock = @"
        let time = 0;
        let dPos = -1;
        let myPlayerId = -1;

        // First, find the player ID of the user (jinzo#2205)
        // Metadata 0x10 blocks contain player names.
        for (let i = 0; i < Math.min(decompressed.length, 4000); i++) {
            if (decompressed[i] === 0x10) {
                let pName = "";
                for(let j=i+6; j<i+50 && decompressed[j] !== 0; j++) pName += String.fromCharCode(decompressed[j]);
                if (pName.toLowerCase().includes("jinzo")) {
                    myPlayerId = decompressed[i+1];
                    console.log("Detected Player ID for jinzo: " + myPlayerId);
                    break;
                }
            }
        }

        // Robust dPos search: Skip metadata (0x10, 0x14, etc.) and find first GameData block (0x1E/0x1F/0x22)
        // Usually GameData starts after the massive 0x14/0x19 metadata chunks.
        for (let i = 0; i < decompressed.length - 100; i++) {
            if (decompressed[i] === 0x1F || decompressed[i] === 0x1E) {
                const bc = decompressed[i+1] | (decompressed[i+2] << 8);
                if (bc > 2 && bc < 1000) {
                    // Check if there is a valid block sequence following
                    let nextPos = i + 3 + bc;
                    if (nextPos < decompressed.length) {
                        const nid = decompressed[nextPos];
                        if (nid === 0x1E || nid === 0x1F || nid === 0x22 || nid === 0x20) {
                            dPos = i;
                            break;
                        }
                    }
                }
            }
        }
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
