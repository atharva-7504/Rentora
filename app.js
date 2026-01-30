if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const MONGO_URL = "mongodb://127.0.0.1:27017/rentora";
const DB_URL = process.env.ATLAS_DB_URL;
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratergy = require("passport-local");
const User = require("./models/user.js");

// Mongo Connection 
main().then((res)=>{
    console.log("MongoDB connected successfully .")
}).catch(err=>console.log(err));

async function main(){
    await mongoose.connect(DB_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

// //Root Route
// app.get("/",(req,res)=>{
//     res.send("Working");
// })
const store = MongoStore.create({
    mongoUrl: DB_URL,
    crypto:{
        secret:process.env.SESSION_SECRET,
    },
    touchAfter:24 * 3600,
})
store.on("error",(err)=>{
    console.log("ERROR in MONGOOSE SESSION STORE",err);
})
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
    },
    store:store
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//For sending local data
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
})


app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

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