const { WishList } = require("../db.js");

const saveUserWishList = async (wishList) => {
  const { user_id } = wishList;
  console.log('Servicio saveUserWishList. wishList que recibe: ', wishList);
  const wishListFound = await WishList.findOne({
    where: {
      user_id: user_id,
    },
  });

  let newWishList;
  if (wishListFound) {
    newWishList = await WishList.update(wishList, {
      where: {
        user_id: user_id,
      },
    });
  } else {
    newWishList = await WishList.create(wishList);
  }
  console.log('newWishList del servicio saveUserWishList: ', newWishList);
  return newWishList.dataValues? newWishList.dataValues : `User's ${user_id} wishlist updated!`;
};

const getUserWishList = (user) => {
    console.log('Servicio getUserWishList. user que recibe: ', user);
    const userWishList = WishList.findOne({ where: { user_id: user } });
    return userWishList;
};

module.exports = {
  saveUserWishList,
  getUserWishList,
};
