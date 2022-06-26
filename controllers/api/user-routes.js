const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: {exclude: ['password']},
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
        })
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
    //all users
})

router.get('/:id', async (req, res) => {
    try {
        const oneUser = await User.findOne({
            where: {
                id: req.params.id,
            },
            attributes: {exclude: ['password']},
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
        })
        if (!oneUser) {
            res.status(404).json({ message: 'No User found with this id' });
            return;
        }
        res.json(oneUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
    //get user by id
})


router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
