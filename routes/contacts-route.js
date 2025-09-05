const route = require("express").Router();
const contactController = require("../controllers/contactController");

route.get("/", contactController.getAllContacts);

route.get("/:id", contactController.getOneContact);

module.exports = route;