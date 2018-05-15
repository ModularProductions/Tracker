import { mergeObjects, creaturesHere } from "./utils";
import describeRoom from "./describeRoom";
import canPlayerSee from "./canSee";

// Determines if a move direction works out
export default function move(who, direction, startingLocation, doorway, currData) {

  // helpers
  let creaturesPresent = creaturesHere(currData.state.allCreatures, currData.state.playerLocation);  
  const canSee = canPlayerSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers, currData.state.allCreatures);

  currData.pass = false;
  // check if doorway blocked (only player will be run into this check)
  if (doorway.blocked) {
    currData.relay.push(doorway.blocked);
  } else 
  // check if blocking Minotaur
  if (who === "minotaur" & doorway.minBlocked) {
    currData.relay.push("The Minotaur can't quite fit through the passage, and roars in frustration.");
    console.log("Minotaur can't pass through doorway to "+doorway+".");
  } else {
    // the entity can successfully pass
    currData.pass = true;
    if (who === "player") { 
      // handle successful player move
      // check for flavor text
      if (doorway.flavor) { currData.relay.push(doorway.flavor); }
      // console.log("move(player) - mergeObjects() with ", currData.state);
      currData.state = mergeObjects(currData.state, { 
        playerLocation: doorway.to
      });
      describeRoom(currData, creaturesPresent)
      // console.log("move(player) - mergeObjects() returns", currData);
    } else {
      // handle successful creature move
      // set up relay for when creature enters/exits player's location
      if (doorway.to === currData.state.playerLocation) {
        // set up relay for blind player
        if (who === "minotaur") {
          if (canSee) {
            currData.relay.push("The Minotaur charges into the room!");
          } else {
            currData.relay.push("You feel a malevolent presence enter the room.");
          }
        } else {
            if (canSee) {
              currData.relay.push("A "+who+" enters the room.");
            } else {
              currData.relay.push("You feel a presence enter the room. You hope it's gentle.");
            }
        }
      }
      if (startingLocation === currData.state.playerLocation) {
        if (who === "minotaur") {
          currData.relay.push("The Minotaur flees "+direction+"!");
        } else {
          currData.relay.push("The "+who+" leaves "+direction+".");
        }
      }
      // console.log("move(creature) - mergeObjects() with ", currData.state);
      console.log(who, "moving from", startingLocation, "to", doorway.to);
      currData.state = mergeObjects(currData.state, {
        allCreatures: {
          [who]: {
            location: doorway.to
          }
        }
      });
      // console.log("move(creature) - mergeObjects() returns", currData.state)
    }
  }
  // console.log("outgoing data from move() =", currData);
  return currData;
};