const mongoose = require("mongoose")
const {addProductSerivce,getAllService} = require('../services/product.service')

module.exports = {
    addProductController : (req,res,next)=>{
        try{
            addProductSerivce(req,res)
        }
        catch(error){
            if(error.name === 'ValidationError'){
                next(createError(422,error.message))
                return
            }
            next(error)
        }
    },
    getAllController : (req,res,next) =>{
        try{
            getAllService(res)
        }
        catch(error){
            res.send(error)
        }
    }
}