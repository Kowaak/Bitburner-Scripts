/** @param {NS} ns */
export async function main(ns) {
  // Config and the window
  ns.disableLog("ALL");
  ns.ui.openTail(); 
  ns.ui.resizeTail(820, 450); 
  ns.ui.moveTail(950, 0); 

  const TARGET_NODES = 23;

  while (true) {
    let budget = ns.getServerMoneyAvailable("home");
    let numNodes = ns.hacknet.numNodes();
    
    // Drawing the table
    ns.clearLog();
    ns.print("=======================================================================");
    ns.print(` Liczba węzłów: ${numNodes} / ${TARGET_NODES}`);
    ns.print("-----------------------------------------------------------------------");
    ns.print(sprintf("| %-3s | %-5s | %-4s | %-5s | %-12s | %-10s |", "ID", "LEVEL", "RAM", "CORES", "PRODUKCJA/S", "LIFETIME"));
    ns.print("-----------------------------------------------------------------------");
    
    for (let i = 0; i < numNodes; i++) {
      let stats = ns.hacknet.getNodeStats(i);
      ns.print(sprintf(
        "| %-3d | %-5d | %-3dG | %-5d | %-12s | %-10s |",
        i, stats.level, stats.ram, stats.cores, ns.format.number(stats.production, 2), ns.format.number(stats.totalProduction, 2)
      ));
    }
    ns.print("=======================================================================");


    let bestOption = null;
    let lowestCost = Infinity;

    // Buying nodes up to the limit of 23
    if (numNodes < TARGET_NODES) {
      let purchaseCost = ns.hacknet.getPurchaseNodeCost();
      if (purchaseCost < budget) {
        bestOption = { type: "purchase", cost: purchaseCost };
      }
    } 
    //When you have 23 nodes look for the cheapest upgrade ...
    else {
      for (let i = 0; i < numNodes; i++) {
        let lvlCost = ns.hacknet.getLevelUpgradeCost(i, 1);
        if (lvlCost < budget && lvlCost < lowestCost) {
          bestOption = { type: "level", node: i, cost: lvlCost };
          lowestCost = lvlCost;
        }

        let ramCost = ns.hacknet.getRamUpgradeCost(i, 1);
        if (ramCost < budget && ramCost < lowestCost) {
          bestOption = { type: "ram", node: i, cost: ramCost };
          lowestCost = ramCost;
        }

        let coreCost = ns.hacknet.getCoreUpgradeCost(i, 1);
        if (coreCost < budget && coreCost < lowestCost) {
          bestOption = { type: "core", node: i, cost: coreCost };
          lowestCost = coreCost;
        }
      }
    }

    // .. and buy it
    if (bestOption) {
      if (bestOption.type === "purchase") {
        ns.hacknet.purchaseNode();
      } else if (bestOption.type === "level") {
        ns.hacknet.upgradeLevel(bestOption.node, 1);
      } else if (bestOption.type === "ram") {
        ns.hacknet.upgradeRam(bestOption.node, 1);
      } else if (bestOption.type === "core") {
        ns.hacknet.upgradeCore(bestOption.node, 1);
      }
      
      // antilag
      await ns.sleep(100);
    } else {
      // if you cant buy, wait for a second
      await ns.sleep(1000);
    }
  }
}