import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Added to cart successfully",
    });
  } catch (error) {
    console.log("Some error occured");
    res.json({
      success: false,
      message: "Added to cart is failed",
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Removed from cart successfully",
    });
  } catch (error) {
    console.log("Some error occured");
    res.json({
      success: false,
      message: "Removed from cart is failed",
    });
  }
};

const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({
      success: true,
      cartData
    });
  } catch (error) {
    console.log("Some error occured");
    res.json({
      success: false,
      message: "Get card data is failed",
    });
  }
};

export { addToCart, removeFromCart, getCart };
