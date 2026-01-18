const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Creating Schema
const listingSchema = Schema({
    title:{
        type:String,
        maxLength:50,
        required:true
    },
    description:{
        type:String,
    },
    image:{
        filename : {
            type:String,
            default: "listingImage"
        },
        url : {
            type:String,
            default:"https://images.unsplash.com/photo-1737517302831-e7b8a8eaa97c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: (v) => v === " " ? "https://images.unsplash.com/photo-1737517302831-e7b8a8eaa97c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v ,
        }
    },

    price:{
        type:Number,
        min:0
    },
    location:String,
    country:String
})
//Creating Model
const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;