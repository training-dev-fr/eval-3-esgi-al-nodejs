const { bdd } = require('./connexion.js');
const User = require("../model/user.model.js");
const Message = require("../model/message.model.js");
const Reaction = require("../model/reaction.model.js");

const sync = async () => {

    // lien message - user
    Message.belongsTo(User, {foreignKey: 'authorId'});
    User.hasMany(Message, {foreignKey: 'authorId'});

    // lien message - reaction
    Reaction.belongsTo(Message);
    Message.hasMany(Reaction);

    // lien user - reaction
    Reaction.belongsTo(User);
    User.hasMany(Reaction);

    await bdd.sync({ force: true });
}

module.exports = sync;
