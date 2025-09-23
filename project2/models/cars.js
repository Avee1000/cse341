// models/Car.js
const mongoose = require("mongoose");

const Car = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  miles: Number,
  color: String,
  images: {
    main: String,
    thumbnail: String
  },
  classification: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classification", // reference to Classifications collection
    required: true
  }
});

module.exports = mongoose.model("Car", Car);
// This code defines a Mongoose model for a car with the specified fields. The model is exported so it can be used in other parts of the application.