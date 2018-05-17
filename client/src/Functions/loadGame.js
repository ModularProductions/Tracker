import describeRoom from "./describeRoom";
import { creaturesHere } from "./utils";

export default function loadGame(prevState, props) {
  let room = require("../Objects/RoomBuilder");
  let Items = require("../Objects/ItemBuilder");
  let allCreatures = require("../Objects/CreatureBuilder");
  // place player's starting room position
  let playerLocation = "two";
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
  let relay = [];
  
  // create initial relay
  const openingText = () => {
    relay.push("");
    relay.push("");
    relay.push("");
    relay.push("Welcome to Labyrinth");
    relay.push("");
    relay.push("Theseus was on his way to enter the Labyrinth and slay the Minotaur, but he was detained at a border crossing and now awaits his lawyer. Meanwhile, some confusion with a shared Uber ride has landed you at the gates of the maze, and the unlikely promise of a mobile charging station tempts you inside.")
    relay.push("")
    relay.push("This is a working model of a contemporary adaptation of the classic Interactive Fiction game style. Click the 'about' button for more information.")
    relay.push("")
    relay.push("")
    relay.push("")
    relay.push("")
  }
  openingText();

  
  let thisState = { 
    ...prevState,
    game: {
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
    }
  };
  // console.log(thisState);
  let initialData = { relay: relay, state: thisState.game, takesTime: false };
  let firstRoom = describeRoom(initialData, creaturesHere(thisState.game.allCreatures, thisState.game.playerLocation));
  relay.concat(firstRoom.relay);
  console.log("loadGame() thisState =", thisState);
  return thisState;
};