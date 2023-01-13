const { DataTypes } = require("sequelize");

module.exports = OrderDetailFactory = (sequelize) => {
  return sequelize.define(
    "WishList",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      wishListItems: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
    },
    {
      timestamps: false,
    }
  );
};
