const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const path = require("path");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});

//Index and Create Route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,upload.single("listing[image][url]"),validateListing,wrapAsync(listingController.createListing));

router.get("/search",listingController.searchListings)
//New Form Route
router.get("/new", isLoggedIn,listingController.renderNewForm);


//Edit,Delete,Show Route
router.route("/:id")
    .put(isLoggedIn,isOwner,upload.single("listing[image][url]"),validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))
    .get(wrapAsync(listingController.showListing));



//Edit Form Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports = router;