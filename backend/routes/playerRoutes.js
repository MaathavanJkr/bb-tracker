const express = require('express')
const { getAllPlayers, addPlayer, editPlayer, deletePlayer } = require('../controllers/playerController')
const router = express.Router()

router.route('/').get(getAllPlayers)
router.route('/:id').get(getAllPlayers).put(editPlayer).delete(deletePlayer)
router.route('/add').post(addPlayer)

module.exports = router