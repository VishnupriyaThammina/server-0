const Wislist  = require('../models/Wislist')
const Product = require('../models/Product')
const User = require('../models/User')

const addWislist = async(req,res)=>{
    try{
// if product present
const product = await Product.findOne({pid:req.body.pid});
if(!product){
    console.log("product not present")
    return res.status(409).json({message:"product invalid"})
}
// one more condition that checks if this product item it is cart
// create a Wislist item with an id 
const WislistItem = new Wislist({
    pid: req.body.pid,
    count: req.body.count,
    price: product.price
})
// push this new item's to user Wislist array
await WislistItem.save();
const user = await User.findOneAndUpdate(
   {username: req.username_d},
    {$push:{wislist:WislistItem._id}},
    {new:true}
).populate('wislist')
// on using populate
// all of the ids that are pushed in Wislist rather than just storing the ids
// entire Wislist document of the id is stored 
return res.status(200).json({user:user,message:"item added to Wislist"})
    }catch(error){
        console.log('internal server error incurred while adding a User')

        return res.status(500).json({message:'Internal Server Error!!',error:error.message})
    }
}

const updateCountWislistItem = async(req,res)=>{
    try{
      const WislistItem = await Wislist.findOne({_id:req.body.Wislistid});
      if(!WislistItem){
       return res.status(409).json({message:"item not in Wislist"})
        }
      const updatedWislistItem = await Wislist.findOneAndUpdate(
        {_id:WislistItem._id},
        {count:req.body.count},
        {new:true}
      )
 // Find the user and populate the updated Wislist
 const user = await User.findOne({ username: req.username_d }).populate('wislist');
 return res.status(200).json({ user: user, message: "Wislist item count updated" });
       }catch(error){
                console.log('internal server error incurred while adding a User')
        
                return res.status(500).json({message:'Internal Server Error!!',error:error.message})
            }  
}

const deleteWislistItem = async(req,res)=>{
    try{
      const WislistItem = await Wislist.findOne({_id:req.body.Wislistid});
      if(!WislistItem){
       return res.status(200).json({message:"item not in Wislist"})
        }
      const deleteWislistItem = await Wislist.findByIdAndDelete(  {_id:WislistItem._id}, )
 // Find the user and populate the updated Wislist
 const user = await User.findOne({ username: req.username_d }).populate('wislist');
 return res.status(200).json({ user: user, message: "Wislist item count updated" });
       }catch(error){
                console.log('internal server error incurred while adding a User')
        
                return res.status(500).json({message:'Internal Server Error!!',error:error.message})
            }  
}

module.exports={addWislist,updateCountWislistItem,deleteWislistItem}