/** @param {NS} ns */
export async function main(ns) {
  //get names of servers
  let targets = ns.scan("home");

  for (let i = 0; i < targets.length; i++) {
    let secondScan = ns.scan(targets[i]);

    //compare
    for (let i = 0; i < secondScan.length; i++) {
      if ((!targets.includes(secondScan[i])) && (secondScan[i] != "home")) {
        targets.push(secondScan[i]);
      }
    }
  }

  //get the text files (.lit)
  for (let i = 0; i < targets.length; i++) {
    let files = ns.ls(targets[i]);

    for (let f = 0; f < targets.length; f++) {
      if (files[f] != undefined) {
        if (files[f].includes(".lit")) {
          ns.tprint(files[f]);
          ns.scp(files[f], "home", targets[i]);
        }
      }
    }
  }
}
