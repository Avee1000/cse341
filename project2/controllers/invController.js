// const mongodb = require("../database");
// const { ObjectId } = require("mongodb");
const db = require('../models');
const Classification = db.classification;
const Cars = db.cars;
const mongoose = require('mongoose');
const invCont = {};

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

invCont.getOneCar = async (req, res, next) => { 
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next({ status: 404, message: "Car Not Found" });
        }
        const car = await Cars.find({
            _id: id
        });

        if (!car) {
            return next({ status: 404, message: "Car Not Found" });
        }
        res.status(200).json(car);
    } catch (error) {
        next(error);
    }
}


invCont.getAllCars = async (req, res, next) => { 
    try {
        const car = await Cars.find();

        if (!car) {
            return next({ status: 404, message: "Car Not Found" });
        }

        res.render("inventory/cars", {
            title: "All Cars",
            cars: car
        })
    } catch (error) {
        next(error);
    }
}

module.exports = invCont;