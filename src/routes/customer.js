let express = require('express');
let router = express.Router();
let CustomerModel = require('../models/customer');


//create
router.post('/customer',(req,res)=>{

    if(!req.body){
      return  res.status(400).send('request body is missing');
    }
     
    let customer_data ={
        name: req.body.name,
        email: req.body.email
    }

    let customer = new CustomerModel(customer_data);
    customer.save()
    .then((doc)=>{
           if(!doc || doc.length === 0) {
               return res.status(400).send({"message":"data not valid"});
            }
            res.status(201).send({"message":"sucess","data":doc});
    }).catch((err)=>{
        res.status(500).json(err);
    })
});


//read
router.get('/customer',(req,res)=>{
    if(!req.query.email){
        return res.status(400).send({"message":'missing url parameter email'});
    }

    CustomerModel.findOne({email:req.query.email}).
    then((doc)=>{
        if(!doc || doc.length === 0) {
            return res.status(500).send({"message":"incorerect data"});
         }
        res.send({"message":"sucess","data":doc});
    }).catch((err)=>{
        res.status(500).json(err);
    });
   
});

//update
router.put('/customer',(req,res)=>{
    if(!req.query.email){
        return res.status(400).send({"message":'missing url parameter email'});
    }
    
    CustomerModel.findOneAndUpdate({email:req.query.email},req.body,{new:true}).
    then((doc)=>{
        if(!doc || doc.length === 0) {
            return res.status(400).send({"message":'email not valid'});
         }
        res.send({"message":"updated","data":doc});
    }).catch((err)=>{
        res.status(500).json(err);
    });
   
});



//delete
router.delete('/customer',(req,res)=>{
    if(!req.query.email){
        return res.status(400).send({"message":'missing url parameter email'});
    }

    CustomerModel.findOneAndRemove({email:req.query.email}).
    then((doc)=>{
        if(!doc || doc.length === 0) {
            return res.status(400).send({"message":'email not valid'});
         }
        res.send({"message":"deleted","data":doc});
    }).catch((err)=>{
        res.status(500).json(err);
    });
   
});


module.exports = router;