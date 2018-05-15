import canPlayerSee from "./canSee";

// relay description of room and any present items, creatures, and exits

export default function describeRoom(currData, creaturesPresent) {
  
  const canSee = canPlayerSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers, currData.state.allCreatures);

  // add room name and description to echo relay
  currData.relay.push(currData.state.room[currData.state.playerLocation].name);
  if (currData.state.modifiers.blind) {
    currData.relay.push("You're completely blind! You should hope you don't fall in a pit.");
  } else 
  if (canSee) {
    currData.relay.push(currData.state.room[currData.state.playerLocation].desc);
  } else {
    currData.relay.push("It is pitch-black in here. You are likely to be eaten by something gruesome.")
  }
  // add creatures present to relay
  if (creaturesPresent.length) {
    console.log("one or more creatures present");
    if (canSee) {
      creaturesPresent.forEach(ele => {
        if (currData.state.allCreatures[ele].location === currData.state.playerLocation) {
          // console.log("checking location of", creaturesPresent[thisCreature], "=", creaturesPresent[thisCreature].location);
          let str="There is a "+currData.state.allCreatures[ele].shortName+" "+currData.state.allCreatures[ele].doing;
          currData.relay.push(str);
        }
      })
    } else {
      currData.relay.push("You hear something moving around in the dark.");
    }
  }
  // add room inventory contents to relay
  if (currData.state.room[currData.state.playerLocation].inventory.filter(item => (!item.feature || !item.hidden)).length && canSee) {
    let items = [];
    for (let i = 0; i < currData.state.room[currData.state.playerLocation].inventory.length; i++) {
      let thisItem = currData.state.room[currData.state.playerLocation].inventory[i];
      // skip item, because it's a feature or hidden
      if (thisItem.feature || thisItem.hidden) {
      } else {
        items.push("a "+currData.state.room[currData.state.playerLocation].inventory[i].shortName);
      }
    }
    currData.relay.push("You see "+[items.slice(0, -1).join(', '), items.slice(-1)[0]].join(items.length < 2 ? '' : ' and ')+" here.");
  }

  // add exits to relay
  if (canSee) {
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