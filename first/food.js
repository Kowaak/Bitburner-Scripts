export async function main(ns) {
  while(true) {
    while(ns.getServerSecurityLevel('foodnstuff')>3.5){
      await ns.weaken('foodnstuff');
    }
    while(ns.getServerMoneyAvailable('foodnstuff')<2000000){
      await ns.grow('foodnstuff');
      await ns.weaken('foodnstuff');
    }
		  await ns.hack('foodnstuff');
	}
}