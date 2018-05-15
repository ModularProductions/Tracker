import canPlayerSee from "./canSee";
import { creaturesHere } from "./utils";

export default function searchItem(words, currData) {

  // helpers
  const creaturesPresent = creaturesHere(currData.state.allCreatures, currData.state.playerLocation);
  const canSee = canPlayerSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers, currData.state.allCreatures);

  // check vision
  if (canSee) {
    let found = false;
    // look for item in room inventory
    for (let i = 0; i < currData.state.room[currData.state.playerLocation].inventory.length; i++) {
      if (currData.state.room[currData.state.playerLocation].inventory[i].keywords.includes(words[1])) {
        found = true;
        // matching item found, check if searchable
        currData.takesTime = true;
        if (currData.state.room[currData.state.playerLocation].inventory[i].searchParams) {
          // check if item has already been searched
          if (!currData.state.room[currData.state.playerLocation].inventory[i].searchParams.alreadySearched) {
            console.log("ping", currData.state.room[currData.state.playerLocation].inventory[i].searchParams);
            // relay successful search message
            currData.relay.push(currData.state.room[currData.state.playerLocation].inventory[i].searchParams.searchText);
            // find prize item and set its hidden prop to false
            currData.state.room[currData.state.playerLocation].inventory.forEach((item, j) => {
              if (item.keywords.includes(currData.state.room[currData.state.playerLocation].inventory[i].searchParams.prize)) {
                currData.state.room[currData.state.playerLocation].inventory[j].hidden = false;
              }
            })
            // toggle item's alreadySearched to true
            currData.state.room[currData.state.playerLocation].inventory[i].searchParams.alreadySearched = true;
          } else {
            currData.relay.push(currData.state.room[currData.state.playerLocation].inventory[i].searchParams.alreadySearchedText);
          }
        } else {
          // item not searchable
          currData.relay.push("You look it over very carefully, but find nothing interesting.");
        }
      }
    }
    // item not found in room, checking creatures
    if (!found) {
      creaturesPresent.forEach(thisCreature => {
        if (currData.state.allCreatures[thisCreature].keywords.includes(words[1])) {
          currData.takesTime = true;
          // player is trying to search creature, check if it's dead
          found = true;
          if (currData.state.allCreatures[thisCreature].health <= 0) {
            currData.relay.push("Well, the ", currData.state.allCreatures[thisCreature].shortName, "isn't in any position to object anymore, so it's cool, right?");
            // it's dead, reveal hidden inventory items
            let items = [];
            currData.state.allCreatures[thisCreature].inventory.forEach((item, i) => {
              if (item.hidden) {
                items.push(item.shortName);
                currData.state.allCreatures[thisCreature].inventory[i].hidden = false;
              }
            })
            if (items.length) {
              currData.relay.push("You discover a "+[items.slice(0, -1).join(', a'), items.slice(-1)[0]].join(items.length < 2 ? '' : ' and a')+" on the body of the "+currData.state.allCreatures[thisCreature].shortName+".");
            } else currData.relay.push("Unfortunately, your ghoulish actions uncover nothing new.");
          } else {
            // creature is not dead
            currData.relay.push("The", currData.state.allCreatures[thisCreature].shortName, "looks like they need a warrant to search.")
          }
        }
      })
    }
    if (!found) {
      // couldn't find item to search
      currData.relay.push("You don't see that here.");
    }
  } else {
    currData.relay.push("You can't see well enough to do that!");
  }
  return currData;
};