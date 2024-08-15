const express=require('express')
const app=express();
const db= require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.get('/', function(req, res){
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
