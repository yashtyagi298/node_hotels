const mongoose= require('mongoose');

const menuSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    quantity:{
      type:String,
      required:true,
      enum:["full","half"]
    },
    price:{
         type:Number,
         required:true,
         
    },
    taste:{
        type:String,
        required:true,
        enum:['spicey','sweet']
    }
})

const Menu = mongoose.model('Menu',menuSchema);
module.exports=Menu;