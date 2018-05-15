import movePlayer from "./movePlayer";
import specialAction from "./specialAction";
import itemAction from "./itemAction";
import generalAction from "./generalAction";

// * Dictionaries - trigger command parsing, should be reflected in switch/case

const uselessWords = [
  "the", "a", "at", "to"
];

const generalCommands = [
  "look", "l", "wait", "z", "rest", "wait", "exa", "examine"
];

const itemCommands = [
  "take", "get", "pick", "grab", "drop", "discard", "hold", "search"
];

const specialCommands = [
  "save", "load", "again", "g", "restore", "load", "again", "g"
];

const moveCommands = [
  "n", "ne", "e", "se", "s", "sw", "w", "nw", "north", "east", "south", "west", "northeast", "southeast", "southwest", "northwest", "go", "walk", "run", "enter", "in", "up", "u", "d", "down", "leave"
];

// * Parse user command
export default function parseCommand(commandInput, currData) {
  // trim unnecessary words
  const commandWords = commandInput.trim().toLowerCase().split(" ", 8);
  if (commandWords.length === 8) {
    currData.relay.push("Warning - this game is pretty dumb, and will only accept sentences of up to 8 words. It probably won't even use all eight. Look out for Version 2, coming soon!");
  };
  let command = [];
  // if (command[0] !== "g" || command[0] !== "again") {async (commandInput) => {await this.setState({ lastCommand: commandInput })}};
  commandWords.forEach(ele => {if (!uselessWords.includes(ele)) command.push(ele)});
  //check for move command
  if (moveCommands.indexOf(command[0]) !== -1) {
    currData = movePlayer(command, currData);
    // console.log("outgoing data from movePlayer() => parseCommand() = ", currData);
    return currData;
  }
  else if (specialCommands.indexOf(command[0]) !== -1) {
    currData = specialAction(command, currData);
    // console.log("outgoing data from specialCommands() => parseCommand() =", currData);
    return currData;
  }
  else if (itemCommands.indexOf(command[0]) !== -1) {
    currData = itemAction(command, currData);
    // console.log("outgoing data from itemCommands() => parseCommand() =", currData);
    return currData;
  }
  else if (generalCommands.indexOf(command[0]) !== -1) {
    currData = generalAction(command, currData);
    // console.log("outgoing data from generalCommands() => parseCommand() =", currData);
    return currData;
  }
  console.log("parseCommand() error, command ="+command.join(", "));
  currData.relay.push("SYSTEM: Unknown command. - in parseCommand(), command = "+command.join(", "));
  return currData;
};