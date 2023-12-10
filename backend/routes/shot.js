const express = require('express')
const { getAllShots, addShot } = require('../controllers/shot')
const router = express.Router()

router.route('/').get(getAllShots)
router.route('/:id').get(getAllShots)
router.route('/add').post(addShot)
// router.route('/me').put(updateMe).delete(deleteMe)

module.exports = router 