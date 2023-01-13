const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM("in process", "cancelled", "confirmed"),
      allowNull: false,
      defaultValue: "in process",
    },
    shippingStatus: {
      type: DataTypes.ENUM("in process", "sent"),
      allowNull: false,
      defaultValue: "in process",
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.REAL,
    },
    idMp: {
      type: DataTypes.STRING,
    },
    shippingCost: {
      type: DataTypes.STRING,
    },
    shippingAddress: {
      type: DataTypes.STRING,
    },
    shippingZip: {
      type: DataTypes.STRING,
    },
    shippingCity: {
      type: DataTypes.STRING,
    },
    shippingState: {
      type: DataTypes.STRING,
    },
  });
};
