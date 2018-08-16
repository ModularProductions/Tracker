// * Special actions

export default function specialAction(words, currData) {
  switch (words[0]) {
    case "again" : case "g" : 
      console.log("Work out method for 'again'")
      // old attempt, needs refactoring
      // if (this.state.lastCommand) {
      //   response = () => this.parseCommand(this.state.lastCommand)
      // } else {
      //   response = () => this.echo(["What do you want to do again?"], "noTime")
      // }; 
      break;
    case "inventory" : case "inv" : case "i" :
      console.log("Work out method for 'inventory'");
      let items = [];
      currData.state.playerInventory.forEach(ele => {
        items.push("a "+ele.shortName)
      });
      if (items.length) {
        currData.relay.push("You are carrying "+[items.slice(0, -1).join(', '), items.slice(-1)[0]].join(items.length < 2 ? '' : ', and ')+".")
      } else {
        currData.relay.push("You aren't carrying anything.");
      }
      break;
    default : 
    currData.relay.push("SYSTEM: Command not defined. - at specialAction(), words = '"+words.join(", "));
      console.log("Command not defined at specialAction(), word =", words[0]);
  }
  console.log("outgoing data from specialAction() =", currData);
  return currData;
};