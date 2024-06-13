
const Order = require('../models/Order');
const User = require('../models/User');
const Cart = require('../models/Cart');
// add order
const placeOrder =  async(req,res)=>{
    try{
        const user = await User.findOne({username:req.user.username}).populate('cart')
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        if(user.cart.length ===0){
            return res.status(400).json({message:"Cart is empty!"})
        }
        let totalAmount = 0;
        const allProducts = user.cart.map(x => {
            totalAmount += x.price * x.count;
            return {
                pid: x.pid,
                quantity: x.count
            };
        });

        const newOrder = new Order({
            username: user.username,
            allProducts: allProducts,
            amount: totalAmount,
            address: req.body.address,
            status:"Not processed"
        });
        await newOrder.save();

        user.cart = [] // empty the cart 
        user.orders.push(newOrder._id);
        await user.save();

return res.status(200).json({message:"order placed successfully"})

    }
    catch(e){
        return res.status(500).json({message:"Internal Server error"})
    }
}


// get order status
const orderStatus = async(req,res)=>{
    try{
      
        const order = await Order.findOne({_id:req.body.orderid})
        if(!order){
            return res.status(404).json({message:"order not found"})
            
        }
        if(order.username!= req.user.username){
            return res.status(404).json({message:"user not found"})
        }
        const status = order.status;
        return res.status(200).json({message:"order status",status:status})
    }
    catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }
}


// update order status

const updateOrderStatus = async(req,res)=>{
    try{
      
        const order = await Order.findOne({_id:req.body.orderid})
        if(!order){
            return res.status(404).json({message:"order not found"})
            
        }
       
        order.status = req.body.status;
        await order.save();
        return res.status(200).json({message:"order status",order:order})
    }
    catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }
}

// get all orders
const getAllOrders = async(req,res)=>{
    try{
const orders = await Order.find();
return res.status(200).json({orders:orders, message:"all order details"})
    }
    catch(e){
        return res.status(500).json({message:"Internal server error"})
    }
}

module.exports={getAllOrders,updateOrderStatus,placeOrder,orderStatus}