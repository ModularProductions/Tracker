
// checks if light source is present in room and player is not blind, returns boolean
export default function canSee(room, playerInv, creaturesPresent, modifiers) {
  let light = !room.dark;
  playerInv.forEach(ele => {
    if (ele.lightSource) light = true;
  });
  room.inventory.forEach(ele => {
    if (ele.lightSource) light = true;
  });
  for (let thisCreature in creaturesPresent) {
    for (let i = 0; i < creaturesPresent[thisCreature].inventory.length; i++) {
      if (creaturesPresent[thisCreature].inventory[i].lightSource) {
        light = true; 
      }
    }
  }
  if (modifiers.blind === true) {
    light = false;
  }
  return light;
};