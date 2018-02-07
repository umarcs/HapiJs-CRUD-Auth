const jwt = require('jsonwebtoken');
const Config = require('../Config'); //security key
const User = require('../Models/UserSchema');
var Bcrypt = require('bcrypt');

const controller = {};

//-----SignUp-----

controller.signUp = (request, reply) => {
    const payloadData = request.payload;
    const p = payloadData.password;
    console.log("***",payloadData)
    payloadData.password = Bcrypt.hashSync(p, Bcrypt.genSaltSync(2))

    User.findOne({ email: payloadData.email })
        .then(userFound => {
            if (!userFound) {
                // user email is available
                return User.create(payloadData);
            } else {
                // user email not avaialble
                console.log('in else condition')
                return Promise.reject({ type: "USER_NOT_AVAILABLE", message: "User email already exists;" })
            }
        })
        .then(user => {
            reply({
                message: "Data Saved successfuly",
                user: user
            })
        }).catch((err)=>{
            console.log(err)
            if (err.type && err.type == 'USER_NOT_AVAILABLE') {
                reply(err).code(409);
            } else {
                reply(err).code(500)
            }

        })
   
}


//-----login-----

controller.login = (request, reply) => {
    const email = request.payload.email;
    const password = request.payload.password;
    User.findOne({ 'email': email }).
    then(userFind => {
        console.log(userFind)
        if (!userFind) {
            reply({
                message: "Invalid Email",
                login: false
            }).code(401)
        } else if (Bcrypt.compareSync(password, userFind.password)) {
            let token = jwt.sign({ email: userFind.email }, Config.jwt.securityCode, { algorithm: 'HS256' });
            reply(
                {
                    data : {
                        _id : userFind._id,
                        firstName : userFind.firstName,
                        lastName : userFind.lastName,
                        email : userFind.email
                    },
                    token: token
                }
            ).code(200)
        } else {
            reply({
                message: "Invalid Password",
                login: false
            }).code(401)
        }
    }).catch(err => {
        reply({
            message: err
        }).code(500)
    })


}


module.exports = controller;