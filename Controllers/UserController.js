 //import { date } from '../../../.cache/typescript/2.6/node_modules/@types/joi';

const User = require('../Models/UserSchema');
var Bcrypt = require('bcrypt');

const controller = {};
controller.getData = (request, reply)=>{
    reply("welcome to my chanel")
};

//---Post User Data------

controller.saveUserData = (request, reply)=>{
    const payloadData = request.payload;
    const p = payloadData.password;
    payloadData.password = Bcrypt.hashSync(p, Bcrypt.genSaltSync(2))
    console.log(payloadData);
    User.create(payloadData)
    .then(function(data){
        console.log("after saved data", data);
        reply(data)
    }).catch(function(err){
        console.log(err)
       reply(err);
    })
}

//--- Get User Data------   

controller.getUserData = (request, reply)=>{
    User.find({},(err,data)=>{
        if(err){
            reply(err).code(404);
        }
        else{
            reply(data).code(200)
        }
    })

}

//---Update User data----

controller.updateUserData = (request, reply)=>{
    
    const id = request.params.id;
    console.log(id);
     User.findByIdAndUpdate(id, { $set: request.payload }, { new: true }, (err, data) => {
        if (err) {
            reply(err)
        }
        else {
            reply(data)
        }
    })

}


//----Delete User Data------

controller.deleteUser = (request, reply) => {
    const id = request.params.id
    //console.log("this record hasbeen deleted",id)
    User.deleteOne({ _id: id })
        .then(function (data) {
            reply(data)
        })
        .catch(function (err) {
            reply(err)
        })
}

//---Find One-----

controller.userFindById = (request, reply) => {
    const id = request.params.id;

    User.findOne({ _id: id }, (err, data) => {
        if (err) {
            reply({ "id": "false", "message": "Id is incorrect" })
        }
        else {
            reply(data)
        }
    })
}

//----get user data by using token-------
controller.userFindByToken = (request, reply) => {
    const userEmail = request.currentUserEmail;
   // request.auth.credentials;

    User.findOne({email : userEmail})
    .then(data=>{
        reply({
            id : data._id,
            firstName : data.firstName,
            lastName : data.lastName,
            email : data.email
        })
    })
    .catch((err)=>{
        reply(err)
    })


}


module.exports = controller;