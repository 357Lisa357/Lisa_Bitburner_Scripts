/** @param {NS} ns */
export async function main(ns) {
  let ram = 16;

  let cost = ns.print(ns.getPurchasedServerCost(ram));

  //buys 20 servers
  for (let i = 0; i < 25; i++) {
    ns.purchaseServer(i, ram);
  }

  while (true) {
    //upgrades servers
    let servers = ns.getPurchasedServers();

    for (let i = 0; i < servers.length; i++) {
      ns.upgradePurchasedServer(servers[i], ram);
    }

    //ram goal upgrader
    let counter = 0
    for (let i = 0; i < servers.length; i++) {
      if (ns.getServerMaxRam(servers[i]) >= ram) {
        counter++;
      }
    }
    
    if (counter >= 25) {
      ram = ram * 2;
      ns.print("upgraded ram to: " + String(ram));
    }
    ns.print("counter:" + String(counter));
    ns.print("upgrade cost: " + String(ns.getPurchasedServerUpgradeCost(servers[1], ram)));
    await ns.sleep(10*1000);
  }
}
