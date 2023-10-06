const express = require("express");
const router = express.Router();
const product =  require('../controllers/product.controller')

router.post('/add',product.addProductController)

router.get('/getAll',product.getAllController)

module.exports = router