let totalDistanceKm = 300;
let prev = 0.1;
let lastTick = Date.now();
let covered = 0;
for(let i=0; i<600; i++) { // 60 seconds (100ms intervals)
    let deltaMs = 100;
    let kmCovered = (deltaMs / 60000) * 1;
    let increment = (kmCovered / totalDistanceKm) * 100;
    prev += increment;
}
let currentCoveredDist = ((prev / 100) * totalDistanceKm).toFixed(2);
console.log(currentCoveredDist); // Should be 1.30 (0.30 initial + 1.00)
