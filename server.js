const express=require('express')
const app=express();
const db= require('./db');
require('dotenv').config();
const passport= require('./auth')
const bodyParser = require('body-parser');


// Middleware function 
const logRequest = (req,res,next)=>{
    
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest);
//passsport 
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false})

app.get('/',localAuthMiddleware,function(req, res){
 res.send('welcome to the my hotel... How i can help you...!')
})
app.use(bodyParser.json());// req.body


// app.get('/chicken',function(res,req){
//     res.send('sure i would love to serve your chicken..')
// })

// app.get('/idli',(res,req)=>{
//     var customizer_idli={
//         name:'rava_idli',
//         size:'10 cm diameter',
//         is_sambar:true,
//         is_chutney:false;
//     }
//     res.send(customizer_idli);
// })

// app.post('/items',(res,req)=>{
//     res.send('data is saves');
// })
const personRouter = require('./routes/personRoutes');
app.use('/person',personRouter);

const menuRouter = require('./routes/menuRoutes');
app.use('/menu',menuRouter);

const PORT =  process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('listening on port 3000');
})
