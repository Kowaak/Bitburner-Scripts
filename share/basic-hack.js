/** @param {NS} ns */
export async function main(ns) {


    //Two options
    //Hack a single predetermined server
    const target = "";
    //or hack the server the script is hosted on
    //const target = ns.getHostname(); 
    
    // Safety dont hack home
    if (target === "home" || target.startsWith("pserv")) {
        return;
    }

    while(true) {
        if (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target) + 5) {
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target) * 0.75) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}