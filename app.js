const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;
const app = express();
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const MONGO_URL = "mongodb://127.0.0.1:27017/rentora";
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const listingSchema = require("./schema.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

// Mongo Connection 
main().then((res)=>{
    console.log("MongoDB connected successfully .")
}).catch(err=>console.log(err));

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.send("Working");
})

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

app.get("/listings",wrapAsync(async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{ allListings });
}));
//New Form Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});
//Create Route
app.post("/listings",validateListing,wrapAsync(async (req,res,next)=>{
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");       
}));
//Edit Route
app.put("/listings/:id",wrapAsync(async(req,res)=>{
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
    res.redirect(`/listings/${id}`)
}));

//Delete Route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{ 
    let {id} = req.params; 
    let listing = await Listing.findByIdAndDelete(id)
    res.redirect("/listings");
}));

//Show Route
app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));

//Edit Form Route
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
}));

// app.get("/listings", async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"24 Venue",
//         description:"Best Luxury Rooms , best for family ",
//         price:2800,
//         location:"Pimpri Chinchwad , Pune",
//         country:"India"
//     });
//     await sampleListing.save();
//     console.log("sample saved");
//     res.send("success.");
// })

//Custom Error Class
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
})
//Handling Async Errors
app.use((err,req,res,next)=>{
    let {status=500,message="Something went Wrong!"} = err;
    res.status(status).render("error.ejs",{err});
})
app.listen(PORT,()=>{
    console.log(`Server running on port : ${PORT}`);
})