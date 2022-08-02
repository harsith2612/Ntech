const express=require('express')
const mongoose=require('mongoose')
const validator=require('validator')
const usersch=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
        validator(value){
            if(!validator.isEmail(value))
            {
                throw new Error('invalid Email id')
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        min:10,
    },
    message:{
        type:String,
        required:true,
        minLength:5
    },
})
const Users=mongoose.model('User',usersch)
module.exports=Users;