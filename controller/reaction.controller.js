const Reaction = require('../model/reaction.model');
const Message = require('../model/message.model');

exports.add = async(req, res) => {
    try{
        let message = await Message.findByPk(req.params.id);

        if(!message){
            return res.status(404).json({message: "Le message n'existe pas."});
        }

        let userId = req.token.id;
        let reaction = await Reaction.findOne({ where: { userId: userId, messageId: message.id } });

        let result;
        if(!reaction){
            result = await Reaction.create({
                userId: userId,
                messageId: message.id,
                type: req.body.type
        });
        }else{
            result = await Reaction.update(
                { type: req.body.type },
                { where: { userId: userId, messageId: message.id } }
            );
        }

        res.status(201).json({message: "Reaction ajouté"});
    }catch(error){
        res.status(500).json(error.message);
    }
}

exports.delete = async(req, res) => {
    try{
        let message = await Message.findByPk(req.params.id);

        if(!message){
            return res.status(404).json({message: "Le message n'existe pas."});
        }

        let userId = req.token.id;
        let reaction = await Reaction.findOne({ where: { userId: userId, messageId: message.id } });

        if(reaction){
            await Reaction.destroy({ where: { userId: userId, messageId: message.id } });
            res.status(200).json({message: "Reaction supprimée"});
        }
    } catch(error){
        res.status(500).json(error.message);
    }
    
}