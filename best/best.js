import { buildNetwork, networkToServerList, disableLogs } from './utils.js'

//redundant

export async function main(ns) {
  disableLogs(ns);

  //Utworzenie listy ze znukowanych serwerów 
  const network = buildNetwork(ns)
  const networkList = networkToServerList(network)
  const nuked = networkList.filter((server) => ns.hasRootAccess(server))

  //Ustalenie hosta z najwyższym poziomem
  let maxlvl = 1
  let curlvl = 1
  let hostname = "n00dles"
  for (const host of nuked) {
    curlvl = ns.getServerRequiredHackingLevel(host)
    if (curlvl > maxlvl && host != "I.I.I.I" && host != "CSEC" && host != "avmnite-02h") {
      maxlvl = curlvl
      hostname = host
    }
  }
  //Hakowanie
  while (true) {
    await ns.grow(hostname);
    await ns.weaken(hostname);
    await ns.hack(hostname);
  }
}