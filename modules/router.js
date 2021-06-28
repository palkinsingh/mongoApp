const express=require('express')
const route=express.Router()
//const apiFunc= require('./employee/validator/employeeValidator')

const services= require('./employee/services/render');
const controller=require('./employee/controller/controller')

route.get('/',services.homeRoutes);

route.get('/add-user',services.add_user)

route.get('/update-user',services.update_user)


// API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

//route.post('/api/users')(controller.create,apiFunc)
module.exports=route
