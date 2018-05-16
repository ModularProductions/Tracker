import move from "./move";

// * Turn handling for Creatures
export default function creaturesMove(currData) {
  for (let thisCreature in currData.state.allCreatures) {
    // check if there is an action queued in Creature's script array
    if (currData.state.allCreatures[thisCreature].script.length) {
      // console.log("room =", room[ele.location]);
      switch (currData.state.allCreatures[thisCreature].script[0]) {
        case "moveRandom" : 
          currData = currData.state.allCreatures[thisCreature].moveRandom(currData);
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

