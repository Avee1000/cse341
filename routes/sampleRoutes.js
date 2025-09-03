const express = require("express")
const router = new express.Router() 
const sampleController = require("../controllers/sampleController")

router.get("/listings", sampleController.listings);

module.exports = router;