const mongodb = require("../database");
const { ObjectId } = require("mongodb");
const contactController = {};

contactController.getAllContacts = async (req, res, next) => {
    try {
        const contacts = await (await mongodb.getDatabase()).collection("contacts").find({});
        contacts.toArray().then((data) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(data);
        })
    } catch (error) {
        console.error("🔥 Error fetching contacts:", error);
        res.status(500).json({ error: "Failed to fetch contacts" });
    }
};

contactController.getOneContact = async (req, res, next) => { 
    try {
        const contactId = new ObjectId(req.params.id);
        console.log(contactId);
        const contacts = await (await mongodb.getDatabase()).collection("contacts").find({ _id: contactId });
        contacts.toArray().then((data) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(data);
        })
    }
    catch (error) {
        console.error("🔥 Error fetching contact:", error);
        res.status(500).json({ error: "Failed to fetch contact" });
    }
}

module.exports = contactController;