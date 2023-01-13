const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      rating: {
        type: DataTypes.REAL,
        allowNull: false,
        defaultValue: 0,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        },
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      public_id: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
