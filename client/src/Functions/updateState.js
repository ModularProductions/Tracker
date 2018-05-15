import { mergeObjects } from "./utils";

export default function updateState (prevState, props, currData) {
  let newState = {
    ...prevState,
    userCommand: "",
  };

  if (currData.takesTime) {
    newState.moveCount = prevState.moveCount++;
  };
  
  // take in new relays
  let oldRelay = prevState.relay;
  currData.relay.forEach(ele => {
    // keep relay limited to 100 items
    if (oldRelay.length > 100) oldRelay.splice(0, 1);
    oldRelay.push(ele);       
  });
  newState.relay = oldRelay;

  // update other state changes
  newState = mergeObjects(newState, currData.state);
  return newState;
};