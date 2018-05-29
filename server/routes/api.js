const router = require("express").Router();
const saveStatesController = require("../controllers/saveStatesController");

// saveState routes
// Matches with "/api/saveStates"
router.route("/saveStates/")
  .get(saveStatesController.findAll)
  .post(saveStatesController.create);

// Matches with "/api/saveStates/:id"
router.route("/saveStates/:id")
  .get(saveStatesController.findById)
  .put(saveStatesController.update)
  .delete(saveStatesController.remove);

// user auth routes
router.use("/dashboard", (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    // user values passed through from auth middleware
    user: req.user
  });
});

module.exports = router;