const express = require('express')
const { getAllUsers, registerController, loginController } = require('../controllers/userController')

// router object
const router = express.Router()

// GET All Users || GET
router.get('/all-users',getAllUsers)

// Create user || POST
router.post('/register', registerController)

// Login || POST
router.post('/login', loginController)

module.exports = router