const { AddUser } = require("../controllers/userController");
const User = require('../models/User')
const { gen } = require("../middlewares/jwt");
const  {AddBlackList} = require('../controllers/blacklistedTokenController')

// sign up function, uses [AddUser] function from user controllers and jwt from middlewares
const signUp = async (req, res) => {
  try {
    if(req.body.role!='user'){
      return res.status(400).json({message:"user can't be created"})
    }
    const useradd = await AddUser(req, res);
    if (useradd==0) {
      return res.status(409).json({ message: "error in adding the user" });
    }
    const jwt = await gen(req);

  
    return res
      .status(200)
      .json({
        message: "Successfully signed up",
        token: jwt
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error!!", error: err.message });
  }
};


// login
const login = async(req,res)=>{
try{
    if(!req.body.username || !req.body.password){
        return res.status(400).json({message:"Incomplete credentials!"})
    }
    const user = await User.findOne({username:req.body.username})
    if(!user){
        return res.status(401).json({message:"User not valid!"})
    }

    if( user.password!==req.body.password ){
        return res.status(401).json({message:"wrong credentials valid!"})

    }
    const jwt = await gen(req);

    return res.status(200).json({  message: "Successfully logged in", token: jwt});
}catch(e){
    return res.status(500).json({message:"Internal server error"})
}
}

const adminLogin = async(req,res)=>{
  try{
      if(!req.body.username || !req.body.password){
          return res.status(400).json({message:"Incomplete credentials!"})
      }
      const user = await User.findOne({username:req.body.username})
      if(!user){
          return res.status(401).json({message:"User not valid!"})
      }
  
      if( user.password!==req.body.password && user.role !== 'admin' ){
          return res.status(401).json({message:"wrong credentials valid!"})
  
      }
      const jwt = await gen(req);
  
      return res.status(200).json({  message: "Successfully logged in", token: jwt});
  }catch(e){
      return res.status(500).json({message:"Internal server error"})
  }
  }

// logout

const logout = async(req,res)=>{
    try{

const blacklist = await AddBlackList(req,res);
if(blacklist!=1){
    return res.status(409).json({message:"Error in token black listing"})
}
return res.status(200).json({message:"Logged out"})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({message:"Internal server error"})

    }
}



module.exports = { signUp,login, logout };
