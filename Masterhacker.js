export async function main(ns) {
  //Function that shows important stats of inputed server
  let script = "BasicHacker.js";
  //let script = "FactionRam.js";

  function ServerInfo(targetServer) {
    ns.print("\n");
    ns.print("--- Server Info ---");

    ns.print("Name: " + String(targetServer.hostname) + "\n");
    ns.print("hacking required: " + String(targetServer.requiredHackingSkill) + "\n");
    ns.print("Availble money: " + String(targetServer.moneyAvailable) + "\n");
    ns.print("Max money: " + String(targetServer.moneyMax) + "\n");
    ns.print("Current sec lvl: " + String(targetServer.hackDifficulty) + "\n");
    ns.print("Min sec lvl: " + String(targetServer.minDifficulty) + "\n");

    ns.print("--- End Server Info ---");
    ns.print("\n");
  }

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


  //port & Nukes all servers that are possible
  for (let i = 0; i < targets.length; i++) {
    let server = ns.getServer(targets[i]);

    if (ns.fileExists("BruteSSH.exe", "home")) {
      ns.brutessh(targets[i]);
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
      ns.ftpcrack(targets[i]);
    }
    if (ns.fileExists("relaySMTP.exe", "home")) {
      ns.relaysmtp(targets[i]);
    }
    if (ns.fileExists("HTTPWorm.exe", "home")) {
      ns.httpworm(targets[i]);
    }
    if (ns.fileExists("SQLInject.exe", "home")) {
      ns.sqlinject(targets[i]);
    }

    if (server.openPortCount >= server.numOpenPortsRequired) {
      ns.nuke(targets[i]);
    }
  }

  // moves & run this file onto all servers on list
  for (let i = 0; i < targets.length; i++) {

    let targetRam = ns.getServerMaxRam(targets[i]) - ns.getServerUsedRam(targets[i]);
    let scriptRam = ns.getScriptRam(script);
    let numberScripts = Math.floor(targetRam / scriptRam);

    ns.scp(script, targets[i], "home");

    if (numberScripts > 0) {
      let execute = ns.exec(script, targets[i], numberScripts);
      if (execute != 0) {
        ns.tprint("installed and ran code on: " + String(targets[i]));
      }
    }
  }

  //puts file on home as well
  let targetRam = ns.getServerMaxRam("home");
  let scriptRam = ns.getScriptRam(script);
  let numberScripts = Math.floor(targetRam / scriptRam);

  if (numberScripts > 0) {
    let execute = ns.exec(script, "home", numberScripts-10);
    if (execute != 0) {
      ns.tprint("installed and ran code on: " + "home");
    }
  }


  //while (true){await ns.hack("n00dles");}

  /*
    while (true) {
      for (let i = 0; i < targets.length; i++) {
  
  
        let mylvl = ns.getHackingLevel();
        let server = ns.getServer(targets[i]);
        ServerInfo(server);
  
        //hacking
  
        if ((mylvl >= server.requiredHackingSkill) && (server.hasAdminRights) && (targets[i] != "home")) {
          //weaken if needed
          if (server.hackDifficulty > (server.minDifficulty + 1)) {
            await ns.weaken(targets[i]);
          }
          //grow if needed
          if (server.moneyAvailable < (server.moneyMax * 0.75)) {
            await ns.grow(targets[i]);
          }
          //hack
          await ns.hack(targets[i]);
        } else {
          ns.print("no acces too " + String(targets[i]) + "\n");
        }
  
      }
    }
    */
}

