const Message = require('../model/message.model');

exports.create = async(req, res) => {
    try{
        let userId = req.token.id;
        let message = {
            content: req.body.content,
            authorId: userId,
            picture: req.file ? req.file.filename : null
        }

        message = await Message.create(message);
        res.status(201).json(message);
    }catch(error){
        res.status(500).json(error.message);
    }
}

exports.update = async(req, res) => {
    try{
        let message = await Message.findByPk(req.params.id);
        if(!message){
            return res.status(404).json({message: "Le message n'existe pas."});
        }

        let userId = req.token.id;
        if(message.authorId !== userId){
            return res.status(403).json({message: "Vous ne pouvez pas modifier ce message."});
        }

        message.update({
            content: req.body.content ? req.body.content : message.content,
            picture: req.file ? req.file.filename : message.picture 
        });
        res.status(200).json(message);
    } catch(error){
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
        if(message.authorId !== userId){
            return res.status(403).json({message: "Vous ne pouvez pas modifier ce message."});
        }

        message.destroy();
        res.status(204).json("Message supprimé.");
    } catch(error){
        res.status(500).json(error.message);
    }
    
}

exports.getByID = async(req, res) => {
    try{
        let message = await Message.findByPk(req.params.id);

        if(!message){
            return res.status(404).json({message: "Le message n'existe pas."});
        }

        res.status(200).json(message);
    }catch(error){
        res.status(500).json(error.message);
    }
}

exports.getAll = async(req, res) => {
    try{
        let messages = await Message.findAll();
        res.status(200).json(messages);
    }catch(error){
        res.status(500).json(error.message);
    }
}