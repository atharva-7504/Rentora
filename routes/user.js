const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs")
})

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})
router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({
        email:email,
        username:username,
        })
        let registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.flash("success",`Hi ${username} , Welcome to Rentora!`);
        res.redirect("/listings");   
    } catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    };
}));

router.post("/login", passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}) , wrapAsync(async(req,res)=>{
    req.flash("success",` Welcome to Rentora ! You are logged in.`);
    res.redirect("/listings");
}));

module.exports = router;