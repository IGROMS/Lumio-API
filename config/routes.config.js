const router = require('express').Router();
const usersController = require("../controllers/users.controller")
const authController = require("../controllers/auth.controller")

router.get('/', (req, res, next) => res.json({ ok: true }));

//AUTH

router.post('/login', authController.login)

//USERS

router.post('/users', usersController.create)
router.get('/users/profile', /* authMiddleware.isAuthenticated, */ usersController.getCurrentUser)

module.exports = router;