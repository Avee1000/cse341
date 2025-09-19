const mongodb = require("../database");
const { ObjectId } = require("mongodb");
const contactController = {};

contactController.buildCreateContact = (req, res, next) => { 
    try {
        res.render("account/add", {
            title: "Create Contact",
            errors: null
        });
    } catch (error) {
        next(error);
    }
}


contactController.buildEditContact = async (req, res, next) => { 
    try {
        const { id } = req.params;
        const userId = new ObjectId(id);

        if (!ObjectId.isValid(id)) return null;

        const user = await (await mongodb.getDatabase()).collection("contacts").findOne({
            _id:userId
        });

        if (!user) {
            return res.status(404).json({
                error: "Contact not found"
            });
        }

        console.log(user);
        res.render("account/update", {
                    title: "Edit Contact",
            errors: null,
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    favoriteColor: user.favoriteColor,
                    birthday: user.birthday
        });
    } catch (error) {
        next(error);
    }
}


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
    const { id } = req.params;

    // 1. Validate the ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid contact ID format" });
    }

    // 2. Query by ObjectId
    const db = await mongodb.getDatabase();
    const contact = await db.collection("contacts").findOne({ _id: new ObjectId(id) });

    // 3. Handle not found
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // 4. Respond
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact);

  } catch (error) {
    console.error("🔥 Error fetching contact:", error);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
}

contactController.createContact = async (req, res, next) => {
    try {
        const newContact = req.body;
        console.log(newContact);
        const result = await (await mongodb.getDatabase()).collection("contacts").insertOne(newContact);
        if (result) {
            res.status(201).json(result)
        }
    } catch (error) {
        console.error("🔥 Error creating contact:", error);
        res.status(500).json({ error: "Failed to create contact" });
    }
}

contactController.editContact = async (req, res, next) => { 
    try {
        const userId = req.params.id;
        const updatedContact = req.body;
        console.log(updatedContact);


        const result = await (await mongodb.getDatabase()).collection("contacts").updateOne(
            { _id: new ObjectId(userId) },
            {
                $set: {
                    firstName: updatedContact.firstName,
                    lastName: updatedContact.lastName,
                    email: updatedContact.email,
                    favoriteColor: updatedContact.favoriteColor,
                    birthday: updatedContact.birthday
                }
            }
        );
        if (result) {
            console.log(result);
            res.status(201).json(result)
        }

    } catch (error) {
        console.error("🔥 Error updating contact:", error);
    }
}

module.exports = contactController;