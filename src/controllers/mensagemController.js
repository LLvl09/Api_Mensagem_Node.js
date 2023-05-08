const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const ValidationContract = require('../validators/fluentValidator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Mensagem = require('../models/Mensagem');

exports.post = async (req, res) => {
    try {
        const userId =req.params.id;
        const mensagem = new Mensagem(req.body);
        mensagem.de= userId;
        const destinatarioId= mensagem.para;

        const usuarioDestinado = await Usuario.findById(mensagem.para);
        if (!usuarioDestinado) {
            return res.status(400).json({ message: 'Destinatário não encontrado' });
        }
        
        mensagem.save();

        res.status(200).json({message: "Mensagem enviada com sucesso!"})
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Erro ao enviar mensagem privada' });
    }
}

exports.get = async (req, res) => {
    try {
        const idUsuario= req.params.id;
        
        const mensagens = await Mensagem.find({ $or: [{ de: idUsuario, }, { para: idUsuario }] })
            .populate('de', '-_id -nome -email -senha -__v')
            .populate('para','-_id -email -senha -__v')
            .sort({ createdAt: 'desc' }).select('-de');

        return res.status(200).json(mensagens);

    } catch (e) {
        console.log(e);
        return res.status(500).json({ mensagem: 'Erro ao carregar as mensagens!' });
    }

}