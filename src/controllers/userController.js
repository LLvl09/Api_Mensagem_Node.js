const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const ValidationContract = require('../validators/fluentValidator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.register = async (req, res) => {
    let contract = new ValidationContract();

    contract.hasMinLen(req.body.nome, 3, 'O nome deve conter pelo menos 6 caractéres!');
    contract.hasMinLen(req.body.senha, 6, 'A senha deve conter pelo menos 6 caractéres!');
    contract.isEmail(req.body.email, 'O seu email é inválido!');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    const user = new Usuario(req.body);

    try {
        // Verifica se o usuário já existe no banco de dados
        const existingUser = await Usuario.findOne({ email: user.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(user.senha, salt);
        user.senha = hashedPassword;

        await user.save();

        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
}

exports.login = async (req, res) => {
    let contract = new ValidationContract();

    contract.isEmail(req.body.email, 'Este email é invalido!');
    
    const { email, senha } = req.body;
    const user = await Usuario.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado' });
    }
    const isPasswordMatch = await bcrypt.compare(senha, user.senha);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Senha incorreta' });
    }
    // Aqui você pode criar uma sessão para o usuário e redirecioná-lo para a página de perfil, por exemplo

    const secret = process.env.TOKEN_SECRET;
    const token = jwt.sign({
        id: user.id
    }, secret, {
        expiresIn: 3600
    });

    res.status(200).send({ message: 'Login efetuado com sucesso!', token: `${token}` });

}

