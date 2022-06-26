//required files
const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
  console.log(req.session);

  //route to get user data
  try {
    const userPostData = await Post.findAll({
      attributes: ["id", "title", "body", "user_id"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment_text", "user_id"],
        },
      ],
    });
    if (!userPostData) {
      res.status(400).json({ message: "Post not Available" });
      return;
    }
    // adds the post to the home page
    const posts = userPostData.map((post) => post.get({ plain: true }));

    res.render("home", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/userPost/:id", async (req, res) => {
  try {
    const userPost = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "body", "user_id"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment_text", "user_id"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    if (!userPost) {
      res.status(404).json({ message: "Post not Available" });
      return;
    }
    const post = userPost.get({ plain: true });

    const myPost = post.user_id == req.session.user_id;

    res.render("Post", {
      post,
      loggedIn: req.session.loggedIn,
      currentUser: myPost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/login", async (req, res) => {
  try {
    res.render("login", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/post", async (req, res) => {
  try {
    res.render("createPost", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "body", "user_id"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment_text", "user_id"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    if (!allPosts) {
      res.status(404).json({ message: "Post not Available" });
      return;
    }
    const posts = allPosts.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// export router
module.exports = router;
