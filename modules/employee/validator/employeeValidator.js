const Joi = require('joi');


const valSchema= Joi.object({
    name: Joi.string().required(),
    email:Joi.string().required()
})
exports.apiFunc=(req,res)=>{
valSchema.validate(req.body,valSchema,(err,result)=>{
    if(err){
        res.status(422).send({message: "Enter correct Data"}) ;
            return;
           }
})
}
module.exports=
{
    valSchema
}