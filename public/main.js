class CacheSimulator {
    constructor(cacheSize, cacheAccessTime, memoryAccessTime, blockSize) {
        this.cacheSize = cacheSize;
        this.cacheAccessTime = cacheAccessTime;
        this.memoryAccessTime = memoryAccessTime;
        this.blockSize = blockSize;
        this.cache = new Array(cacheSize).fill(null).map((_, index) => ({
            mmBlock: null,
            age: 0,
            cacheBlock: index
        }));
        this.hits = 0;
        this.misses = 0;
        this.simulatedFlow = [];
        this.programFlow = [];
        this.simulated = false;
        this.visualizedSteps = 0; // ctr
    }

    addProgramFlow(mmBlock) {
        this.programFlow.push(mmBlock);
    }

    simulate() {
        this.simulatedFlow = []; // Clear previous simulation steps
        const newProgramFlow = this.programFlow.slice(this.simulatedFlow.length);
        
        newProgramFlow.forEach(mmBlock => {
            this.simulatedFlow.push({ mmBlock, hit: null });
        });
        
        this.simulated = true;
    }
    
    nextStep() {
        if (!this.simulated) {
            alert('Please run the simulation first.');
            return;
        }
        
        if (this.visualizedSteps < this.simulatedFlow.length) {
            const step = this.simulatedFlow[this.visualizedSteps];
            let hit = false;
            let modifiedBlock = null;
        
            // Check for hit
            this.cache.forEach(block => {
                if (block.mmBlock === step.mmBlock) {
                    hit = true;
                    this.hits++;
                    const accessedAge = block.age;
                    this.cache.forEach(b => {
                        if (b.age < accessedAge) {
                            b.age++;
                        }
                    });
                    block.age = 0;
                    modifiedBlock = block; // Mark this block as modified
                }
            });
        
            // Handle miss
            if (!hit) {
                this.misses++;
                let oldestBlock = this.cache.reduce((oldest, block) => {
                    return block.age > oldest.age ? block : oldest;
                }, this.cache[0]);
        
                oldestBlock.mmBlock = step.mmBlock;
                oldestBlock.age = 0;
                modifiedBlock = oldestBlock; // Mark this block as modified
        
                this.cache.forEach(block => {
                    if (block !== oldestBlock) {
                        block.age++;
                    }
                });
            }
        
            step.hit = hit; // Update hit/miss status
        
            // Update Memory Block Table
            const memoryBlockTable = document.getElementById('memory-block');
            Array.from(memoryBlockTable.rows).forEach(row => row.classList.remove('highlight'));
        
            let memoryRow = memoryBlockTable.rows[this.visualizedSteps];
            if (!memoryRow) {
                memoryRow = memoryBlockTable.insertRow();
            }
            memoryRow.innerHTML = '';
            memoryRow.insertCell(0).textContent = step.mmBlock;
            memoryRow.insertCell(1).textContent = step.hit ? 'Yes' : '';
            memoryRow.insertCell(2).textContent = step.hit ? '' : 'Yes';
        
            memoryRow.classList.add('highlight');
        
            // Update Cache Block Table
            const cacheBlockTable = document.getElementById('cache-tbody');
            cacheBlockTable.innerHTML = '';
        
            this.cache.forEach((block, index) => {
                let cacheRow = cacheBlockTable.insertRow();
                cacheRow.insertCell(0).textContent = block.cacheBlock;
                cacheRow.insertCell(1).textContent = block.age;
                cacheRow.insertCell(2).textContent = block.mmBlock !== null ? block.mmBlock : '';
            });
        
            // Highlight the modified block in the cache block table
            const cacheRows = cacheBlockTable.rows;
            Array.from(cacheRows).forEach(row => row.classList.remove('highlight'));
        
            if (modifiedBlock) {
                const modifiedRowIndex = this.cache.indexOf(modifiedBlock);
                if (cacheRows[modifiedRowIndex]) {
                    cacheRows[modifiedRowIndex].classList.add('highlight');
                }
            }
        
            this.visualizedSteps++;
        }
        
        const results = simulator.getResults();
        const resultsText = 
    `Cache Hits: ${results.hits}
    Cache Misses: ${results.misses}
    Miss Penalty: ${results.missPenalty} ns
    Average Memory Access Time: ${results.avgAccessTime.toFixed(2)} ns
    Total Memory Access Time: ${results.totalAccessTime} ns
    Cache Snapshot: \n     ${results.cacheSnapshot.join('\n     ')}`;
        
        document.getElementById('results').textContent = resultsText;
        document.getElementById('result-display').style.display = 'block';
    }
    
    
    getResults() {
        const totalAccesses = this.hits + this.misses;
        const totalCacheAccessTime = this.hits * this.cacheAccessTime;
        const totalMemoryAccessTime = this.misses * (this.cacheAccessTime + this.memoryAccessTime);
        const missPenalty = (2 * this.cacheAccessTime) + (this.blockSize * this.memoryAccessTime);
        const totalAccessTime = (this.hits * this.blockSize * this.cacheAccessTime) + (this.misses * (missPenalty + this.cacheAccessTime));
        const avgAccessTime = ((this.hits / totalAccesses) * this.cacheAccessTime) + ((this.misses / totalAccesses) * missPenalty);
        const cacheSnapshot = this.cache.map(block => {
            return `Cache Block: ${block.cacheBlock}, MM Block: ${block.mmBlock}`;
        });
    
        return {
            hits: this.hits,
            misses: this.misses,
            missPenalty: missPenalty,
            avgAccessTime: avgAccessTime,
            totalAccessTime: totalAccessTime,
            cacheSnapshot: cacheSnapshot
        };
    }
    
}

let simulator = new CacheSimulator(4, 1, 10, 2); // Default values

function addProgramFlow() {
    const inputElement = document.getElementById('program-flow-input');
    const mmBlock = parseInt(inputElement.value);
    if (mmBlock < 0 || mmBlock >= simulator.mmSize) {
        alert('Program flow block out of range.');
        return;
    }

    if (isNaN(mmBlock)) {
        alert('Please enter a valid number.');
        return;
    }

    simulator.addProgramFlow(mmBlock);
    document.getElementById('program-flow-display').textContent = simulator.programFlow.join(', ');
    inputElement.value = '';
}

function isPowerOfTwo(num) {
    return num > 0 && (num & (num - 1)) === 0;
}

function simulateCache() {
    const cacheSizeInput = parseInt(document.getElementById('cache-size').value);
    const cacheSizeUnit = document.getElementById('cache-size-unit').value;
    const mmSizeInput = parseInt(document.getElementById('mm-size').value);
    const mmSizeUnit = document.getElementById('mm-size-unit').value;
    const blockSize = parseInt(document.getElementById('block-size').value);
    const cacheAccessTime = parseInt(document.getElementById('cache-access-time').value);
    const memoryAccessTime = parseInt(document.getElementById('memory-access-time').value);

    let cacheSize = cacheSizeUnit === 'words' ? Math.ceil(cacheSizeInput / blockSize) : cacheSizeInput;
    let mmSize = mmSizeUnit === 'words' ? Math.ceil(mmSizeInput / blockSize) : mmSizeInput;

    if (!isPowerOfTwo(cacheSize)) {
        alert('Cache size must be a power of 2.');
        return;
    }

    if (!isPowerOfTwo(blockSize) || (blockSize > cacheSize && cacheSizeUnit === 'words')) {
        alert('Block size must be a power of 2 and less than or equal to cache size in words.');
        return;
    }

    const newProgramFlow = [...document.getElementById('program-flow-display').textContent.split(', ').map(Number)];

    if (newProgramFlow.length > mmSize) {
        alert('Number of program flow inputs exceeds the main memory size.');
        return;
    }

    if (simulator.programFlow.length === 0) {
        alert('Program flow has no inputs.');
        return;
    }

    if (!simulator.simulated) {
        simulator = new CacheSimulator(cacheSize, cacheAccessTime, memoryAccessTime, blockSize);
    }

    const newInputs = newProgramFlow.slice(simulator.programFlow.length);

    newInputs.forEach(mmBlock => simulator.addProgramFlow(mmBlock));
    simulator.simulate();
    document.getElementById('block-display').style.display = 'block';
}



function saveResults() {
    const resultsText = document.getElementById('results').textContent;
    const blob = new Blob([resultsText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cache_simulation_results.txt';
    link.click();
}

function nextStep() {
    if (!simulator || !simulator.simulated) {
        alert('Please run the simulation first.');
        return;
    }
    simulator.nextStep();
}

function resetSimulation() {
    simulator = new CacheSimulator(4, 1, 10, 2); // Reset with default values
    document.getElementById('program-flow-display').textContent = '';
    document.getElementById('cache-tbody').innerHTML = '';
    document.getElementById('memory-block').innerHTML = '';
    document.getElementById('result-display').style.display = 'none';
}
