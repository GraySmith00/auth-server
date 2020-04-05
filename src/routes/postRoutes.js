const router = require('express').Router();
const postsController = require('../controllers/postsController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, postsController.getAllPosts);

module.exports = router;
