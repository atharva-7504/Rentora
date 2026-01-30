const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async(req,res,next)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success",`Your review has been added to ${listing.title}!`);
    res.redirect(`/listings/${listing.id}`)
}
module.exports.destroyReview = async(req,res,next)=>{
    let {id,reviewId} = req.params;
    let listing = await Listing.findById(req.params.id);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success",`review removed from ${listing.title}!`);
    res.redirect(`/listings/${id}`);
}