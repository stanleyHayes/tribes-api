const express = require('express');
const router = express.Router({mergeParams: true});

const {
    register,
    login,
    getLoggedInAccount,
    deleteAccount,
    updateProfile,
    resetPassword,
    verifyAccount,
    forgotPassword
} = require('../controllers/authentication');

router.post('/register', register);
router.post('/login', login);
router.put('/me', updateProfile);
router.get('/me', getLoggedInAccount);
router.delete('/me', deleteAccount);
router.put('/:token/verify-password', verifyAccount);
router.post('/:token/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);