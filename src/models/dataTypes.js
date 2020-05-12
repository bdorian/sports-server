const Sequelize = require('sequelize');
const Enums = require('./enums');

module.exports = {
    league: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [Enums.league.NBA, Enums.league.NFL]
    },
    meleeStatus: {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: Enums.meleeStatus.Pre,
        values: [Enums.meleeStatus.Pre, Enums.meleeStatus.Mid, Enums.meleeStatus.Post]
    }
};