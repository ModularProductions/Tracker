const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saveStateSchema = new Schema({
  player_id: { type: [String], required: true },
  dateSaved: { type: Date, default: Date.now },
  quickSave: { type: Boolean, required: true },
  gameData: { type: {}, required: true },
});

const SaveState = mongoose.model("SaveState", saveStateSchema);

module.exports = SaveState;