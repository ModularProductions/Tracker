import { creaturesHere } from "./utils";
import describeRoom from "./describeRoom";
import searchItem from "./searchItem";

// Examine/Look action command
export default function examine(words, currData) {
  let creaturesPresent = creaturesHere(currData.state.allCreatures, currData.state.playerLocation);

  if (words.length === 1 || words[1] === "room" || words[1] === "around") {
    describeRoom(currData, creaturesPresent);
    return currData;
  } else 
  // check if searching something
  if (words[1] === "in" || words[1] === "inside" || words[1] === "around") {
    currData = searchItem(words, currData);
    return currData;
  }
  // check if player is a narcissist
  if (words[1] === "me" || words[1] === "myself" || words[1] === "player") {
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
  for (let i = 0; i < creaturesPresent.length; i++) {
    console.log("creature =", creaturesPresent[i]);
    if (currData.state.allCreatures[creaturesPresent[i]].keywords.includes(words[1])) {
      currData.relay.push(currData.state.allCreatures[creaturesPresent[i]].lookDesc);
      return currData;
    } else {
      // check present creature features (in creature inventory) if object not yet found
      for (let j = 0; j < currData.state.allCreatures[creaturesPresent[i]].inventory.length; j++) {
        if (currData.state.allCreatures[creaturesPresent[i]].inventory[j].keywords.includes(words[1])) {
          currData.relay.push(currData.state.allCreatures[creaturesPresent[i]].inventory[j].lookDesc);
          console.log("Found '"+words[1]+"' in creatureInv in examine(word). outgoing data =", currData);
          return currData;
        }
      }
    }
  }
  currData.relay.push("You don't see that here.");
  console.log("Tried to examine something and didn't find it, in examine(word). outgoing data =", currData);
  return currData;
};