import move from "./move";

// moves creature randomly (or maybe sits still)
export function moveRandom(currData) {
  console.log(this, "is moving randomly");
  let exits = [];
  for (let exit in currData.state.room[this.location].exits) {
    let thisExit = currData.state.room[this.location].exits[exit];
    // console.log("checking", thisCreature, "'s exit ", thisExit);
    if (
        thisExit.to && !thisExit.invisible && !thisExit.blocked && (this !== "minotaur" || !thisExit.minBlocked)
    ) {
      exits.push([exit]);
    };
  }
  let roll = Math.floor(Math.random() * Math.floor(100));
  if (roll <= 50) {
    // creature stays put
  } else {
    for (let i = 0 ; i < exits.length; i++) {
      if (roll <= 50 + (i+1) * (50 / exits.length)) {
        currData = move(this, exits[i], this.location, currData.state.room[this.location].exits[exits[i]], currData);
        // console.log(thisCreature+"'s location after move = '"+currData.state.allCreatures[thisCreature].location+"' ; roll = ", roll);
        break;
      }
    }
  }
  return currData;
}

