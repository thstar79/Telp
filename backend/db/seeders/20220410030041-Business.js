'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Businesses',[
      {
        name: 'Google.LLC',
        description: 'Google LLC is an American multinational technology company that focuses on artificial intelligence, search engine, online advertising, cloud computing, computer software, quantum computing, e-commerce, and consumer electronics',
        image: 'https://static.timesofisrael.com/www/uploads/2015/06/shutterstock_227705980-e1435204366234-1024x640.jpg',
        address: "1600 Amphitheatre Parkway",
        city:"Mountain View",
        state:"CA",
        zip_code:94305,
        userId: 1,
      },
      {
        name: 'Pisces Poke & Ramen',
        description: '#2 Restaurant in ALL of U.S.A. on Yelp 2020 (1st Location)! Joshua You, the man behind our restaurant, begins each morning at the market choosing the freshest fish.',
        image: 'https://s3-media0.fl.yelpcdn.com/bphoto/TlmtiOcrUB-3dvD069qj3Q/l.jpg',
        address: "7100 Santa Monica Blvd Ste 135",
        city:"West Hollywood",
        state:"CA",
        zip_code:90046,
        userId: 2,
      },
      {
        name: 'Metro Art Rail Tours',
        description: 'The Metro Art Rail Tour included so many beautiful works of art!',
        image: 'https://s3-media0.fl.yelpcdn.com/bphoto/o9QSEPFvyyoaMPWntpLwBQ/l.jpg',
        address: "840 Santee St Ste 101 Java’s Room",
        city:"Los Angeles",
        state:"CA",
        zip_code:90014,
        userId: 3,
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
