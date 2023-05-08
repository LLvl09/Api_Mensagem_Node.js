const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    de: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        trim: true
    },
    para: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        trim: true
    },
    texto: {
        type: String,
        required: true,
        trim: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Mensagen", schema);