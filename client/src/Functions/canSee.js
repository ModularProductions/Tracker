
// checks if light source is present in room and player is not blind, returns boolean
export default function canSee(room, playerInv, creaturesPresent, modifiers, allCreatures) {
  console.log("room =", room);
  let light = !room.dark;
  playerInv.forEach(ele => {
    if (ele.lightSource) light = true;
  });
  room.inventory.forEach(ele => {
    if (ele.lightSource) light = true;
  });
  creaturesPresent.forEach(ele => {
    for (let i = 0; i < currData.stateallCreatures[ele].inventory.length; i++) {
      if (allCreatures[ele].inventory[i].lightSource) {
        light = true; 
      }
    }
  })
  if (modifiers.blind === true) {
    light = false;
  }
  return light;
};