const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");


module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        //if user not loggedIn then store the original path where user want to redirect 
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","To create Listing you must be logged in!");
        return res.redirect("/login");
    }
    next();
}
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}

module.exports.isOwner = async(req,res,next)=>{
        let {id} = req.params;
        let listing = await Listing.findById(id);
        if(!listing.owner.equals(res.locals.currentUser._id)){
            req.flash("error",`You don't have permission to makes changes in this listing.`);
            return res.redirect(`/listings/${id}`);
        }
        next();
}
module.exports.validateListing = (req,res,next) => {
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
module.exports.validateReview = (req,res,next) => {
    // finding error through validation
    let {error} = reviewSchema.validate(req.body);
    // throwing error
    if(error){
        let errMsg = error.details.map(el=>{el.message}).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}
module.exports.isAuthor = async(req,res,next)=>{
        let {id,reviewId} = req.params;
        let review = await Review.findById(reviewId);
        if(!review.author.equals(res.locals.currentUser._id)){
            req.flash("error",`You don't have permission to delete this review.`);
            return res.redirect(`/listings/${id}`);
        }
        next()
}