import { creaturesHere, mergeObjects } from "./utils";

// * take item
export default function takeItem (words, currData) {

  // helpers
  let creaturesPresent = creaturesHere(currData.state.allCreatures, currData.state.playerLocation);

  // "take" subject is not stated, picking up first item in room inventory
  if (words.length === 1) {
    if (currData.state.room[currData.state.playerLocation].inventory.filter(item => (!item.feature || !item.hidden)).length) {
      let item = currData.state.room[currData.state.playerLocation].inventory.splice(0, 1);
      currData.state.playerInventory = currData.state.playerInventory.concat(item);
      currData.relay.push("You pick up the "+item[0].shortName+".");
      currData.takesTime = true;
      currData.state = mergeObjects(currData.state, {
        playerInventory: currData.state.playerInventory,
        room: {
          [currData.state.playerLocation]: { 
            inventory: currData.state.room[currData.state.playerLocation].inventory,
          }
        }
      });
      return currData;
    } else {
      currData.relay.push("You don't see anything you can take.");
      return currData;
    } 
  } else 
  if (words[1] === "all" || words[1] === "everything") {
    // "take" subject is all items in room
    if (currData.state.room[currData.state.playerLocation].inventory.filter(item => (!item.feature || !item.hidden)).length) {
      let roomItems = currData.state.room[currData.state.playerLocation].inventory.filter(item => !item.feature);
      currData.state.playerInventory = currData.state.playerInventory.concat(roomItems);
      currData.relay.push("You pick up everything you see.");
      currData.takesTime = true;
      currData.state = mergeObjects(currData.state, {
        playerInventory: currData.state.playerInventory,
        room: { 
          [currData.state.playerLocation]: {
            inventory: currData.state.room[currData.state.playerLocation].inventory.filter(item => item.feature)
          }
        }
      });
      return currData;
    } else {
      currData.relay.push("You don't see anything you can take.");
      return currData;
    } 
  } else {
    // "take" subject is not "all", looking in room for item
    for (let i = 0; i < currData.state.room[currData.state.playerLocation].inventory.length; i++) {
      if (currData.state.room[currData.state.playerLocation].inventory[i].keywords.includes(words[1]) && !currData.state.room[currData.state.playerLocation].inventory[i].hidden) {
        // item found in room
        // check if item is room feature (and not takeable)
        if (currData.state.room[currData.state.playerLocation].inventory[i].feature) {
          currData.relay.push("You can't take that.");
          console.log("takeItem(single) couldn't take that. outgoing data =", currData);
          return currData;
        }
        let found = currData.state.room[currData.state.playerLocation].inventory[i].shortName;
        let item = currData.state.room[currData.state.playerLocation].inventory.splice(i, 1);
        currData.state.playerInventory = currData.state.playerInventory.concat(item);
        console.log("TAKE player inv =", currData.state.playerInventory);
        currData.relay.push("You pick up the "+found+".");
        currData.takesTime = true;
        console.log("takeItem(single) - mergeObjects() with ", currData.state);
        currData.state = mergeObjects(currData.state, {
          playerInventory: currData.state.playerInventory,
          room: {
            [currData.state.playerLocation]: { 
              inventory: currData.state.room[currData.state.playerLocation].inventory,
            }
          }
        });
        // console.log("takeItem(single) - mergeObjects() returns", currData.state)
        // console.log("Item picked up in takeItem(single). outgoing data =", currData);
        return currData;
      };
    }
  }
  // "take" subject is not in room, checking player inventory
  for (let i = 0; i < currData.state.playerInventory.length; i++) {
    if (currData.state.playerInventory[i].keywords.includes(words[1])) {
      currData.relay.push("You already have that!");
      console.log("Item already in inventory in takeItem(single). outgoing data =", currData);
      return currData;
    }
  }
  // "take" subject is not in room or player inv, checking creatures and their inventories
  for (let i = 0; i < creaturesPresent.length; i++) {
    if (currData.state.allCreatures[creaturesPresent[i]].keywords.includes(words[1])) {
      currData.relay.push("I don't think they would like that.");
      console.log("Tried to take a creature in takeItem(single). outgoing data =", currData);
      return currData;
    } else {
      for (let j = 0; j < currData.state.allCreatures[creaturesPresent[i]].inventory.length; j++) {
        if (currData.state.allCreatures[creaturesPresent[i]].inventory[j].keywords.includes(words[1])) {
          currData.relay.push("The "+currData.state.allCreatures[creaturesPresent[i]].shortName+" won't let you.")
          return currData;
        }
      }
    }
  }
  // creaturesPresent.forEach(ele => {
  //   if (currData.state.allCreatures[ele].location === currData.state.playerLocation) {
  //     if (currData.state.allCreatures[ele].keywords.includes(words[1])) {
  //       currData.relay.push("I don't think they would like that.");
  //       console.log("Tried to take a creature in takeItem(single). outgoing data =", currData);
  //       return currData;
  //     }
  //   }
  // })
  // can't find "take" subject
  console.log("Looked for "+words[1]+" and failed.");
  currData.relay.push("You don't see that here.");
  console.log("Failed to find item in takeItem(single). outgoing data =", currData);
  return currData;
};