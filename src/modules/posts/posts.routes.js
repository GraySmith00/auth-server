const router = require('express').Router();
const postsController = require('./posts.controller');
const verifyToken = require('../../middlewares/verifyToken');

router.get('/', verifyToken, postsController.getAllPosts);
router.get('/:id', verifyToken, postsController.getPostById);

module.exports = router;
