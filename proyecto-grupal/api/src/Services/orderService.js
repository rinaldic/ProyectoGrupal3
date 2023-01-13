const { Order, User, OrderDetail, Product } = require("../db.js");

const createNewOrder = async (userId, amount, quantity,idMp) => {
  try {
    const findUser = await User.findByPk(userId);

    const newOrder = await Order.create({
      price: amount,
      userId: userId,
      quantity: quantity,
      idMp: idMp,
    });

    return newOrder;
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async () => {
  const allOrders = await Order.findAll({
    include: [{ model: OrderDetail, include: [Product] }],
  });
  return allOrders;
};

const getOrderById = async (id) => {
  const OrderId = await User.findByPk(id, {
    include: [{ model: Order, include: [{ model: OrderDetail, include: [Product]}]}],
  });
  return OrderId;
};

const getOrders = async (id) => {
  const OrderId = await Order.findByPk(id, {
    include: [OrderDetail],
  });
  return OrderId;
};

const findOrders = async (order) => {
  for (let i = 0; i < order.length; i++) {
    const prodId = await Product.findAll({
      where: {
        title: order[i].name,
      },
    });

    return find;
  }
};

const orderUpdate = async (id, body) => {
  const ordUpdate = await Order.update(body, {
    where: {
      "id": id,
    },
  });

  return ordUpdate;
};

const deleteOrder = async (id) => {
  const ordUpdate = await Order.update(
    { status: "cancelled" },
    {
      where: {
        id: id,
      },
    }
  );

  return ordUpdate;
};

const getOrdById = async (id) => {
  const OrderId = await Order.findByPk(id, {
    include: [{ model: OrderDetail, include: [Product]}],
  });
  return OrderId;
};

module.exports = {
  createNewOrder,
  getAllOrders,
  getOrderById,
  orderUpdate,
  findOrders,
  getOrders,
  deleteOrder,
  getOrdById
};
