const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authenticate = require('../middlewares/authenticate')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.put('/', authenticate, userController.updateUser)
router.get('/', authenticate, userController.getMe)

module.exports = router;