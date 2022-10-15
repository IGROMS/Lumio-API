const router = require('express').Router();
const usersController = require("../controllers/users.controller")
const authController = require("../controllers/auth.controller")
const contractsController = require("../controllers/contract.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get('/', (req, res, next) => res.json({ ok: true }));

//AUTH

router.post('/login', authController.login)

//USERS

router.post('/users', usersController.create)
router.get('/users/profile', authMiddleware.isAuthenticated, usersController.getCurrentUser)

//CONTRACTS

router.post('/contracts', authMiddleware.isAuthenticated, contractsController.create)


module.exports = router;