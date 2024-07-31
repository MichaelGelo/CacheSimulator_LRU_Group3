# Cache Simulator (LRU / Full Associativity)
Authors: 
- **Agustines**, Alfred Bastin
- **Alamay**, Carl Justine
- **De Leon**, Alan David 
- **Depasucat**, Michael Angelo

This project provides a simple web-based cache simulator focusing on the implementation of Full Associative Cache with LRU, or Least Recently Used, replacement policy. The simulator is created to provide an interactive way to understand how cache operations work, and how hits and misses are affected by different input parameters.

In a **Full Associative Cache**, any block of memory can be placed in any cache line, reducing cache misses. However, this flexibility requires a replacement policy when the cache is full. The **Least Recently Used (LRU)** policy ensures that the least recently used block is evicted when the cache is full, keeping frequently accessed data in the cache.

## How to Run
**NOTE:** In order for the code to properly execute without any errors and complications, make sure that the lastest version of Node.js is installed and properly integrated into your system. The installer can be found here: https://nodejs.org

To properly run and initiate the web-based cache simulator, simply follow the steps below:

1. Open your coding terminal.
2. Run the command: *node app.js* into your terminal input to start the web-based application.
3. Once the command has succesfully executed, open your web browser of choice.
4. Type into the address bar: *localhost:3000*
5. You now have access to the web-based Cache Simulator! and you can freely play around with the *Input Parameters* to see how they appear in cache memory.

If you've followed every step and the application is still not running, then you may have to take an alternative route in installing Node.js. For this, simply follow the installation guide of **Node Version Manager**, or nvm, which can be accessed here: https://github.com/nvm-sh/nvm

## Input Parameters
- Block Size
- MM Memory Size
- Cache Memory Size
- Program Flow

## Output Data
- Number of Cache Hits
- Number of Cache Misses
- Miss Penalty
- Average Memory Access Time
- Total Memory Access Time
- Snapshot of the Cache Memory

## Web-based Simulator
- https://cachesimulator-lru-group3.onrender.com
## Documentation
- https://drive.google.com/file/d/1X_2qIAPS_V7CcTZ0_tpESesAnmq6zYkd/view?usp=sharing
## Video Demonstration
- https://drive.google.com/file/d/1VzuuDGxRW0OAKdetO8CPUOQfxG-eJGZf/view?usp=sharing
## User Interface
![App Screenshot](https://github.com/MichaelGelo/CacheSimulator_LRU_Group3/blob/main/Test%20Case.png)

The web-based cache simulation can seen being utilized in the screenshot above. The program flow of 1, 2, 2, 5, 4, 7, 8, 8 is ran through the program, and it outputs all the necessary data as stated in the aforementioned *Output Data*.
