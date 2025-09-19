const router = require("express").Router();
const contactController = require("../controllers/contactController");

router.get("/api/contact", contactController.getAllContacts);

router.get("/api/contact/:id", contactController.getOneContact);

router.post("/api/usercreate", contactController.createContact);

router.put("/api/userupdate/:id", contactController.editContact);

module.exports = router;