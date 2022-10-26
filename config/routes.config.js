const router = require('express').Router();
const usersController = require("../controllers/users.controller")
const authController = require("../controllers/auth.controller")
const contractsController = require("../controllers/contract.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const ticketsController = require("../controllers/tickets.controller")
const billController = require("../controllers/bill.controller")
const weatherController = require("../controllers/weather.controller")

router.get('/', (req, res, next) => res.json({ ok: true }));

//AUTH

router.post('/login', authController.login)

//USERS

router.post('/users', usersController.create)
router.get('/users/profile', authMiddleware.isAuthenticated, usersController.getCurrentUser)

//CONTRACTS

router.post('/contracts', authMiddleware.isAuthenticated, contractsController.create)
router.get('/contracts', authMiddleware.isAuthenticated, contractsController.getContracts)
router.get('/contracts/:id', authMiddleware.isAuthenticated, contractsController.getContract)

//TICKETS

router.post('/tickets', authMiddleware.isAuthenticated, ticketsController.create)
router.post('/tickets/buy/:id', authMiddleware.isAuthenticated, ticketsController.buy)
router.get('/tickets', authMiddleware.isAuthenticated, ticketsController.getTickets)

//BILL

router.post('/bill', authMiddleware.isAuthenticated, billController.createBill)
router.get('/bills', authMiddleware.isAuthenticated, billController.getBills)

//WEATHER API

router.get('/weather', authMiddleware.isAuthenticated, weatherController.getNowcast)


module.exports = router;