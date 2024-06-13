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
const {isAdmin,userAdminAccess} = require('../utils/accesscontrol')
   
//second half of the entire end point

    router.get('/all-users',isAdmin,AllUsers);
    router.post('/edit-user',userAdminAccess,EditUser);
    router.post('/delete-user',userAdminAccess,DeleteUser);
    router.post('/add-cart',userAdminAccess,addCart)
    router.post('/update-cart-item',userAdminAccess,updateCountCartItem)
    router.post('/delete-cart-item',userAdminAccess,deleteCartItem)
    router.post('/add-wislist',userAdminAccess,addWislist)
    router.post('/update-wislist-item',userAdminAccess,updateCountWislistItem)
    router.post('/delete-wislist-item',userAdminAccess,deleteWislistItem)

    // after verifying the token we are chekcing if the user has access to the route


    module.exports=router;

