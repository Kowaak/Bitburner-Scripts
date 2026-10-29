/** @param {NS} ns */
export async function main(ns) {
  const scanned = new Set();
  const queue = ["home"];
  scanned.add("home");

  while (queue.length > 0) {
    const current = queue.shift();
    const neighbors = ns.scan(current);

    for (const server of neighbors) {
      if (!scanned.has(server)) {
        scanned.add(server);
        queue.push(server);

        // Pomijaj własne wykupione serwery
        if (server.startsWith("pserv")) continue;

        await nukeServer(ns, server);
      }
    }
  }
}

async function nukeServer(ns, target) {
  if (ns.hasRootAccess(target)) return;

  let portsNeeded = ns.getServerNumPortsRequired(target);
  let portsOpened = 0;

  if (ns.fileExists("BruteSSH.exe", "home")) {
    ns.brutessh(target);
    portsOpened++;
  }
  if (ns.fileExists("FTPCrack.exe", "home")) {
    ns.ftpcrack(target);
    portsOpened++;
  }
  if (ns.fileExists("relaySMTP.exe", "home")) {
    ns.relaysmtp(target);
    portsOpened++;
  }
  if (ns.fileExists("HTTPWorm.exe", "home")) {
    ns.httpworm(target);
    portsOpened++;
  }
  if (ns.fileExists("SQLInject.exe", "home")) {
    ns.sqlinject(target);
    portsOpened++;
  }

  if (portsOpened >= portsNeeded) {
    ns.nuke(target);
    ns.tprint(`[SUKCES] Uzyskano dostęp root do: ${target}`);
    // ns.installBackdoor()  potrzeba singularity????
  } else {
    ns.print(`[POMINIĘTO] Za mało programów dla ${target} (wymaga ${portsNeeded}, otwarto ${portsOpened})`);
  }
}