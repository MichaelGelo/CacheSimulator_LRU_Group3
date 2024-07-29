Magdadagdag pa ako ng info after ng final iteration ng project.
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
5. You now have access to the web-based Cache Simulator!

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

## 
