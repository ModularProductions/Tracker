import takeItem from "./takeItem";
import dropItem from "./dropItem";

// * Item actions

export default function itemAction(words, currData) {
  switch (words[0]) {
    case "take" : case "get" : case "pick" : case "grab" : {
      currData = takeItem(words, currData); break;
    }
    case "drop" : case "discard" : {
      currData = dropItem(words, currData); break;
    }
    default : 
      currData.relay.push("SYSTEM: Command not defined. - at itemAction(), words = '"+words.join(", "));
    console.log("Command not defined at itemAction(), word =", words[0]);
  }
  return currData;
};