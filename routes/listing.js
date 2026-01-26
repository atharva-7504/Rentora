const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const path = require("path");


//Index
router.get("/",wrapAsync(async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{ allListings });
}));
//New Form Route
router.get("/new", isLoggedIn, (req,res)=>{
    res.render("listings/new.ejs");
});
//Create Route
router.post("/",isLoggedIn,validateListing,wrapAsync(async (req,res,next)=>{
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id
        await newListing.save();
        req.flash("success",`${req.body.listing.title} is listed and details are live now!`);
        res.redirect("/listings");       
}));
//Edit Route
router.put("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send Valid data for listing.")
    }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,req.body.listing,{new:true});
    if(req.file){
        listing.image = {
            url:req.file.path,
            filename:req.file.filename
        };
        await listing.save();
    }
    req.flash("success",`${req.body.listing.title} Listing Edited!`);
    res.redirect(`/listings/${id}`)
}));

//Delete Route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{ 
    let {id} = req.params; 
    let listing = await Listing.findByIdAndDelete(id);
    req.flash("success",`${listing.title} and its details were deleted`);
    res.redirect("/listings");
}));


//Show Route
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing) {
        req.flash("error","Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{ listing });
}));

//Edit Form Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error","Listing you requested for Editing does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing})
}));


module.exports = router;