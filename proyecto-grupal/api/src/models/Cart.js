const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "cart",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      cartTotalQuantity: {
        type: DataTypes.INTEGER,
      },
      cartItems: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
      cartTotalAmount: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: false,
    }
  );
};
