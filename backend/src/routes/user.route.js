const express = require('express');
const router = express.Router();
const userController = require("../controller/user.controller");


// router.get('/register', userController.user);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/updateSocketId', userController.updateSocketId);
router.get('/getUserDetailsById/:id', userController.getuserdetails);
router.get('/getAllUserDetails', userController.getAllUsers);
// router.get('/getAllMessages', userController.getAllMessages);
// router.get('/addMessage', userController.addMessages);



// router.post('/api/send-message', userController.sendMessage );



module.exports = router;