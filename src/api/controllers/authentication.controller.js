
const { loginUser } = require('../services/authentication.service')
const createError = require('http-errors');

module.exports = {
    loginUser : async (req,res,next) =>{
        try {
            loginUser(req,res)
        }
        catch(error){
            if (error.name === 'ValidationError') {
                next(createError(422, error.message))
                return
            }
            next(error)
        }
    }
}