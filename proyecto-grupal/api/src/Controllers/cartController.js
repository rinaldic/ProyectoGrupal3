const cartServices = require("../Services/cartService");

const saveUserCart = async (req, res, next) => {
  try {
    const createdCart = await cartServices.saveUserCart(req.body);
    res.send(createdCart);
  } catch (error) {
    next(error);
  }
};

const getUserCart = async (req, res, next) => {
  const { user } = req.query;
  console.log(user)
  try {
    const cartFound = await cartServices.getUserCart(user);
    res.send(cartFound);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveUserCart,
  getUserCart,
};
