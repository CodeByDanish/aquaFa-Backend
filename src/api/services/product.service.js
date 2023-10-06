const productModel = require('../models/product.model')
const createError = require('http-errors');


module.exports = {
    addProductSerivce : async (req,res)=>{
        const findProduct = await productModel.findOne({name : req.body.name})
        if(findProduct){
            res.send('Product already exist! please use different product name.')
            //throw createError('Product already exist! please use different product name.')
            
        }
        else{
            const product = new productModel(req.body);
            const result = await product.save()
            res.send({result})
        }
    },
    getAllService : async(res)=>{
        const result = await productModel.find();
        console.log(result)
        if(result.length !== 0){
            res.send(result)
        }
        else{
            res.send('Product not found.')
           // throw createError('Product not found.')
        }
    }
}