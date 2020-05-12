'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.addIndex('investment', {
      unique: true,
      fields: ['playerId', 'userId'],
      name: 'investment_unique'
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeIndex('investment', 'investment_unique');
  }
};
