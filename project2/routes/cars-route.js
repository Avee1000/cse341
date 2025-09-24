const router = require("express").Router();
const invCont = require("../controllers/invController");
const utilities = require("../utilities");

// router.get("/api/contact", contactController.getAllContacts);

// router.get("/api/contact/:id", contactController.getOneContact);

// router.post("/api/usercreate", contactController.createContact);

// router.put("/api/userupdate/:id", contactController.editContact);

// router.delete("/api/userdelete/:id", contactController.deleteContact);

router.get("/users/api/cars/:id", utilities.handleErrors(invCont.getOneCar));

router.get("/users/api/cars", utilities.handleErrors(invCont.getAllCars));


module.exports = router;