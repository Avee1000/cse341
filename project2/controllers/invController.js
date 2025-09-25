// const mongodb = require("../database");
// const { ObjectId } = require("mongodb");
const db = require('../models');
const Classification = db.classification;
const Cars = db.cars;
const mongoose = require('mongoose');
const invCont = {};

invCont.buildCreateCars = async (req, res, next) => {
    try {
        const classifications = await Classification.find({});

        res.render("account/add", {
            title: "Create Contact",
            classifications: classifications,
            errors: null
        });
    } catch (error) {
        next(error);
    }
}


invCont.buildEditCars = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        const classifications = await Classification.find({});

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next({ status: 404, message: "Car Not Found" });
        }
        const cars = await Cars.find({
            _id: id
        });
        const car = cars[0];
        if (!car) {
            return next({ status: 404, message: "Car Not Found" });
        }

        res.render("inventory/edit-cars", {
            title: "Edit Cars",
            errors: null,
            _id: car._id,
            make: car.make,
            model: car.model,
            year: car.year,
            price: car.price,
            miles: car.miles,
            color: car.color,
            description: car.description,
            image: car.images.main, 
            thumbnail: car.images.thumbnail,
            classifications: classifications
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
        const car = await Cars.find({});

        if (!car) {
            return next({ status: 404, message: "Car Not Found" });
        }

        res.status(200).json(car);
        // res.render("inventory/cars", {
        //     title: "All Cars",
        //     cars: car
        // })
    } catch (error) {
        next(error);
    }
}

invCont.createCars = async (req, res, next) => {
    try {
        const {
            make, model, year, description, price, miles, color, classification
        } = req.body;

        const car = await Cars.create({ make: make, model: model, year: year, description: description, "images.main": "/images/no-image.png", "images.thumbnail": "/images/no-image-tn.png", price: price, miles: miles, color: color, classification: classification } );

        res.status(201).json(car);

    } catch (error) {
        console.error(error)
    }
}

invCont.editCars = async (req, res, next) => { 
    try {
        const { id } = req.params;
        const { make, model, year, description, image, imageThumbnail, price, miles, color, classification } = req.body
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next({ status: 404, message: "Car Not Found" });
        }

        const result = await Cars.findByIdAndUpdate(
            id,
            { $set: { make: make, model: model, year: year, description: description, "images.main": image, "images.thumbnail": imageThumbnail, price: price, miles: miles, color: color, classification: classification } },
            { new: true });

        if (!result) {
            return next({ status: 404, message: "Car Not Found" });
        }

        res.status(200).json(result);

    } catch (error) {
        throw new Error("🔥 Error updating car:", error);
    }
}

invCont.deleteCars = async (req, res, next) => {
    try {
        const id = req.params.id;

        const car = await Cars.findByIdAndDelete({
            _id: id
        });

        if (!car) {
            return next({ status: 404, message: "Car Not Found" });
        }

        res.status(200).json(car);
    } catch (error) {
        throw new Error("🔥 Error deleting car:", error);
    }
}
module.exports = invCont;