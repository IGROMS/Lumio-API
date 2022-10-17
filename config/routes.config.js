const router = require('express').Router();
const usersController = require("../controllers/users.controller")
const authController = require("../controllers/auth.controller")
const contractsController = require("../controllers/contract.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const ticketsController = require("../controllers/tickets.controller")

router.get('/', (req, res, next) => res.json({ ok: true }));

//AUTH

router.post('/login', authController.login)

//USERS

router.post('/users', usersController.create)
router.get('/users/profile', authMiddleware.isAuthenticated, usersController.getCurrentUser)

//CONTRACTS

router.post('/contracts', authMiddleware.isAuthenticated, contractsController.create)
router.get('/contracts', authMiddleware.isAuthenticated, contractsController.getContracts)

//TICKETS

router.post('/tickets', authMiddleware.isAuthenticated, ticketsController.create)
router.post('/tickets/buy/:id', authMiddleware.isAuthenticated, ticketsController.buy)
router.get('/tickets', authMiddleware.isAuthenticated, ticketsController.getTickets)


module.exports = router;