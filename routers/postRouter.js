const router = require('express').Router();
const postCntrls = require('../controllers/postCntrls')
const requireUser = require('../middlewares/requireUser')

router.get('/all', requireUser,postCntrls.getAllPostController);

module.exports = router;