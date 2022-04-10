'use strict';

const bcrypt = require("bcryptjs/dist/bcrypt");
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      isNotEmail(value){
        if(Validator.isEmail(value)){
          throw new Error('Cannot be an email');
        }
      }
    },
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3,256]
      },
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60,60]
      }
    }, 
    zip_code: DataTypes.INTEGER
  }, 
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword','email','createdAt','updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: {exclude: ['hashedPassword']}
      },
      loginUser: {
        attributes: {}
      }
    }
  });

  User.prototype.toSafeObject = function() {
    const {id,first_name, email} = this;
    return {id, first_name, email};
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  }

  User.login = async function ({credential, password}) {
    const {Op} = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          first_name: credential,
          email: credential
        }
      }
    });
    if(user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function({first_name,last_name, email, password,zip_code}) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      first_name,
      last_name,
      email,
      hashedPassword,
      zip_code
    });
    return await User.scope('currentUser').findByPk(user.id);
  }
  
  User.associate = function(models) {
    User.hasMany(models.Review,{foreignKey:"userId",hooks: true,onDelete: "cascade"});
    User.hasMany(models.Business, {foreignKey:"userId",hooks: true,onDelete: "cascade"});
  };

  

  return User;
};