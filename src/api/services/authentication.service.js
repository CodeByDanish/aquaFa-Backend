const bcrypt = require('bcrypt');
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const uuid = require('uuid');
secret_key = 'danish'


module.exports = {
    loginUser : async (req,res) =>{
       
        const userName = req.body.name
            const result = await userModel.findOne({ name: userName });
            if (!result) {
                res.send(404, 'User Does not exist.')
            }
            else {
                const enteredPassword = req.body.password;
                const hashPassword = result.password;
                bcrypt.compare(enteredPassword, hashPassword, function (err, resul) {
                    if (err) {
                        res.send('Error comparing password:', err);
                    } else if (resul) {
                        const userId = uuid.v4();
                        // Generate token
                        const token = jwt.sign({ id: userId }, secret_key);
                        // Update token in the user model
                        userModel.findByIdAndUpdate(result._id, { userToken: token }, { new: true })
                        res.send(result);
                    } else {
                        res.send('Password is incorrect.');
                    }
                })
            }
    }
}