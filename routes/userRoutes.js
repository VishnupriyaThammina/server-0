    // where all our sub routes for User
    //  along with calls to respect functionality controllers
    // we import express
    const express = require('express')
    // we need express router here so we are requiring express here
    const router = express.Router();
    // import controller function
    const {AddUser,AllUsers,EditUser,DeleteUser, CheckUser}= require('../controllers/userController');
const { addCart,updateCountCartItem,deleteCartItem } = require('../controllers/cartController');
const {addWislist,updateCountWislistItem,deleteWislistItem} = require('../controllers/wislistController')
    //second half of the entire end point
    router.get('/all-users',AllUsers);
    router.post('/edit-user',EditUser);
    router.post('/delete-user',DeleteUser);
    router.post('/add-cart',addCart)
    router.post('/update-cart-item',updateCountCartItem)
    router.post('/delete-cart-item',deleteCartItem)
    router.post('/add-wislist',addWislist)
    router.post('/update-wislist-item',updateCountWislistItem)
    router.post('/delete-wislist-item',deleteWislistItem)


    module.exports=router;

