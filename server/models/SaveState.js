const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saveStateSchema = new Schema({
  userID: { type: [String], required: true },
  dateSaved: { type: Date, default: Date.now },
  currentPlayerLocation: { type: [String], required: true },
  quickSave: { type: Boolean, required: true },
  gameData: { type: {}, required: true },
});

const SaveState = mongoose.model("SaveState", saveStateSchema);

module.exports = SaveState;