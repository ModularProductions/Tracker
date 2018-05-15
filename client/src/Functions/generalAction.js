import { creaturesHere } from "./utils";
import examine from "./examine";
import canSee from "./canSee";

// * General actions
export default function generalAction(words, currData) {
  let creaturesPresent = creaturesHere(currData.state.allCreatures, currData.state.playerLocation);
  switch (words[0]) {
    case "l" : case "look" : case "exa" : case "examine" :
      if (canSee(currData.state.room[currData.state.playerLocation], currData.state.playerInventory, creaturesPresent, currData.state.modifiers)) {
        currData = examine(words, currData);
      } else {
        currData.relay.push("You can't see anything!"); 
      }
      break;
    case "z" : case "rest" : case "wait" :
      currData.relay.push("You chill for a minute. It's been a tough day, and you've earned it."); 
      currData.takesTime = true; break;
    default : 
      console.log("Command not defined at generalAction()");
      currData.relay.push("SYSTEM: Command not defined. - at generalAction(), words = "+words.join(", "));
  }
  return currData;
};
