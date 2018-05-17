import takeItem from "./takeItem";
import dropItem from "./dropItem";
import searchItem from "./searchItem";
import { creaturesHere } from "./utils";
import canPlayerSee from "./canSee";

// * Item actions
export default function itemAction(words, currData) {

  // helpers
  let creaturesPresent = creaturesHere(currData.state.allCreatures, currData.state.playerLocation);
  const canSee = canPlayerSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers, currData.state.allCreatures);
  
  switch (words[0]) {
    case "take" : case "get" : case "pick" : case "grab" : {
      if (words[1] === "up") words.splice(1,1);
      if (canSee) {
        currData = takeItem(words, currData);
      } else {
        currData.relay.push("You can't see well enough to do that!");
      }
      break;
    }
    case "drop" : case "discard" : {
      currData = dropItem(words, currData); break;
    }
    case "search" : {
      if (canSee) {
        currData = searchItem(words, currData); break;
      } else {
        currData.relay.push("You can't see well enough to do that!");
      }
      break;
    }
    default : 
      currData.relay.push("SYSTEM: Command not defined. - at itemAction(), words = '"+words.join(", "));
    console.log("Command not defined at itemAction(), word =", words[0]);
  }
  return currData;
};