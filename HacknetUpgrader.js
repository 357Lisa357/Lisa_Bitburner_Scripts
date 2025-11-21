/** @param {NS} ns */
export async function main(ns) {
  //% of money to spend
  let moneyToSpend = 0.2;

  while (true) {
    //if (ns.getServerMoneyAvailable("home") > (ns.getHackingLevel() * 1000000)) {
      let availbelMoney = ns.getServerMoneyAvailable("home") * moneyToSpend;

      if (availbelMoney > ns.hacknet.getPurchaseNodeCost()) {
        ns.print("bought sever");
        ns.hacknet.purchaseNode();
      }

      for (let i = 0; i < ns.hacknet.numNodes(); i++) {
        let availbelMoney = ns.getServerMoneyAvailable("home") * moneyToSpend;
        if (availbelMoney > ns.hacknet.getRamUpgradeCost(i)) {
          ns.print("upgrade ram");
          ns.hacknet.upgradeRam(i);
        } else if (availbelMoney > ns.hacknet.getLevelUpgradeCost(i, 10)) {
          ns.print("upgrade lvl");
          ns.hacknet.upgradeLevel(i, 10);
        } else if (availbelMoney > ns.hacknet.getCoreUpgradeCost(i)) {
          ns.print("upgrade core");
          ns.hacknet.upgradeCore(i);
        }
      }
    //}
    await ns.sleep(10000);
  }
}
