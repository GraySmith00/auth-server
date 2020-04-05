const Authentication = require('../controllers/authentication');
const router = require('express').Router();

router.get('/', (_, res) => res.send({ message: '/api/user' }));

router.post('/register', Authentication.register);

module.exports = router;
