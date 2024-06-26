const User = require('../models/User.js');

// a reusable add user function
const AddUser = async(req,res)=>{
    try{
        // Creating the User 
        const existsUser = await User.findOne({username:req.username_d})
        if(existsUser ){
            console.log('User already exists')
           return 0;
            // 409 represents conflict in current request body User id 
        }
        
        const newUser = new User({
            username: req.body.username,
            email : req.body.email,
            password : req.body.password,
            role : req.body.role,

            
        })

        
        // saving priduct to DB
        await newUser.save();
        console.log('User added successfully')
        // sending response back and ending execution of the function
       return newUser;

    }catch(error){
        console.log('internal server error incurred while adding a User')

        return 0;
    }
}


// fetch all Users
const AllUsers = async(req,res)=>{
    try{

      
        const Users = await User.find({}, { email: 1, username: 1,role:1,_id:0 });
        return res.status(200).json({Users:Users,message:"Fetched all Users information"})
    }catch(err){
        console.log('internal server error incurred while adding a User')
        return res.status(500).json({message:'Internal Server Error!!',error:err.message})
    }
}


// edit User 
// a User id along with the edited contents will be sent
// we will just edit the value

const EditUser = async(req,res)=>{
    try{
// 1st we have to check if the prod id valid
// if so
// just update
const existsUser = await User.findOne({username:req.username_d})
if(!existsUser){
    console.log('User is not present ')
   return res.status(409).json({message:"User is not present in database"})
    // 409 represents conflict in current request body User id 
}

const username = req.username_d;
// as the User id exists 
const updateFields = {};
const checkpassword = await User.findOne({username:username})// filter object is expected 
if(checkpassword.password==req.body.password){

    if(req.body.newusername){
        updateFields.username=req.body.newusername;
    }
    if(req.body.newemail){
        updateFields.email=req.body.newemail;
    }
    
    if (req.body.newpassword) {
    
        updateFields.password = req.body.newpassword;
    }

    
const updatedUser = await User.findOneAndUpdate({username:username},// filter object is expected 
    updateFields, // feilds to be updated
    {new:true} // return the updated document
)

return res.status(200).json({updatedUser:updatedUser,message:"Update succesfull"})
}
return res.status(400).json({message:"Invalid credentials"})

    }catch(err){
        console.log('internal server error incurred while updating a User')
        return res.status(500).json({message:'Internal Server Error!!',error:err.message})
    }
}

// delete User 
const DeleteUser = async(req,res)=>{
    try{
// 1st we have to check if the prod id valid
// if so
// just update
const existsUser = await User.findOne({username:req.username_d})
if(!existsUser){
    console.log('User is not present ')
   return res.status(409).json({message:"User is not present in database"})
    // 409 represents conflict in current request body User id 
}
if(existsUser.password==req.body.password){
    await User.findOneAndDelete({username:req.username_d})
    console.log('User deleted from warehouse')
    return res.status(200).json({message:"User successfully deleted"})
}
return res.status(400).json({message:"Invalid credentials"})


    }
catch(err){
    console.log('internal server error incurred while updating a User')
    return res.status(500).json({message:'Internal Server Error!!',error:err.message})
}
}


const CheckUser = async(req,res)=>{
  try{

    const user = await User.findOne({username:req.username_d})
    if(!user){
        return res.status(409).json({message:"User not present!"})
    }
  return res.status(200).json({message:"User is present in DB",uid:req.username_d,urole:req.role_d})
}
catch(err){
    return res.status(500).json({message:"Internal Server Error"})
}
}
module.exports= {AddUser,AllUsers, EditUser,DeleteUser, CheckUser}