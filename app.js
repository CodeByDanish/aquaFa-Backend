require('dotenv').config();
const express = require("express");
const creatError =  require("http-errors")

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended :true}))



//----------------------------user routes------------------------///
const UsersRouter = require('./src/api/routes/user.route');
app.use('/users',UsersRouter)

//---------------------------login route ------------------------///
const loginUser = require('./src/api/routes/login.route');
app.use('/login',loginUser)


//------------------- Product router ----------------------//
const product = require('./src/api/routes/product.router');
app.use('/product',product)



app.use((req,res,next)=>{
    const err = new Error("Not Found");
  err.status = 404;
  next(err)
})
//Error Handler
app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error : {
            status : err.status || 500,
            message :  err.message
        }
    })
})




module.exports = app;