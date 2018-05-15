import describeRoom from "./describeRoom";
import { creaturesHere } from "./utils";

export default function loadGame(prevState, props) {
  let room = require ("../Objects/RoomBuilder");
  let Items = require("../Objects/ItemBuilder");
  let allCreatures = require("../Objects/CreatureBuilder");
  
  // create player inventory
  let playerInventory = [];

  // distribute items amongst player, rooms, and creatures
  for (let property in Items) {
    for (let i = 0; i < Items[property].startingLoc.length; i++) {
      if (Items[property].startingLoc[i] === "playerInventory") {
        playerInventory.push(Items[property]);
      } else {
        if (room[Items[property].startingLoc[i]]) {
          room[Items[property].startingLoc[i]].inventory.push(Items[property]);
        } else {
          if (allCreatures[Items[property].startingLoc[i]]) {
            allCreatures[Items[property].startingLoc[i]].inventory.push(Items[property]);
          }
        }
      } 
    }
  };

  // place player's starting room position
  let playerLocation = "two";

  // create initial relay
  let relay = [];
  relay.push("Welcome to the game.");
  
  let thisState = { 
    ...prevState,
    playerLocation: playerLocation,
    playerInventory: playerInventory,
    room: room, 
    allCreatures: allCreatures,
    relay: relay,
    health: 100,
    attack: 0,
    defense: 3,
    moveCount: 0,
    wielded: undefined,
    head: undefined,
    body: undefined,
    arms: undefined,
    legs: undefined,
    modifiers: {
      blind: false
    },
    options: {
      verbose: true,
    }
  };
  // console.log(thisState);
  let initialData = { relay: relay, state: thisState, takesTime: false };
  let firstRoom = describeRoom(initialData, creaturesHere(thisState.allCreatures, thisState.playerLocation));
  relay.concat(firstRoom.relay);
  return thisState;
};