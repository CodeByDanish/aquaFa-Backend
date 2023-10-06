const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")


//get all data
router.get('/',userController.getAllUsers)
// //add new data
router.post('/',userController.addUser)

// Request for get, update and delete by Id
router.get('/:id',userController.getUserById)
router.patch('/:id',userController.updateUserById)
router.delete('/:id',userController.deleteUserById)

module.exports = router