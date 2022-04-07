'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    rating: DataTypes.INTEGER,
    contents: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    businessId: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, {foreignKey: "userId"});
    Review.belongsTo(models.Business, {foreignKey: "businessId"});
  };
  return Review;
};