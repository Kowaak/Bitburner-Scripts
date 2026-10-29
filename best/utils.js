export function getAvailableMethods(ns) {
  const methods = []
  for (const [method, file] of [
    [ns.brutessh, 'BruteSSH.exe'],
    [ns.ftpcrack, 'FTPCrack.exe'],
    [ns.relaysmtp, 'relaySMTP.exe'],
    [ns.httpworm, 'HTTPWorm.exe'],
    [ns.sqlinject, 'SQLInject.exe']
  ]) {
    if (ns.fileExists(file)) {
      methods.push(method)
    }
  }
  return methods
}
export function acquireRootAccess(ns, target) {
  if (!ns.hasRootAccess(target)) {
    if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(target)) {
      ns.print(`ERROR: Za niski poziom ${target}`)
      return false
  }
    const methods = getAvailableMethods(ns);
    if (methods.length < ns.getServerNumPortsRequired(target)) {
      ns.print(`ERROR: Niewystarczajaca ilość metod włamania ${target}`)
      return false
    }
    for (const method of methods) {
      method(target)
    }
    ns.nuke(target)
  }
  return true
}
export function buildNetwork(ns, name = 'home', used = []) {
  used.push(name)
  const node = { name: name, children: [] }
  const serverList = ns.cloud.getServerNames()
  for (const child of ns.scan(node.name)) {
    if (ns.getServerRequiredHackingLevel(child) <= ns.getHackingLevel() &&
      !used.includes(child) && !serverList.includes(child)
    ) {
      node.children.push(buildNetwork(ns, child, used))
    }
  }
  return node
}
export function networkToServerList(node) {
  const list = [node.name]
  if (node.children.length) {
    for (const child of node.children) {
      list.push(...networkToServerList(child))
    }
  }
  return list
}
export function disableLogs(ns) {
  ns.disableLog("disableLog");
  ns.disableLog("getServerRequiredHackingLevel");
  ns.disableLog("getServerMoneyAvailable");
  ns.disableLog("scan");
  ns.disableLog("getHackingLevel");
  ns.disableLog("getHackingLevel")
  return true
}