const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs")
})

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})
router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","Logged out!");
        res.redirect("/listings");
    })
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
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success",`Hi ${username} , Welcome to Rentora!`);
            res.redirect("/listings");             
        })
  
    } catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    };
}));

router.post("/login",saveRedirectUrl, passport.authenticate("local",{failureRedirect:"/login ",failureFlash:true}) , wrapAsync(async(req,res)=>{
    req.flash("success",` Welcome to Rentora ! You are logged in.`);
    let redirectUrl = res.locals.redirectUrl || "/listings" ;
    res.redirect(redirectUrl);
}));

module.exports = router;