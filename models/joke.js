const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jokeSchema = new Schema({
    joke: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tribe: {
        type: Schema.Types.ObjectId,
        ref: 'Tribe',
        required: true
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});


const Joke = mongoose.model('Joke', jokeSchema);

module.exports = Joke;