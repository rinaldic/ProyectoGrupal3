const { Router } = require('express');
const router = Router();
const {notificationOrder,notShippingOrder } = require('../Controllers/orderController');




//localhost:3001/product

router.post("/",notificationOrder)
router.post("/shipping/",notShippingOrder)


module.exports = router;