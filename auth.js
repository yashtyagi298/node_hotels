const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person= require('./model/person');
// passport middleware
passport.use(new LocalStrategy(async(username,password,done)=>{
    // authentication logic
    try{
       console.log('Recieve credentials.. ', username,password);
       const user = await Person.findOne({username:username});
       if(!user){
         return done(null,false,{message:'Incorrect username'});
       }
       const isPasswordMatch=await user.comparePassword(password);
       if(isPasswordMatch){
        return done(null,user);
       }else{
        return done(null,false,{message:'incoorect password'});
       }
    }catch(err){
             return done(err);
    }
}))

module.exports= passport;
