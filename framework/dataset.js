const Message = require('../model/message.model');
const User = require('../model/user.model');
const Reaction = require('../model/reaction.model');
const bcrypt = require('bcrypt');

const dataset = async () => {
    await User.create({
        email: "pluczak@myges.fr",
        password: bcrypt.hashSync('Password123!',10),
        nickname: "pluczak" 
    });

    await Message.create({
        content: "Message de test.",
        authorId: 1
    })
    await Message.create({
        content: "Ceci est une photo d'un homard bleu.",
        authorId: 1,
        picture: "blue_lobster1749671064509.jpg"
    })
    await Reaction.create({
        type: "like",
        userId: 1,
        messageId: 1
    })
}

module.exports = dataset;