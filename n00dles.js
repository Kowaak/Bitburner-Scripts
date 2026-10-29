export async function main(ns) {
  while(true) {
    while(ns.getServerSecurityLevel('n00dles')>3.5){
      await ns.weaken('n00dles');
    }
    while(ns.getServerMoneyAvailable('n00dles')<1700000){
      await ns.grow('n00dles');
      await ns.weaken('n00dles');
    }
		  await ns.hack('n00dles');
	}
}