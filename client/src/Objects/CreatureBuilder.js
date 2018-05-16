import { moveRandom } from "../Functions/scripts";

function Creature(
  location, shortName, lookDesc, keywords, health, attack, defense, script, attitude, doing
) {
  this.location = location;
  this.shortName = shortName;
  this.lookDesc = lookDesc;
  this.keywords = keywords;
  this.health = health;
  this.attack = attack;
  this.defense = defense;
  this.script = script;
  this.attitude = attitude;
  this.doing = doing;
  this.inventory = [];
  this.modifiers = {};
  this.moveRandom = moveRandom(currData);
}

let cat = new Creature(
  "two", // location
  "small cat", // shortName
  "A small gray and white cat wearing quite a fancy collar. She seems supremely uninterested in your presence, but might let you take a closer look.", // lookDesc
  ["cat", "kitty", "kitten", "pussy", "animal"], // keywords
  100, // health
  40, // attack
  50, // defense
  ["wander"], // script
  "wander", // attitude
  "wandering around.", // currently doing
);
cat.dumb = true;

let minotaur = new Creature(
  "five", // location
  "Minotaur", // shortName
  "Rather large and muscle-bound, but an otherwise typical bull-headed man, with that oh-so-common look of rage and bloodshed in its eyes. Those eyes are focused on you, by the way.", // lookDesc
  ["beast", "minotaur", "monster"], // keywords
  40, // health
  10, // attack
  8, // defense
  ["wander"], // script
  "wander", // attitude
  "stomping around.", // currently doing
);

module.exports = {
  cat: cat,
  minotaur: minotaur
}