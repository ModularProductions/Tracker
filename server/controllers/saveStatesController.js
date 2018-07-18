const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.SaveState
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
      db.SaveState
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
      db.SaveState
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
      console.log("update req.params =", req.params);
      console.log("update req.body =", req.body);
      db.SaveState
      .findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
      db.SaveState
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    },
    getSavedGames: function(req, res) {
      db.SaveState
      .find({ userID: req.params.userID, quickSave: false })
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    },
    getQuickSave: function(req, res) {
      console.log("getQuickSave req.params =", req.params);
      db.SaveState
      .find({ userID: req.params.userID, quickSave: true })
      .then(dbModel => 
        {
          console.log("getQuickSave dbModel =", dbModel);
          res.json(dbModel)
        }
      )
      .catch(err => res.status(422).json(err));
    }
};