const Product = require("../models/Product.js");
// import your mongoose product entire schema
// to which i save data

// step 1 making a function to save the data
// coming from a http request and sending a response back
// controller for adding the product is done
// now we need route
// and body parsing
const AddProduct = async (req, res) => {
  try {
    // Creating the product
    const existsProduct = await Product.findOne({ pid: req.body.pid });
    if (existsProduct) {
      console.log("Product already exists");
      return res
        .status(409)
        .json({ message: "product all ready exists in database" });
      // 409 represents conflict in current request body product id
    }
    const product = new Product({
      pid: req.body.pid,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      thumbnail: req.body.thumbnail,
      category: req.body.category,
      stock: req.body.stock,
      images: req.body.images, // array of images
    });

    // saving priduct to DB
    await product.save();
    console.log("Product added successfully");
    // sending response back and ending execution of the function
    return res
      .status(200)
      .json({
        message: "successfully saved data to database",
        product: product,
      });
  } catch (error) {
    console.log("internal server error incurred while adding a product");

    return res
      .status(500)
      .json({ message: "Internal Server Error!!", error: error.message });
  }
};
// fetch all products
const AllProducts = async (req, res) => {
  try {
    const products = await Product.find(
      {},
      { name: 1, pid: 1, description: 1, images: 1, thumbnail: 1, _id: 0 }
    );
    res
      .status(200)
      .json({
        products: products,
        message: "Fetched all products information",
      });
  } catch (err) {
    console.log("internal server error incurred while adding a product");
    return res
      .status(500)
      .json({ message: "Internal Server Error!!", error: err.message });
  }
};

// edit product
// a product id along with the edited contents will be sent
// we will just edit the value

const EditProduct = async (req, res) => {
  try {
    // 1st we have to check if the prod id valid
    // if so
    // just update
    const existsProduct = await Product.findOne({ pid: req.body.pid });
    if (!existsProduct) {
      console.log("Product is not present ");
      return res
        .status(409)
        .json({ message: "product is not present in database" });
      // 409 represents conflict in current request body product id
    }

    const pid = req.body.pid;
    // as the product id exists
    const updateFields = {};
    if (req.body.name) {
      updateFields.name = req.body.name;
    }
    if (req.body.description) {
      updateFields.description = req.body.description;
    }
    if (req.body.price) {
      updateFields.price = req.body.price;
    }
    if (req.body.thumbnail) {
      updateFields.thumbnail = req.body.thumbnail;
    }
    if (req.body.images) {
      updateFields.images = req.body.images;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { pid: pid }, // filter object is expected
      updateFields, // feilds to be updated
      { new: true } // return the updated document
    );

    res
      .status(200)
      .json({ updatedProduct: updatedProduct, message: "Update succesfull" });
  } catch (err) {
    console.log("internal server error incurred while updating a product");
    return res
      .status(500)
      .json({ message: "Internal Server Error!!", error: err.message });
  }
};

// delete product
const DeleteProduct = async (req, res) => {
  try {
    // 1st we have to check if the prod id valid
    // if so
    // just update
    const existsProduct = await Product.findOne({ pid: req.body.pid });
    if (!existsProduct) {
      console.log("Product is not present ");
      return res
        .status(409)
        .json({ message: "product is not present in database" });
      // 409 represents conflict in current request body product id
    }
    await Product.findOneAndDelete({ pid: req.body.pid });
    console.log("Product deleted from warehouse");
    return res.status(200).json({ message: "Product successfully deleted" });
  } catch (err) {
    console.log("internal server error incurred while updating a product");
    return res
      .status(500)
      .json({ message: "Internal Server Error!!", error: err.message });
  }
};
module.exports = { AddProduct, AllProducts, EditProduct, DeleteProduct };
