// Keeps roomDesc window scrolled to bottom
export function updateScroll() {
  var element = document.getElementById("roomDesc");
  element.scrollTop = element.scrollHeight;
}

//  mergeObjects
//  integrates two objects by updating existing properties and adding new ones
// replaces arrays rather than merges them unless "true" passed to mergeArrays
export function mergeObjects(data, add, mergeArrays){
  for (let prop in add) {
    !data.hasOwnProperty(prop) ? data[prop] = add[prop] : (data[prop] = typeof data[prop] !== "object" ? add[prop] : (Array.isArray(data[prop]) && !mergeArrays ? data[prop] = add[prop] : mergeObjects(data[prop], add[prop])))
  }
  return data;
}

// logging assistant for error checking (because console.log is asynchronous when examining objects)
export function logThis(thing, where) {
  console.log("LOGGING", where);
  for (let prop in thing) {
    if (typeof thing[prop] !== "object") {
      console.log(prop, "=", thing[prop]);
    } else {
      if (Array.isArray(thing[prop])) {
        // thing[prop].forEach(ele console.log("logging ", ele, "in array", thing));
      } else {
        logThis(thing[prop]);
      }
    }
  }
  return thing;
}

// logging assistant for currData; needs work
// where = string, success = boolean, data is passed to logThis()
export function logData(data, where, success, logDataSkip) {
  if (!logDataSkip) {
    let str = where;
    (success)?str+=" succeeded":str+=" failed";
    str += ", outgoing data =";
    console.log(str);
    for (let prop in data) logThis(data[prop]);
  }
}
// let logDataSkip = true;
// logData("no-unused-vars warning skipper", false, null, logDataSkip);
  
// checks if object is empty
export function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

// collects creatures present at playerLocation
export function creaturesHere(allCreatures, playerLocation) {
  let creaturesPresent = [];
  for (let thisCreature in allCreatures) {
    if (allCreatures[thisCreature].location === playerLocation) {
      creaturesPresent.push(thisCreature);
    };
  }
  return creaturesPresent;
}
