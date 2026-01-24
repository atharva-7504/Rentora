const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;
const app = express();
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const MONGO_URL = "mongodb://127.0.0.1:27017/rentora";

const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js")

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

//Root Route
app.get("/",(req,res)=>{
    res.send("Working");
})

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews)

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