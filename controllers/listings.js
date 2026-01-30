const Listing = require("../models/listing");

module.exports.index = async(req,res)=>{
    // const allListings = await Listing.find({});
    // res.render("listings/index.ejs",{ allListings });
    const { category } = req.query;

    let allListings;

    if (category) {
        allListings = await Listing.find({
            category: { $in: [category] }
        });
    } else {
        allListings = await Listing.find({});
    }

    res.render("listings/index.ejs", { allListings, selectedCategory: category });
}
module.exports.renderNewForm =  (req,res)=>{
    res.render("listings/new.ejs");
}
module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner").populate("category");
    if(!listing) {
        req.flash("error","Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{ listing });
}
module.exports.renderEditForm = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error","Listing you requested for Editing does not exist");
        return res.redirect("/listings");
    }
    let originalImage = listing.image.url;
    originalImage = originalImage.replace("/upload","/upload/h_100,w_200/e_blue:300")
    res.render("listings/edit.ejs",{listing,originalImage})
}
module.exports.destroyListing = async(req,res)=>{ 
    let {id} = req.params; 
    let listing = await Listing.findByIdAndDelete(id);
    req.flash("success",`${listing.title} and its details were deleted`);
    res.redirect("/listings");
}
module.exports.updateListing = async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send Valid data for listing.")
    }
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,req.body.listing,{new:true});

    if (!listing.category) {
        listing.category = [];
    }
     
    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;  
        listing.image = {
            url:url,
            filename:filename,
        };
        await listing.save();
    }
    req.flash("success",`${req.body.listing.title} Listing Edited!`);
    res.redirect(`/listings/${id}`)
}
module.exports.createListing = async (req,res,next)=>{
    let listing = req.body.listing;
    console.log(listing)
    if(typeof listing.category === "string"){
        listing.category = [listing.category];
    }
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success",`${req.body.listing.title} is listed and details are live now!`);
    res.redirect("/listings");       
}
module.exports.searchListings = async (req,res) => {
    const q = req.query.q;
    const listings = await Listing.find({$or:[{location:{$regex:q,$options:"i"}},{title:{$regex:q,$options:"i"}}]})
    if(listings.length === 0){
        req.flash("error","No Listings Found !");
        return res.redirect("/listings")
    }
    res.render("listings/index",{allListings:listings})
}