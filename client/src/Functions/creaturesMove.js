import move from "./move";

// * Turn handling for Creatures
export default function creaturesMove(currData) {
  for (let thisCreature in currData.state.allCreatures) {
    // check if there is an action queued in Creature's script array
    if (currData.state.allCreatures[thisCreature].script.length) {
      // console.log("room =", room[ele.location]);
      switch (currData.state.allCreatures[thisCreature].script[0]) {
        case "moveRandom" : 
          let exits = [];
          for (let exit in currData.state.room[currData.state.allCreatures[thisCreature].location].exits) {
            let thisExit = currData.state.room[currData.state.allCreatures[thisCreature].location].exits[exit];
            // console.log("checking", thisCreature, "'s exit ", thisExit);
            if (
                thisExit.to && !thisExit.invisible && !thisExit.blocked && (thisCreature !== "minotaur" || !thisExit.minBlocked)
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
                currData = move(thisCreature, exits[i], currData.state.allCreatures[thisCreature].location, currData.state.room[currData.state.allCreatures[thisCreature].location].exits[exits[i]], currData);
                // console.log(thisCreature+"'s location after move = '"+currData.state.allCreatures[thisCreature].location+"' ; roll = ", roll);
                break;
              }
            }
          }
          break;
        case "chase" :
          break;
        case "search" :
          break;
        case "flee" :
          break;
        case "blinded" :
          break;
        default: 
          console.log("creaturesMove() defaulted for "+currData.state.allCreatures[thisCreature]);
          currData.relay.push("creaturesMove() defaulted for "+currData.state.allCreatures[thisCreature]); 
      }
    }
  }
  // console.log("outgoing data from creaturesMove() =", currData);
  return currData;
};

// scraps
 
// * 
// * Advance game time, resolve entity action
// *

// const creaturesMove = (creatures, player) => {
//   let result = {
//     relay: []
//   }
//   creatures.forEach((ele) => {
//     if (ele.script.length) {
//       // do first item in script array
//     }
//   })
//   return result;
// };

