const userModel = require("../models/user.model")
const bcrypt = require('bcrypt');
const createError = require('http-errors');
module.exports = {
    updateUser : async (id,req,res)=>{
        checkOldPassword = false;
        const updates = req.body;
        const options = { new: true } // getting the updated the data
        if ('password' in req.body) {
            const oldPassword = req.body.oldPassowrd;
            const newPassword = req.body.password;
            const result = await userModel.findById(id);
            checkOldPassword = await bcrypt.compare(oldPassword, result.password)
            if (checkOldPassword) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(newPassword, salt)
                req.body.password = hashPassword
            }
            else {
                throw createError('Old password is not correct.')
            }
            const resultUpdate = await userModel.findByIdAndUpdate(id, updates, options);
            if (resultUpdate === null) {
                throw createError(404, 'User Does not exist.')
            }
            else {
                res.send(resultUpdate)
            }
        }
        else {
            const result = await userModel.findByIdAndUpdate(id, updates, options);
            if (result === null) {
                throw createError(404, 'User Does not exist.')
            }
            else {
                res.send(result)
            }
        }
    },
    addUser: async (req,res) =>{
        const pass = req.body.password;
        const cpass = req.body.cpassword;
        if (pass === cpass) {
            const findName = await userModel.findOne({ name: req.body.name })
            if (findName) {
                throw createError('User already exist! please use different user name.')
            }
            else {
                const user = new userModel(req.body);
                const result = await user.save();
                res.send({ result })
            }

        }
        else {
            throw createError('Password & Confirm Password Does Not Match.')
        }
    },
        getUserById : async(id,req,res)=>{
        const result = await userModel.findById(id);

        if (!result) {
            throw createError(404, 'User Does not exist.')
        }
        else {
            res.send(result)
        }
    },
    deleteUserById : async (id,req,res)=>{
        const result = await userModel.findByIdAndDelete(id);
        if (!result) {
            throw createError(400, "Invalid user id")
        }
        res.send(result)
    },
    getAllUsers : async(res) =>{
        const result = await userModel.find();
            res.send(result)
    }
}