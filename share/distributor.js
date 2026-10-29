//List of all the servers
function getAllServers(ns) {
    let serverList = [];
    let queue = ["home"];
    let visited = new Set(queue);

    while (queue.length > 0) {
        let current = queue.shift();
        serverList.push(current);
        let neighbors = ns.scan(current);
        for (let next of neighbors) {
            if (!visited.has(next)) {
                visited.add(next);
                queue.push(next);
            }
        }
    }
    return serverList;
}

export async function main(ns) {
    const shareScript = "./share-worker.js";
    const hackScript = "./basic-hack.js";
    
    const shareRam = ns.getScriptRam(shareScript, "home");
    const hackRam = ns.getScriptRam(hackScript, "home");
    
    const allServers = getAllServers(ns);

    for (let server of allServers) {
        if (!ns.hasRootAccess(server)) {
            ns.tprint(`Pominięto ${server}: brak Root Access (Nuke)`);
            continue;
        }

        let isPlayerServer = (server === "home" || server.startsWith("pserv") || ns.getServer(server).purchasedByPlayer);
        
        // Safety: If the server has 0 max money, skip it
        if (!isPlayerServer && ns.getServerMaxMoney(server) === 0) continue;

        let activeScript = isPlayerServer ? shareScript : hackScript;
        let scriptRam = isPlayerServer ? shareRam : hackRam;
        
        await ns.scp(activeScript, server);
        ns.killall(server);
        
        let maxRam = ns.getServerMaxRam(server);
        let usedRam = ns.getServerUsedRam(server);
        let availableRam = maxRam - usedRam;
        
        if (server === "home") {
          let buffer = maxRam * 0.2;
          availableRam -= buffer;
        }
        
        let threads = Math.floor(availableRam / scriptRam);
        if (threads > 0) {
            ns.exec(activeScript, server, threads);
            ns.tprint(`Launched on ${server} with ${threads} threads.`);
        }else {
            ns.tprint(`Skipped ${server}: not enough RAM`);
        }
    }
}