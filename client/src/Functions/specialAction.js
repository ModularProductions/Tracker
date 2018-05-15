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
    default : 
    currData.relay.push("SYSTEM: Command not defined. - at specialAction(), words = '"+words.join(", "));
      console.log("Command not defined at specialAction(), word =", words[0]);
    
  }
  console.log("outgoing data from specialAction() =", currData);
  return currData;
};