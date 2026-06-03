$path = "main.js"
$content = [IO.File]::ReadAllText($path)

$oldBlock = @"
        if (dPos === -1) {
"@

$newBlock = @"
        // DEBUG: Search for hfoo (Footman) or other units in the entire stream
        const searchCodes = ['hfoo', 'opeo', 'uaco', 'ewsp', 'hpea', 'ogru'];
        for (let i = 0; i < decompressed.length - 10; i++) {
            const potential = String.fromCharCode(decompressed[i], decompressed[i+1], decompressed[i+2], decompressed[i+3]);
            const potentialRev = String.fromCharCode(decompressed[i+3], decompressed[i+2], decompressed[i+1], decompressed[i]);
            
            if (searchCodes.includes(potential) || searchCodes.includes(potentialRev)) {
                let context = "";
                for(let j=-5; j<10; j++) context += (decompressed[i+j] || 0).toString(16).padStart(2, '0') + " ";
                console.log("FOUND UNIT CODE: " + (potential || potentialRev) + " at " + i + " Context: " + context);
            }
        }

        if (dPos === -1) {
"@

if ($content.Contains($oldBlock)) {
    $newContent = $content.Replace($oldBlock, $newBlock)
    [IO.File]::WriteAllText($path, $newContent)
    Write-Host "SUCCESS"
} else {
    Write-Host "FAILURE"
}
