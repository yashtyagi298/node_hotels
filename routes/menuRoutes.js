const express= require('express');
const router =  express.Router();
const Menu = require('../model/menu');

router.post('/', async (req,res)=>{
    try{
        const data2 = req.body 
        const newMenu = new Menu(data2);
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    }catch(err){
     console.log(err);
     res.status(500).json({error:"internal matter..."})
    }
}) 
router.get('/',async(req,res)=>{
    try{
         const menuData=await Menu.find();
         console.log('Data fetched')
         res.status(200).json(menuData);
    }catch(err){
         console.log(err);
         res.status(500).json({
            error:"internal matter.."
         })

    }
})
// query 
router.get('/:taste',async(req,res)=>{
    try{
        const taste= req.params.taste;   // query parameter 
        if(taste=='spicey' || taste=='sweet'){
            
            const responseTaste = await Menu.find({taste:taste});
            console.log('Taste fetched...');
            res.status(200).json(responseTaste);


        }else{
            res.status(200).json({
                message:'we have no this type of taste'
            })
        }


    }catch(err){
        console.log(err);
        res.status.json({
            message:'Error occur'
        })
    }
})
// update the data 
router.put('/:objectId',async(req,res)=>{
    try{

        const objectId =  req.params.objectId;
        const updateData =  req.body;

        const data = await Menu.findByIdAndUpdate(objectId,updateData,{
            new:true,
            runValidators:true
        });
        console.log('data updated...');
        res.status(200).json(data);

        if(!data){
            res.status(404).json({
                msg:'data not found...'
            })
        }


    }catch(err){
            console.log(err);
            res.status(500).json({
                msg:'internal error'
            })
    }
})
// delete the data 

router.delete('/:objectId',async(req,res)=>{

    try{
          
        const objectId = req.params.objectId;
      
        const response= await Menu.findByIdAndDelete(objectId);

        console.log('data deleted....');
        res.status(200).json({ msg: 'data deleted succsesfully...' });
        if(!response){
            return res.status(404).json({ error: 'Person not found' });
        }


    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal error'});

    }

})

module.exports= router;

// comment added for testing purpose