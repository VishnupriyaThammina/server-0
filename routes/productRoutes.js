    // where all our sub routes for product
    //  along with calls to respect functionality controllers
    // we import express
    const express = require('express')
    // we need express router here so we are requiring express here
    const router = express.Router();
    // import controller function
    const {AddProduct,AllProducts,EditProduct,DeleteProduct}= require('../controllers/productController')
    const {isAdmin} = require('../utils/accesscontrol')
    //second half of the entire end point
    router.post('/create-product',isAdmin,AddProduct);
    router.get('/all-products',isAdmin,AllProducts);
    router.post('/edit-product',isAdmin,EditProduct);
    router.post('/delete-product',isAdmin,DeleteProduct);





    module.exports=router;

