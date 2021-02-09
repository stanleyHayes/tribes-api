const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tribeSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    country: {
        trim: true,
        type: String,
        required: true
    },
    history: {
        trim: true,
        type: String
    },
    fun_facts: {
        type: [String]
    },
    image: {
        type: String,
        required: true
    },
    gallery: {
        type: [String]
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

const Tribe = mongoose.model('Tribe', tribeSchema);

module.exports = Tribe;