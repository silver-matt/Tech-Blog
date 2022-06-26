
// required files
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async(req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      attributes: ['id', 'username', 'email', 'password'],
      include: [
        {
          model: Post,
          as: 'posts',
          attributes: ['id', 'title', 'body'],
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'comment_text', 'post_id'],
        },
      ],
    });
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  try {
    const singleUser = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: { exclude: ['password'] },
      attributes: ['id', 'username', 'email', 'password'],
      include: [
        {
          model: Post,
          as: 'posts',
          attributes: ['id', 'title', 'body'],
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'comment_text', 'post_id'],
        },
      ],
    });
    if (!singleUser) {
      res.status(404).json({ message: 'No User found' });
      return;
    }
    res.json(singleUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// function to create user
router.post('/', async(req, res) => {
  try {
    const createUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = createUser.id;
      req.session.username = createUser.username;
      req.session.loggedIn = true;
      res.json(createUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// user log in
router.post('/login', async(req, res) => {
  try {
    const loginUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!loginUser) {
      res.status(400).json({ message: 'User not found' });
      return;
    }
    const validPassword = loginUser.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect Password!' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = loginUser.id;
      req.session.username = loginUser.username;
      req.session.loggedIn = true;
      res.json({ user: loginUser, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
