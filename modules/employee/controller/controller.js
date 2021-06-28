const { response } = require('express');
var Userdb=require('../../../databaseConnection/migration/model');


// Create API
exports.create= (req,res)=>{
 //validate Request
//  const result =  await valSchema.validateAsync(req.body)
 if(!req.body){
     res.status(400).send({message: "Content Cannot be empty"});
     return;
 }
 // New User
 const user= new Userdb({
     name:req.body.name,
     email:req.body.email,
     gender:req.body.gender,
     status:req.body.status,
 })
    //Saving in DB
     user
        .save(user)
        .then(data=>{
       // res.send(data)
       res.redirect('/add-user');
    })
        .catch(err=>{
        res.status(500).send({
        message:err.message||"Some error occured"
        });
    });
}

//Read API
exports.find=(req,res)=>{
    if(req.query.id){
        const id=req.query.id;

        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found user with Id " +id})
            }
            else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error retriving data of ID"+id})

        })

    }
    else{ 
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Error occured while getting info"})
    })

}
}

//Update API
exports.update=(req,res)=>{
    if(!req.body){
        return res
          .status(400)
          .send({message:"Data send cannot be empty"})
    }
    const id=req.params.id;
    Userdb.findByIdAndUpdate(id,req.body, {useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Update user with ${id}.with no data`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error Updating user information"})
    })

}

//Delete API
exports.delete=(req,res)=>{
    const id=req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message: `Cannot delete with Id ${id}`})
        }
        else{
            res.send({
                message:"User was deleted "
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Could not delete with id " +id
        });
    });

}