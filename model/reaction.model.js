const {bdd} = require('.././framework/connexion.js');
const {DataTypes} = require('sequelize');

const Reaction = bdd.define('reaction', {
    type: {
        type: DataTypes.ENUM('LIKE', 'LOVE', 'DISLIKE')
    }
});

module.exports = Reaction;