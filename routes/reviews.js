const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {isLoggedIn,isAuthor,validateReview} = require("../middleware.js");

//Review Route
//Review POST route
router.post("/",isLoggedIn,validateReview,wrapAsync(async(req,res,next)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success",`Your review has been added to ${listing.title}!`);
    res.redirect(`/listings/${listing.id}`)
}));

//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(async(req,res,next)=>{
    let {id,reviewId} = req.params;
    let listing = await Listing.findById(req.params.id);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success",`review removed from ${listing.title}!`);
    res.redirect(`/listings/${id}`);
}));

module.exports = router;