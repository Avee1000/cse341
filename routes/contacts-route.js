const route = require("express").Router();
const contactController = require("../controllers/contactController");

route.get("/create", contactController.buildCreateContact);

route.get("/:id", contactController.getOneContact);

module.exports = route;