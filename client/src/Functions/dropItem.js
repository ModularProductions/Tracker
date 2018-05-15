import { mergeObjects } from "./utils";

export default function dropItem(words, currData) {
  if (currData.state.playerInventory.length) {
    if (words[1] === "all" || words[1] === "everything") {
      currData.state.room[currData.state.playerLocation].inventory = currData.state.room[currData.state.playerLocation].inventory.concat(currData.state.playerInventory);
      currData.relay.push("You drop everything you're carrying.");
      currData.takesTime = true;
      currData.state = mergeObjects(currData.state, {
        playerInventory: [],
        room: { 
          [currData.state.playerLocation]: {
            inventory: currData.state.room[currData.state.playerLocation].inventory
          }
        }
      });
      return currData;
    } else {
      for (let i = 0; i < currData.state.playerInventory.length; i++) {
        if (currData.state.playerInventory[i].keywords.includes(words[1])) {
          let found = currData.state.playerInventory[i].shortName;
          let item = currData.state.playerInventory.splice(i, 1);
          currData.state.room[currData.state.playerLocation].inventory.push(item[0]);
          currData.relay.push("You drop the "+found+".");
          currData.takesTime = true;
          currData.state = mergeObjects(currData.state, {
            playerInventory: currData.state.playerInventory,
            room: { 
              [currData.state.playerLocation]: {
                inventory: currData.state.room[currData.state.playerLocation].inventory
              }
            }
          });
          console.log("dropItem(single) - mergeObjects() returns", currData.state)
          return currData;
        }
      };
    }
    currData.relay.push("You don't have that.");
    console.log("Couldn't drop '"+words[1]+"' in dropItem(single). outgoing data =", currData);
    return currData;
  } else {
    currData.relay.push("You aren't carrying anything!");
    console.log("Tried to drop from empty inv in dropItem(). outgoing data =", currData);
    return currData;
  }
};