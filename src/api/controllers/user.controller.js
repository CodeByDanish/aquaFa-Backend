const userModel = require("../models/user.model")
const { updateUser,getAllUsers,addUser,getUserById,deleteUserById } = require("../services/user.service");
const mongoose = require("mongoose")
const createError = require('http-errors');
module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            getAllUsers(res)
        }
        catch (error) {
            res.send(error)
        }
    },
    addUser: async (req, res, next) => {
        try {
            addUser(req,res)
        }
        catch (error) {
            if (error.name === 'ValidationError') {
                next(createError(422, error.message))
                return
            }
            next(error)
        }
    },
    getUserById: async (req, res, next) => {
        const id = req.params.id;

        try {
            getUserById(id,req,res)
        }
        catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid user id"))
                return
            }
            next(error)
        }

    },
    updateUserById: async (req, res, next) => {
        const id = req.params.id;

        try {
            await updateUser(id, req, res);
        }
        catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid user id"))
            }
            next(error)
        }
    },
    deleteUserById: async (req, res, next) => {
        const id = req.params.id;
        try {
            deleteUserById(id,req,res)
        }
        catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid user id"))
                return
            }
            next(error)
        }
    }
}