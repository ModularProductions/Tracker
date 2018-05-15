import { mergeObjects } from "./utils";

export default function updateState (prevState, props, currData) {
  let newState = {
    ...prevState,
    userCommand: "",
  };
  
  // take in new relays
  let oldRelay = prevState.game.relay;
  currData.relay.forEach(ele => {
    // keep relay limited to 100 items
    if (oldRelay.length > 100) oldRelay.splice(0, 1);
    oldRelay.push(ele);       
  });
  newState.game.relay = oldRelay;

  // update other state changes
  newState.game = mergeObjects(newState.game, currData.state);
  return newState;
};