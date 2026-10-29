export async function main(ns) {

    const target = "run4theh111z"; 
    
    let visited = new Set();
    let path = [];

    function dfs(current) {
        visited.add(current);
        path.push(current);

        if (current === target) {
            return true;
        }

        let neighbors = ns.scan(current);
        for (let nextServer of neighbors) {
            if (!visited.has(nextServer)) {
                if (dfs(nextServer)) return true;
            }
        }

        path.pop();
        return false;
    }

    if (dfs("home")) {
        ns.tprint("Path found: " + path.join(" -> "));
        
        let commandChain = path.map(server => `connect ${server}`).join("; ");
        ns.tprint("Copy-paste this to connect: \n" + commandChain);
    } else {
        ns.tprint(`Server '${target}' not found.`);
    }
}