// required section
const router = require('express').Router();

const homeRoutes = require('./home-routes');
const commentRoutes = require('./api/comment-routes');
const postRoutes = require('./api/post-routes');
const userRoutes = require('./api/user-routes')

// use routes section
router.use('/controllers/home-routes.js', homeRoutes);
router.use('./api/comment-routes.js', commentRoutes);
router.use('./api/post-routes.js', postRoutes);
router.use('./api/user-routes.js', userRoutes);

module.exports = router;
