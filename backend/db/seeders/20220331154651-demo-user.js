'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',[
      {
        first_name: 'Demo-lition',
        last_name: 'Demo',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        zip_code: 94304
      },
      {
        first_name: 'Demo-lition2',
        last_name: 'Demo2',
        email: 'user1@user.io',
        hashedPassword: bcrypt.hashSync('password2'),
        zip_code: 94305
      },
      {
        first_name: 'Demo-lition3',
        last_name: 'Demo3',
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password3'),
        zip_code: 94306
      }
    ],{});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.op;
    return queryInterface.bulkDelete('Users',{
      email: {[Op.in]: ['demo@user.io','user1@user.io','user2@user.io']}
    },{});
    //return queryInterface.bulkDelete('Users', null, {});
  }
};
