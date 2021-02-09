const express = require('express');
const router = express.Router({mergeParams: true});
const {createJoke, getJokes, getJoke, deleteJoke, updateJoke} = require('../controllers/jokes');

router.post('/', createJoke);
router.get('/', getJokes);
router.get('/:id', getJoke);
router.put('/:id', updateJoke);
router.delete('/:id', deleteJoke);

module.exports = router;