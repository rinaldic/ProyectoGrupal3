const wishListServices = require("../Services/wishListService");

const saveUserWishList = async (req, res, next) => {
  try {
    console.log('Controlador saveUserWishList. Body que recibe: ', req.body);
    const createdWishList = await wishListServices.saveUserWishList(req.body);
    res.send(createdWishList);
  } catch (error) {
    next(error);
  }
};

const getUserWishList = async (req, res, next) => {
    console.log('Controlador getUserWishList. Query que recibe: ', req.query);
    const { user_id } = req.query;
    console.log(user_id);
    try {
        const wishListFound = await wishListServices.getUserWishList(user_id);
        res.send(wishListFound);
    } catch (error) {
        next(error);
    }
};

module.exports = {
  saveUserWishList,
  getUserWishList,
};
