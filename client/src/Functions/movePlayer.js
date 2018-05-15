import move from "./move";

export default function movePlayer(words, currData) {
  if ((words[0] === "go" || words[0] === "walk" ||words[0] === "run")) {words.shift()};
  if ((words[0] === "n" || words[0] === "north") && (words[1] === "e" || words[1] === "east")) {words[0] = "northeast"};
  if ((words[0] === "n" || words[0] === "north") && (words[1] === "w" || words[1] === "west")) {words[0] = "northwest"};
  if ((words[0] === "s" || words[0] === "south") && (words[1] === "e" || words[1] === "east")) {words[0] = "southeast"};
  if ((words[0] === "s" || words[0] === "south") && (words[1] === "w" || words[1] === "west")) {words[0] = "southwest"};
  let word = words[0];
  switch (word) {
    case "n" : case "north" : word = "north"; break;
    case "ne" : case "northeast" : word = "northeast"; break;
    case "e" : case "east" : word = "east"; break;
    case "se" : case "southeast" : word = "southeast"; break;
    case "s" : case "south" : word = "south"; break;
    case "sw" : case "southwest" : word = "southwest"; break;
    case "w" : case "west" : word = "west"; break;
    case "nw" : case "northwest" : word = "northwest"; break;
    case "u" : case "up" : word = "up"; break;
    case "d" : case "down" : word = "down"; break;
    case "in" : case "into" : word = "in"; break;
    case "leave" : case "out" : word = "out"; break;
    default : currData.relay.push("SYSTEM: Movement not defined. - at movePlayer(), words[0] = '"+words[0]+"'"); console.log("Movement not defined at movePlayer()");
  }
  if (currData.state.room[currData.state.playerLocation].exits[word].to) {
    currData = move("player", word, currData.state.playerLocation, currData.state.room[currData.state.playerLocation].exits[word], currData);
    if (currData.pass) {
      currData.takesTime = true;
    };
  } else currData.relay.push("You can't go that way.");
  // console.log("outgoing data from movePlayer() =", currData);
  return currData;
};