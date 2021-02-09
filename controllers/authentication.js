const User = require('../models/user');

exports.register = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(409).json({data: null, message: `User with email ${req.body.email} already exists`});
        }
        user = {
            name: req.body.name,
            tribe: req.body.tribe,
            email: req.body.email,
            password: req.body.password,
            interests: req.body.interests
        }
        user = await User.create(user);
        const token = await user.generateToken();
        res.status(201).json({data: user, message: `User created successfully`, token});
    }catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}

exports.login = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(409).json({message: `User with email ${req.body.email} does not exists`});
        }
        const correctPassword = await user.comparePassword(req.body.password);
        if(!correctPassword){
            return res.status(401).json({data: null, message: `Incorrect password`});
        }
        const token = await user.generateToken();
        res.status(200).json({data: user, token, message: `Login successful`});
    }catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['email', 'tribe', 'email', 'password', 'interests'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if(!isAllowed){
            return res.status(400).json({data: null, message: 'Update not allowed'});
        }
        for(let key of updates){
            req.user[key] = req.body[key];
        }
        await req.user.save();
        res.status(200).json({data: req.user, message: 'User updated successfully'});
    }catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}

exports.resetPassword = async (req, res) => {
    try {

    }catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        req.user.status = 'DELETED';
        await req.user.save();
        res.status(200).json({data: req.user, message: 'Account deleted'});
    }catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}

exports.getLoggedInAccount = async (req, res) => {
    try {
        res.status(200).json({data: req.user, token: req.token});
    }catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}

exports.verifyAccount = async (req, res) => {
    try {

    }catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}

exports.forgotPassword = async (req, res) => {
    try {

    }catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}