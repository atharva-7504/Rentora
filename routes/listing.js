const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {listingSchema} = require("../schema.js");

//Schema validation for listing
const validateListing = function(req,res,next){
    // finding error through validation
    let {error} = listingSchema.validate(req.body);
    // throwing error
    if(error){
        let errMsg = error.details.map(el=>{el.message}).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

//Index
router.get("/",wrapAsync(async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{ allListings });
}));
//New Form Route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
});
//Create Route
router.post("/",validateListing,wrapAsync(async (req,res,next)=>{
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        req.flash("success",`${req.body.listing.title} is listed and details are live now!`);
        res.redirect("/listings");       
}));
//Edit Route
router.put("/:id",wrapAsync(async(req,res)=>{
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
router.delete("/:id",wrapAsync(async(req,res)=>{ 
    let {id} = req.params; 
    let listing = await Listing.findByIdAndDelete(id);
    req.flash("success",`${listing.title} and its details were deleted`);
    res.redirect("/listings");
}));


//Show Route
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing) {
        req.flash("error","Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{ listing });
}));

//Edit Form Route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error","Listing you requested for Editing does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing})
}));


module.exports = router;