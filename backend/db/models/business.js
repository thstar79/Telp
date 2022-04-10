'use strict';
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip_code: DataTypes.INTEGER,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    userId: DataTypes.INTEGER,
    operationId: DataTypes.INTEGER
  }, {});

  Business.signup = async function({name,description,image,address,city,state,zip_code,lat,lng,userId}) {
    const business = await Business.create({
      name,
      description,
      image,
      address,
      city,
      state,
      zip_code,
      //lat,
      //lng,
      userId
    });
    return await Business.findByPk(business.id);
  }
  

  Business.associate = function(models) {
    Business.belongsTo(models.User, {foreignKey: "userId"});
    Business.hasMany(models.Review,{foreignKey: "businessId",hooks: true,onDelete: "cascade"});
  };
  return Business;
};