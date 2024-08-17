const express = require('express');
const Person = require('../model/person')
const router = express.Router();

router.post('/',async(req,res)=>{
    try{
   
       const data = req.body // Assuming the request body contains the person data
       
       // create a new person document using the mongoose model
       const newPerson= new Person(data);
       const savedPerson = await newPerson.save();
       console.log('data saved');
       res.status(200).json(savedPerson);
    }catch(err){
      console.log(err);
      res.status(500).json({
       error:'internal matter '
      })
    }
   })

router.get('/', async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({
            error:'internal matter'
        })
    }

})

router.get('/:workType',async(req,res)=>{
    
    try{
        const workType= req.params.workType;
    if(workType =='chef' || workType =='manager' || workType == 'waiter'){

         const response = await Person.find({work:workType});
         console.log('response fetched...');
         res.status(200).json(response);


    }else{
        res.status(404).json({
            error : 'invalid workTtype'
        })
    }
    }catch(err){
       console.log(err);
       res.status(500).json({msg:'internal error'})
    }
})

// update person data

router.put('/:objectId',async(req,res)=>{
 
    try{
         const personId= req.params.objectId;
         const updatedPersonData = req.body;
         const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,  // return the updated document
            runValidators:true // run mongoose validation 
         })
         console.log('data updated....');
         res.status(200).json(response);

         if(!response){
            return res.status(404).json({
                mg:'person not found'
            })
         }

    }catch(err){
             console.log(err);
             res.status(500).json({msg:'error occur'});
    }
})

// delete 
router.delete('/:objectId',async(req,res)=>{
    try {
        const personId = req.params.objectId; // Extract the person's ID
        //from the URL parameter
        // Assuming you have a Person model
        const deletedPerson = await Person.findByIdAndDelete(personId);
        if (!deletedPerson) {
        return res.status(404).json({ error: 'Person not found' });
        }
        // Send a success message as a JSON response
        res.json({ message: 'Person deleted successfully' });
        } catch (error) {
        console.error('Error deleting person:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
})

module.exports = router;