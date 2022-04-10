'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews',[
    {
      rating: 5,
      contents: 'This company is so awesome. They are offering free lunch for their employees. Leading technology company',
      userId: 3,
      businessId: 1
    },
    {
      rating: 5,
      contents: 'I will definitely visit this place again. The food is awesome and the atmosphere was great. I love this place.',
      userId: 1,
      businessId: 2
    },
    {
      rating: 1,
      contents: 'They cancelled my appointment without noticing in advance. I waited for 2 hours there but they didnt show this.up.',
      userId: 2,
      businessId: 3
    },
    ],{});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
