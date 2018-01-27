
const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName : {type : String, required : true, trim : true},
    lastName : {type : String, required : true, trim : true},    
    email  : { type  : String, required : true, unique : true},
    password : { type :String , required : true},
})


// userSchema.methods.generateHash = function(password){
// 	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
// }

// userSchema.methods.validPassword = function(password){
//     return bcrypt.compareSync(password, this.password);
// }

const user = mongoose.model('userSignUp', userSchema ,'userSignUp');

module.exports = user;
