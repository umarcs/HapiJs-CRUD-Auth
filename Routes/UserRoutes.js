const userController = require('../Controllers/UserController');
const userLoginController = require('../Controllers/userLoginSignup');

const users = [
    {
        method : 'get',
        path : '/',
        config: { auth: false },        

        handler : userController.getData
    },
    {
        method : 'post',
        path : '/saveUserInfo',
        handler : userController.saveUserData
    },
    {
        method : 'get',
        path : '/getUserData',
        config: { auth: false },        
        handler : userController.getUserData,
    },
    {
        method : 'put',
        path : '/updateUser/{id}',
        handler : userController.updateUserData
    },
    {
        method : 'delete',
        path : '/deleteUser/{id}',
        handler : userController.deleteUser
    },
    {
        method : 'get',
        path : '/userFindById/{id}',
        config: { auth: false },                
        handler : userController.userFindById
    },
    {
        method : 'post',
        path : '/api/login',
        config: { auth: false },
        handler : userLoginController.login
    },
    {
        method : 'post',
        path : '/api/signup',
        config: { auth: false },
        handler : userLoginController.signUp
    },
    // api get user data by using token
    {
        method : 'get',
        path : '/api/singleUserData',
        handler : userController.userFindByToken
    }
];

module.exports = users;

module.exports.myname = "umer";
