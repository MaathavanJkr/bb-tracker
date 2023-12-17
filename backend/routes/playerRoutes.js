const express = require('express')
const { getAllPlayers, addPlayer, editPlayer, deletePlayer, getPlayer } = require('../controllers/playerController')
const router = express.Router()

router.route('/').get(getAllPlayers)
router.route('/:id').get(getPlayer).put(editPlayer).delete(deletePlayer)
router.route('/add').post(addPlayer)

module.exports = router