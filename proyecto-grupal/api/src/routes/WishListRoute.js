const { Router } = require("express");
const router = Router();

const { saveUserWishList,
    getUserWishList, } = require('../Controllers/wishListController');


router.get("/", getUserWishList);
router.post("/", saveUserWishList);

module.exports = router;