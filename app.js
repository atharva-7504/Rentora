const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;
const app = express();
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const MONGO_URL = "mongodb://127.0.0.1:27017/rentora";

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
app.get("/listings",async(req,res)=>{
    const allListings = await Listing.find({});
    console.log(allListings);
    res.render("listings/index.ejs",{ allListings });
})
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});
app.post("/listings",async (req,res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings")
})
app.put("/listings/:id",async(req,res)=>{
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
})
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params; 
    let listing = await Listing.findByIdAndDelete(id)
    res.redirect("/listings");
})
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
})
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
app.listen(PORT,()=>{
    console.log(`Server running on port : ${PORT}`);
})