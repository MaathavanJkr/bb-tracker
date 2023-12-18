const express = require('express')
const { getAllShots, addShot, editShot, deleteShot, getPlayerShots } = require('../controllers/shotController')
const { userAuth } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').get(userAuth, getAllShots)
router.route('/:id').get(getAllShots).put(editShot).delete(deleteShot)
router.route('/add').post(userAuth, addShot)

router.route('/player/:player').get(getPlayerShots)

module.exports = router