const router = require("express").Router();
const invController = require("../controllers/invController");

router.get("/create", invController.buildCreateContact);

router.get("/edit/:id", invController.buildEditContact);

// route.get("/:id", contactController.getOneContact);

module.exports = router;