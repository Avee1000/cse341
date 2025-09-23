const router = require("express").Router();
const invCont = require("../controllers/invController");
const utilities = require("../utilities");

// router.get("/api/contact", contactController.getAllContacts);

// router.get("/api/contact/:id", contactController.getOneContact);

// router.post("/api/usercreate", contactController.createContact);

// router.put("/api/userupdate/:id", contactController.editContact);

// router.delete("/api/userdelete/:id", contactController.deleteContact);

router.get("/users/api/cars/insert", utilities.handleErrors(invCont.insertClassifications));

module.exports = router;