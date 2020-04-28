const authController = require('../controllers/authController');
const router = require('express').Router();

router.get('/', (_, res) => res.send({ message: '/api/user' }));

router.post('/register', authController.register);

router.post('/login', authController.login);

module.exports = router;
