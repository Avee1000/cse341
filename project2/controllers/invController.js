// const mongodb = require("../database");
// const { ObjectId } = require("mongodb");
const db = require('../models');
const Classification = db.classification;
const Cars = db.cars;
const mongoose = require('mongoose');
const invCont = {};
const classification = require("../class.json")

invCont.buildCreateContact = (req, res, next) => {
    try {
        res.render("account/add", {
            title: "Create Contact",
            errors: null
        });
    } catch (error) {
        next(error);
    }
}


invCont.buildEditContact = async (req, res, next) => {
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

invCont.insertClassifications = async (req, res, next) => {
    try {
        const classifications = await Classification.insertMany(classification);
        if (classifications) {
            res.status(200).json({ message: "Classifications inserted successfully", data: classifications });
        } 
        console.log("✅ Cars inserted successfully");

    } catch (error) {
        console.error("❌ Error inserting classifications:", error);
        res.status(500).json({ message: "Failed to insert classifications", error });
    }
}

module.exports = invCont;