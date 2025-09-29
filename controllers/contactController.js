// const mongodb = require("../database");
// const { ObjectId } = require("mongodb");
const db = require('../models');
const mongoose = require('mongoose');
const Contact = db.contacts;
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
        const {
            id
        } = req.params;

        
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next({ status: 404, message: "Contact Not Found" });
        }
        const user = await Contact.findById(id);

        if (!user) {
            return next({ status: 404, message: "Contact Not Found" });
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

/// GET ALL CONTACTS MONGOOSE
contactController.getAllContacts = async (req, res, next) => {
    try {
        const allContacts = await Contact.find();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(allContacts);
    } catch (error) {
        console.error("🔥 Error fetching contacts:", error);
        res.status(500).json({
            error: "Failed to fetch contacts"
        });
    }
}

/// GET ALL CONTACTS MONGODB_URI
// contactController.getAllContacts = async (req, res, next) => {
//     try {
//         const contacts = await (await mongodb.getDatabase()).collection("contacts").find({});
//         contacts.toArray().then((data) => {
//             res.setHeader("Content-Type", "application/json");
//             res.status(200).json(data);
//         })
//     } catch (error) {
//         console.error("🔥 Error fetching contacts:", error);
//         res.status(500).json({ error: "Failed to fetch contacts" });
//     }
// };

/// GET ONE CONTACT MONGOOSE
contactController.getOneContact = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: "Invalid ID format"
            });
        }

        const contact = await Contact.find({
            _id: id
        });

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contact);
    } catch (error) {
        console.error("🔥 Error fetching contact:", error);
        res.status(500).json({
            error: "Failed to fetch contact"
        });
    }
}
/// GET ONE CONTACT MONGODB_URI
// contactController.getOneContact = async (req, res, next) => {
// try {
//     const { id } = req.params;

//     // 1. Validate the ID
//     if (!ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid contact ID format" });
//     }

//     // 2. Query by ObjectId
//     const db = await mongodb.getDatabase();
//     const contact = await db.collection("contacts").findOne({ _id: new ObjectId(id) });

//     // 3. Handle not found
//     if (!contact) {
//       return res.status(404).json({ error: "Contact not found" });
//     }

//     // 4. Respond
//     res.setHeader("Content-Type", "application/json");
//     res.status(200).json(contact);

//   } catch (error) {
//     console.error("🔥 Error fetching contact:", error);
//     res.status(500).json({ error: "Failed to fetch contact" });
//   }
// }


/// CREATE CONTACT MONGOOSE
contactController.createContact = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        } = req.body;

        const newContact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };
        const result = await Contact.create(newContact);
        console.log("Saved contact:", newContact);

        if (result) {
            res.status(201).json(result)
        }
    } catch (error) {
        console.error("🔥 Error creating contact:", error);
        res.status(500).json({
            error: "Failed to create contact"
        });
    }
}
/// CREATE CONTACT MONGODB_URI
// contactController.createContact = async (req, res, next) => {
//     try {
//         const { firstName,
//             lastName,
//             email,
//             favoriteColor,
//             birthday
//         } = req.body;

//         const newContact = {
//   firstName,
//   lastName,
//   email,
//   favoriteColor,
//   birthday
// };
//         const result = await (await mongodb.getDatabase()).collection("contacts").insertOne(newContact);
//         if (result) {
//             res.status(201).json(result)
//         }
//     } catch (error) {
//         console.error("🔥 Error creating contact:", error);
//         res.status(500).json({ error: "Failed to create contact" });
//     }
// }




/// UPDATE CONTACT MONGOOSE
contactController.editContact = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updatedContact = req.body;

        const result = await Contact.findByIdAndUpdate(userId, updatedContact, {
            new: true
        });
        if (result) {
            console.log("Contact updated successfully");
            res.status(201).json(result)
        }
    } catch (error) {
        throw new Error("🔥 Error updating contact:", error);
    }
}
/// UPDATE CONTACT MONGODB_URI
// contactController.editContact = async (req, res, next) => {
//     try {
//         const userId = req.params.id;
//         const updatedContact = req.body;

//         const result = await (await mongodb.getDatabase()).collection("contacts").updateOne(
//             { _id: new ObjectId(userId) },
//             {
//                 $set: {
//                     firstName: updatedContact.firstName,
//                     lastName: updatedContact.lastName,
//                     email: updatedContact.email,
//                     favoriteColor: updatedContact.favoriteColor,
//                     birthday: updatedContact.birthday
//                 }
//             }
//         );
//         if (result) {
//             console.log("Contact updated successfully");
//             res.status(201).json(result)
//         }

//     } catch (error) {
//         console.error("🔥 Error updating contact:", error);
//     }
// }



/// DELETE CONTACT MONGOOSE
contactController.deleteContact = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const result = await Contact.findByIdAndDelete(userId);
        if (result) {
            console.log("Contact deleted successfully");
            res.status(201).json(result)
        }

    } catch (error) {
        console.error("🔥 Error deleting contact:", error);
        res.status(500).json({
            error: "Failed to delete contact"
        });
    }
}
/// DELETE CONTACT MONGODB_URI
// contactController.deleteContact = async (req, res, next) => {
//     try {
//         const userId = req.params.id;
//         const result = await (await mongodb.getDatabase()).collection("contacts").deleteOne(
//             { _id: new ObjectId(userId) }
//         );
//         if (result) {
//             console.log("Contact deleted successfully");
//             res.status(201).json(result)
//         }

//     } catch (error) {
//         console.error("🔥 Error deleting contact:", error);
//         res.status(500).json({ error: "Failed to delete contact" });
//     }
// }

module.exports = contactController;