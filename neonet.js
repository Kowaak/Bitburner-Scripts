export async function main(ns) {
  while(true) {
    while(ns.getServerSecurityLevel('neo-net')>9){
      await ns.weaken('neo-net');
    }
    while(ns.getServerMoneyAvailable('neo-net')<2000000){
      await ns.grow('neo-net');
      await ns.weaken('neo-net');
    }
		  await ns.hack('neo-net');
	}
}