const Product = require('../models/Product.js');
// import your mongoose product entire schema
// to which i save data


// step 1 making a function to save the data 
// coming from a http request and sending a response back

const AddProduct = async(req,res)=>{
    try{
        const product = new Product({
            name : req.body.name,
            price : req.body.price,
            description: req.body.description,
            images: req.body.images // array of images 
        })

    }catch(error){
        res.status(500).json({message:'Internal Server Error!!'})
    }
}