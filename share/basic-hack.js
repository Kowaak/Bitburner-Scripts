/** @param {NS} ns */
export async function main(ns) {


    //dwie opcje, albo hakować sam siebie albo jakiś jeden określony server
    
    const target = "";
    //const target = ns.getHostname(); 
    
    // Zabezpieczenie: nie hakuj mnie
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