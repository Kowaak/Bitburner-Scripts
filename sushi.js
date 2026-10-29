export async function main(ns) {
  while(true) {
    while(ns.getServerSecurityLevel('harakiri-sushi')>1){
      await ns.weaken('harakiri-sushi');
    }
    while(ns.getServerMoneyAvailable('harakiri-sushi')<2000000){
      await ns.grow('harakiri-sushi');
      await ns.weaken('harakiri-sushi');
    }
		  await ns.hack('harakiri-sushi');
	}
}