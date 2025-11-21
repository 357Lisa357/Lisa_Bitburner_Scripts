/** @param {NS} ns */
export async function main(ns) {
  await ns.sleep(Math.random()*120000);
  
  let target = "n00dles";
  let target2 = "n00dles";
  //let target2 = "foodnstuff";
  //let target2 = "foodnstuff";

  while (true) {
    
    //target 1
    if (ns.getServerSecurityLevel(target) > (ns.getServerMinSecurityLevel(target) + 5)) {
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < (ns.getServerMaxMoney(target) * 0.75)) {
      await ns.grow(target);
    } else if (ns.getHackingLevel(target) >= ns.getServerRequiredHackingLevel(target)) {
      await ns.hack(target);
    }
    ns.print("---");

    //target 2
    if (ns.getServerSecurityLevel(target2) > (ns.getServerMinSecurityLevel(target2) + 5)) {
      await ns.weaken(target2);
    } else if (ns.getServerMoneyAvailable(target2) < (ns.getServerMaxMoney(target2) * 0.75)) {
      await ns.grow(target2);
    } else if (ns.getHackingLevel(target2) >= ns.getServerRequiredHackingLevel(target2)) {
      await ns.hack(target2);
    }
    ns.print("---");
    
  }
}
