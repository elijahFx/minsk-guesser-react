const express = require("express");

const {
  createParty,
  deleteParty,
  deleteAllTheParties,
  getParties,
  connectToParty,
} = require("../controllers/partiesControllers");

const router = express.Router();

router.post("/", createParty);

router.post("/connect-to-party", connectToParty);

router.delete("/delete-party/:id", deleteParty);

router.delete("/delete-all-the-parties", deleteAllTheParties);

router.get("/", getParties);

module.exports = router;
