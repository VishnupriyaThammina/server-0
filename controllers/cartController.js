const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

const addCart = async (req, res) => {
  try {
    // if product present
    const product = await Product.findOne({ pid: req.body.pid });
    if (!product) {
      console.log("product not present");
      return res.status(409).json({ message: "product invalid" });
    }
    // create a cart item with an id
    const checkUser = await User.findOne({ username: req.username_d }).populate(
      "cart"
    );
    // as now we have the details of the user

    const existingProduct = checkUser.cart.find(
      (item) => item.pid === req.body.pid
    );
    if (existingProduct) {
      await Cart.findByIdAndUpdate(existingProduct._id, {
        $inc: { count: req.body.count },
      });
    } else {
      const cartItem = new Cart({
        pid: req.body.pid,
        count: req.body.count,
        price: product.price,
      });
      // push this new item's to user cart array
      await cartItem.save();
      const user = await User.findOneAndUpdate(
        { username: req.username_d },
        { $push: { cart: cartItem._id } },
        { new: true }
      ).populate("cart");
    }
    // on using populate
    // all of the ids that are pushed in cart rather than just storing the ids
    // entire cart document of the id is stored
    const updatedUser = await User.findOne({
      username: req.username_d,
    }).populate("cart");

    return res
      .status(200)
      .json({ user: updatedUser, message: "item added to cart" });
  } catch (error) {
    console.log("internal server error incurred while adding a User");

    return res
      .status(500)
      .json({ message: "Internal Server Error!!", error: error.message });
  }
};

const IncrementCartItem = async (req, res) => {
  try {
    // if product present
    const product = await Product.findOne({ pid: req.body.pid });
    if (!product) {
      console.log("product not present");
      return res.status(409).json({ message: "product invalid" });
    }
    // create a cart item with an id
    const checkUser = await User.findOne({ username: req.username_d }).populate(
      "cart"
    );
    // as now we have the details of the user

    const existingProduct = checkUser.cart.find(
      (item) => item.pid === req.body.pid
    );
    if (existingProduct) {
      await Cart.findByIdAndUpdate(existingProduct._id, { $inc: { count: 1 } });
    } else {
      const cartItem = new Cart({
        pid: req.body.pid,
        count: req.body.count,
        price: product.price,
      });
      // push this new item's to user cart array
      await cartItem.save();
      const user = await User.findOneAndUpdate(
        { username: req.username_d },
        { $push: { cart: cartItem._id } },
        { new: true }
      ).populate("cart");
    }
    // on using populate
    // all of the ids that are pushed in cart rather than just storing the ids
    // entire cart document of the id is stored
    const updatedUser = await User.findOne({
      username: req.username_d,
    }).populate("cart");

    return res
      .status(200)
      .json({ user: updatedUser, message: "item added to cart" });
  } catch (error) {
    console.log("internal server error incurred while adding a User");

    return res
      .status(500)
      .json({ message: "Internal Server Error!!", error: error.message });
  }
};

const DecrementCartItem = async (req, res) => {
  try {
    // if product present
    const product = await Product.findOne({ pid: req.body.pid });
    if (!product) {
      console.log("product not present");
      return res.status(409).json({ message: "product invalid" });
    }
    // create a cart item with an id
    const checkUser = await User.findOne({ username: req.username_d }).populate(
      "cart"
    );
    // as now we have the details of the user

    const existingProduct = checkUser.cart.find(
      (item) => item.pid === req.body.pid
    );

    if (!existingProduct) {
      return res.status(400).json({ message: "product doesnt exist" });
    }

    if (existingProduct.count > 1) {
      await Cart.findByIdAndUpdate(existingProduct._id, {
        $inc: { count: -1 },
      });
    } else {
      // If the count is 1, remove the item from the cart
      await Cart.findByIdAndRemove(existingProduct._id);
      checkUser.cart = checkUser.cart.filter(
        (item) => item._id.toString() !== existingProduct._id.toString()
      );
      await checkUser.save();
    }
    // on using populate
    // all of the ids that are pushed in cart rather than just storing the ids
    // entire cart document of the id is stored
    const updatedUser = await User.findOne({
      username: req.username_d,
    }).populate("cart");

    return res
      .status(200)
      .json({ user: updatedUser, message: "item added to cart" });
  } catch (error) {
    console.log("internal server error incurred while adding a User");

    return res
      .status(500)
      .json({ message: "Internal Server Error!!", error: error.message });
  }
};

// we dont need this
const updateCountCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({ _id: req.body.cartid });
    if (!cartItem) {
      return res.status(409).json({ message: "item not in cart" });
    }
    const updatedCartItem = await Cart.findOneAndUpdate(
      { _id: cartItem._id },
      { count: req.body.count },
      { new: true }
    );
    // Find the user and populate the updated cart
    const user = await User.findOne({ username: req.username_d }).populate(
      "cart"
    );
    return res
      .status(200)
      .json({ user: user, message: "Cart item count updated" });
  } catch (error) {
    console.log("internal server error incurred while adding a User");

    return res
      .status(500)
      .json({ message: "Internal Server Error!!", error: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({ _id: req.body.cartid });
    if (!cartItem) {
      return res.status(400).json({ message: "item not in cart" });
    }

    await Cart.findByIdAndDelete({ _id: cartItem._id });

    // Find the user and populate the updated cart
    const user = await User.findOne({ username: req.username_d }).populate(
      "cart"
    );
    return res
      .status(200)
      .json({ user: user, message: "Cart item count updated" });
  } catch (error) {
    console.log("internal server error incurred while adding a User");

    return res
      .status(500)
      .json({ message: "Internal Server Error!!", error: error.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.username_d }).populate(
      "cart"
    );
    const products = [];
    for (const i of user.cart) {
      const product = await Product.findOne({ pid: i.pid });
      if (product) {
        products.push(product);
      }
    }

    return res
      .status(200)
      .json({
        products: products,
        message: "Cart items retrieved successfully",
      });
  } catch (error) {
    console.error(
      "Internal server error incurred while retrieving cart items:",
      error
    );
    return res
      .status(500)
      .json({ message: "Internal Server Error!!", error: error.message });
  }
};

module.exports = { addCart, updateCountCartItem, deleteCartItem, getCartItems };
