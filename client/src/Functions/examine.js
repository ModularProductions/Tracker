import { creaturesHere } from "./utils";
import describeRoom from "./describeRoom";

// Examine/Look action command
export default function examine(words, currData) {
  let creaturesPresent = creaturesHere(currData.state.allCreatures, currData.state.playerLocation);
  if (words.length === 1 || words[1] === "room" || words[1] === "around") {
    describeRoom(currData, creaturesPresent);
    return currData;
  } else 
  // check if player is a narcissist
  if (words[1] === "me" || words[1] === "myself") {
    // if (isMobile) this.viewCharacterToggle()} 
    currData.relay.push("You fine specimen, you.");
    console.log("Looking at self in dropItem(word). outgoing data =", currData);
    return currData;
  }
  // check player inventory if object not yet found
  for (let i = 0; i < currData.state.playerInventory.length; i++) {
    if (currData.state.playerInventory[i].keywords.includes(words[1])) {
      currData.relay.push(currData.state.playerInventory[i].lookDesc);
      console.log("Found '"+words[1]+"' in playerInv in examine(word). outgoing data =", currData);
      return currData;
    }
  }
  // check room inventory if object not yet found
  for (let i = 0; i < currData.state.room[currData.state.playerLocation].inventory.length; i++) {
    if (currData.state.room[currData.state.playerLocation].inventory[i].keywords.includes(words[1])) {
      currData.relay.push(currData.state.room[currData.state.playerLocation].inventory[i].lookDesc);
      console.log("Found '"+words[1]+"' in roomInv in examine(word). outgoing data =", currData);
      return currData;
    }
  }
  // check present creatures if object not yet found
  for (let thisCreature in creaturesPresent) {
    if (creaturesPresent[thisCreature].keywords.includes(words[1])) {
      currData.relay.push(creaturesPresent[thisCreature].lookDesc);
      console.log("Found '"+words[1]+"' in creature array in examine(word). outgoing data =", currData);
    } else {
      // check present creature features (in creature inventory) if object not yet found
      for (let j = 0; j < creaturesPresent[thisCreature].inventory.length; j++) {
        if (creaturesPresent[thisCreature].inventory[j].keywords.includes(words[1])) {
          currData.relay.push(creaturesPresent[thisCreature].inventory[j].lookDesc);
          console.log("Found '"+words[1]+"' in creatureInv in examine(word). outgoing data =", currData);
          return currData;
        }
      }
    }
    return currData;
  }
  currData.relay.push("You don't see that here.");
  console.log("Tried to examine something and didn't find it, in examine(word). outgoing data =", currData);
  return currData;
};