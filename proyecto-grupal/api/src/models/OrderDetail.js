const { DataTypes } = require("sequelize");

module.exports = OrderDetailFactory = (sequelize) => {
  return sequelize.define(
    "OrderDetail",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false
      },


    },
    {
      timestamps: true,
    }
  );
};
