const express = require('express')
const { getAllPlayers, addPlayer, editPlayer, deletePlayer, getPlayer, getPlayersByShots } = require('../controllers/playerController')
const { adminAuth } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').get(getAllPlayers)
router.route('/shots').get(getPlayersByShots)
router.route('/:id').get(getPlayer).put(editPlayer).delete(adminAuth, deletePlayer)
router.route('/add').post(addPlayer)


module.exports = router