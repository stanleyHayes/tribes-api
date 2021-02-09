const Joke = require('../models/joke');

exports.createJoke = async (req, res) => {
    req.body.user = req.user._id;
    try {
        let {joke, user, tribe} = req.body;
        let createdJoke = await Joke.create({joke, user, tribe});
        return res.status(200).json({data: createdJoke, message: 'Joke created successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.getJoke = async (req, res) => {
    try {
        let joke = await Joke.findById(req.params.id);
        if (!joke) {
            return res.status(404).json({data: null, message: `Joke not found`});
        }
        return res.status(200).json({data: joke, message: 'Joke created successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.getJokes = async (req, res) => {
    try {
        let jokes = await Joke.find({});
        return res.status(200).json({data: jokes, message: `${jokes.length} jokes retrieved`, count: jokes.length});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.updateJoke = async (req, res) => {
    try {
        let joke = await Joke.findById(req.params.id);
        const updates = Object.keys(req.body);
        const allowedUpdates = ['joke'];
        const allowed = updates.every(update => allowedUpdates.includes(update));
        if (!allowed) {
            return res.status(400).json({data: null, message: `Joke was not updated`});
        }
        for (let key of updates) {
            joke[key] = req.body[key];
        }
        await joke.save();
        return res.status(200).json({data: joke, message: `Joke updated successfully`});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.deleteJoke = async (req, res) => {
    try {
        let joke = await Joke.findById(req.params.id);
        if (!joke) {
            return res.status(404).json({data: null, message: `Joke not found`});
        }
        await joke.remove();
        return res.status(200).json({data: joke, message: `Joke successfully deleted`});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}