const { Order, User, OrderDetail, Product } = require("../db.js");
const { deliverMail } = require("./nodemailerController");

const ordersServices = require("../Services/orderService");

const createNewOrder = async (req, res, next) => {
  try {
    let createdOrder;

    const userId = req.body.id;
    //console.log(req.body);

    createdOrder = await ordersServices.createNewOrder(
      userId,
      req.body.price,
      req.body.quantity,
      req.body.idMp
    );

    //console.log(createdOrder);

    for (let i = 0; i < req.body.pedido.length; i++) {
      const prodId = await Product.findAll({
        where: {
          title: req.body.pedido[i].title,
        },
      });

      Product.update(
        {
          stock: prodId[0].dataValues.stock - req.body.pedido[i].quantity,
        },
        {
          where: {
            id: prodId[0].dataValues.id,
          },
        }
      );

      const detailOrderCreate = await OrderDetail.create({
        quantity: req.body.pedido[i].quantity,
        price: req.body.price,
        productId: prodId[0].dataValues.id,
        orderId: createdOrder.dataValues.id,
      });
    }

    if (createdOrder) {
      //console.log(createdOrder);
      res.status(201).send(createdOrder);
    } else {
      res.status(404).send("Error creating order!");
    }
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await ordersServices.getAllOrders();

    if (allOrders) {
      res.status(201).send(allOrders);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ordById = await ordersServices.getOrderById(id);
    if (ordById) {
      res.status(200).send(ordById);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await ordersServices.getOrders(id);
    !order ? res.status(404).send("There are no orders...") : null;

    for (let i = 0; i < order.dataValues.OrderDetails.length; i++) {
      const prodId = await Product.findAll({
        where: {
          title: req.body.pedido[i].title,
        },
      });

      Product.update(
        {
          stock:
            prodId[0].dataValues.stock +
            order.dataValues.OrderDetails[i].quantity,
        },
        {
          where: {
            id: order.dataValues.OrderDetails[i].productId,
          },
        }
      );
    }

    order.dataValues.OrderDetails;

    const updated = await Order.update(
      { status: "cancelled" },
      {
        where: {
          id: id,
        },
      }
    );

    let createdOrder;

    const userId = req.body.id;

    createdOrder = await ordersServices.createNewOrder(
      id,
      userId,
      req.body.price,
      req.body.quantity
    );

    for (let i = 0; i < req.body.pedido.length; i++) {
      const prodId = await Product.findAll({
        where: {
          title: req.body.pedido[i].title,
        },
      });

      Product.update(
        {
          stock: prodId[0].dataValues.stock - req.body.pedido[i].quantity,
        },
        {
          where: {
            id: prodId[0].dataValues.id,
          },
        }
      );

      const detailOrderCreate = await OrderDetail.create({
        quantity: req.body.pedido[i].quantity,
        price: req.body.price,
        productId: prodId[0].dataValues.id,
        orderId: createdOrder.dataValues.id,
      });
    }

    if (createdOrder) {
      const listOrder = await ordersServices.getAllOrders();
      return res.status(200).send(listOrder);
    }
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  //console.log("entro");
  const ordId = await Order.findAll({
    where: {
      idMp: id,
    },
    attibutes: ["id"],
  });
  //console.log(req.body);
  //console.log(ordId);
  try {
    const ordById = await ordersServices.orderUpdate(
      ordId[0].dataValues.id,
      req.body
    );
    if (ordById) {
      res.status(200).send(ordById);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await ordersServices.getOrders(id);
    !order ? res.status(404).send("There are no orders...") : null;

    const destroy = await ordersServices.deleteOrder(id);
    if (destroy) {
      const newlist = await ordersServices.getAllOrders();
      res.status(200).send(newlist);
    } else {
      res.status(404).send("Error");
    }
  } catch (error) {
    next(error);
  }
};

const confirmOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ where: { id: id } });
    if (order) {
      const updated = await Order.update(
        { status: "confirmed" },
        { where: { id: id } }
      );
      if (updated[0] === 1) {
        res.status(200).json({ msg: `New Order status: Confirmed` });
      }
    } else {
      res.status(400).json({ msg: "Order not found in the DB" });
    }
  } catch (error) {
    next(error);
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.session.userId;

    const orders = await ordersService.findOrders(productId);

    const userOrders = [];
    for (let i = 0; i < orders.length; i++) {
      const order = await ordersService.getOrdersById(orders[i].userId);
      userOrders.push(order);
    }

    //Envío las órdenes encontradas
    res.send({ orders: userOrders });
  } catch (err) {
    res.send({ error: err });
  }
};

const notificationOrder = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    var emailTemplate = `Hello ${req.body.name}, \n
      thank you for your order! \n
      Your full order details are available at http://localhost:3000/orders/user \n
      Thank you!`;
    if (user) {
      let subject = "CloudyBuy";
      let text = "your payment was approved";
      let email = user.email;
      let html = emailTemplate;

      let result = await deliverMail(email, subject, text, html);
      //console.log(result);
      if (result) {
        res.status(200).send({ mail: email });
      } else {
        res.status(400).send({ msg: "Something failed" });
      }
    } else {
      res.status(400).json({ msg: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

const swapShipping = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ where: { id: id } });
    const shippingType =
      order.shippingStatus === "in process"
        ? (order.shippingStatus = "sent")
        : "in process";
        console.log(shippingType)
    if (order) {
      const updated = await Order.update(
        { shippingStatus: shippingType },
        { where: { id: req.params.id } }
      );
      if (updated[0] === 1) {
        //userStatus = !user.isAdmin;
        res.status(200).json(updated);
      }
    } else {
      res.status(400).json({ msg: "User not found in the DB" });
    }
  } catch (error) {
    next(error);
  }
};

const notShippingOrder = async (req, res, next) => {
  try {
    
    const order = await Order.findOne({ where: { id: req.body.id } })
    
    const user = await User.findOne({ where: { id: order.userId } });
    
    function random10DigitNumber() {
      var number = Math.floor(Math.random() * 100000000000);
      var str = number.toString();
      return str.slice(0,10);
    }
    
    var emailTemplate = `Hello ${user.name}, \n
      your order number: ${req.body.id} has been shipped! \n
      your tracking code is ${random10DigitNumber()} \n
      Thank you!`;
    if (user) {
      let subject = "CloudyBuy";
      let text = " your order has been shipped";
      let email = user.email;
      let html = emailTemplate;

      let result = await deliverMail(email, subject, text, html);
      //console.log(result);
      if (result) {
        res.status(200).send({ mail: email });
      } else {
        res.status(400).send({ msg: "Something failed" });
      }
    } else {
      res.status(400).json({ msg: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

const getOrdById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ordById = await ordersServices.getOrdById(id);
    if (ordById) {
      res.status(200).send(ordById);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOrders,
  createNewOrder,
  updateOrder,
  updateStatus,
  getOrderById,
  deleteOrder,
  confirmOrder,
  swapShipping,
  //orderStatus,
  getOrdersByUser,
  notificationOrder,
  notShippingOrder,
  getOrdById
};
