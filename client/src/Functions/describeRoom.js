import { isEmpty } from "./utils";
import canSee from "./canSee";

// relay description of room and any present items, creatures, and exits
export default function describeRoom(currData, creaturesPresent) {
  // add room name and description to echo relay
  currData.relay.push(currData.state.room[currData.state.playerLocation].name);
  if (currData.state.modifiers.blind) {
    currData.relay.push("You're completely blind! You should hope you don't fall in a pit.");
  } else 
  if (canSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers)) {
    currData.relay.push(currData.state.room[currData.state.playerLocation].desc);
  } else {
    currData.relay.push("It is pitch-black in here. You are likely to be eaten by something gruesome.")
  }
  // add creatures present to relay
  if (!isEmpty(creaturesPresent)) {
    console.log("one or more creatures present");
    if (canSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers)) {
      for (let thisCreature in creaturesPresent) {
        if (creaturesPresent[thisCreature].location === currData.state.playerLocation) {
          // console.log("checking location of", creaturesPresent[thisCreature], "=", creaturesPresent[thisCreature].location);
          let str="There is a "+creaturesPresent[thisCreature].shortName+" "+creaturesPresent[thisCreature].doing;
          currData.relay.push(str);
        }
      }
    } else {
      currData.relay.push("You hear something moving around in the dark.");
    }
  }
  // add room inventory contents to relay
  if (currData.state.room[currData.state.playerLocation].inventory.filter(item => !item.feature).length && canSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers)) {
    let items = [];
    for (let i = 0; i < currData.state.room[currData.state.playerLocation].inventory.length; i++) {
      if (currData.state.room[currData.state.playerLocation].inventory[i].feature) {
        // skip item, because it's a feature
      } else {
        items.push("a "+currData.state.room[currData.state.playerLocation].inventory[i].shortName);
      }
    }
    currData.relay.push("You see "+[items.slice(0, -1).join(', '), items.slice(-1)[0]].join(items.length < 2 ? '' : ' and ')+" here.");
  }

  // add exits to relay
  if (canSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers)) {
    let exits =[];
    for (let door in currData.state.room[currData.state.playerLocation].exits) {
      let thisDoor = currData.state.room[currData.state.playerLocation].exits[door];
      if (thisDoor.to && !thisDoor.invisible) exits.push(door);
    }
    if (exits.length) {
      currData.relay.push("Exits: "+exits.join(", "));
    }
  }
  // console.log("outgoing data from describeRoom() =", currData);
  return currData;
};