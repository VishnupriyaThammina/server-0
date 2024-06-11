const Cart  = require('../models/Cart')
const Product = require('../models/Product')
const User = require('../models/User')

const addCart = async(req,res)=>{
    try{
// if product present
const product = await Product.findOne({pid:req.body.pid});
if(!product){
    console.log("product not present")
    return res.status(409).json({message:"product invalid"})
}
// create a cart item with an id 
const checkUser = await User.findOne({username:req.body.username})
// as now we have the details of the user

const cartItem = new Cart({
    pid: req.body.pid,
    count: req.body.count,
    price: product.price
})
// push this new item's to user cart array
await cartItem.save();
const user = await User.findOneAndUpdate(
   {username: req.body.username},
    {$push:{cart:cartItem._id}},
    {new:true}
).populate('cart')
// on using populate
// all of the ids that are pushed in cart rather than just storing the ids
// entire cart document of the id is stored 
return res.status(200).json({user:user,message:"item added to cart"})
    }catch(error){
        console.log('internal server error incurred while adding a User')

        return res.status(500).json({message:'Internal Server Error!!',error:error.message})
    }
}

const updateCountCartItem = async(req,res)=>{
    try{
      const cartItem = await Cart.findOne({_id:req.body.cartid});
      if(!cartItem){
       return res.status(409).json({message:"item not in cart"})
        }
      const updatedCartItem = await Cart.findOneAndUpdate(
        {_id:cartItem._id},
        {count:req.body.count},
        {new:true}
      )
 // Find the user and populate the updated cart
 const user = await User.findOne({ username: req.body.username }).populate('cart');
 return res.status(200).json({ user: user, message: "Cart item count updated" });
       }catch(error){
                console.log('internal server error incurred while adding a User')
        
                return res.status(500).json({message:'Internal Server Error!!',error:error.message})
            }  
}

const deleteCartItem = async(req,res)=>{
    try{
      const cartItem = await Cart.findOne({_id:req.body.cartid});
      if(!cartItem){
       return res.status(200).json({message:"item not in cart"})
        }
      const deleteCartItem = await Cart.findByIdAndDelete(  {_id:cartItem._id}, )
 // Find the user and populate the updated cart
 const user = await User.findOne({ username: req.body.username }).populate('cart');
 return res.status(200).json({ user: user, message: "Cart item count updated" });
       }catch(error){
                console.log('internal server error incurred while adding a User')
        
                return res.status(500).json({message:'Internal Server Error!!',error:error.message})
            }  
}

module.exports={addCart,updateCountCartItem,deleteCartItem}