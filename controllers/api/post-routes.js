// required files
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

//gets every post
router.get("/", async(req, res) => {
    console.log('========================');
  try {
    const everyPost = await Post.findAll({
      attributes: ["id", "title", "body", "user_id"],
      include: [
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment_text", "user_id"],
        },
      ],
    });
    res.json(everyPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//finds post by id
router.get("/", async(req, res) => {
  try {
    const singlePost = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "body", "user_id"],
      include: [
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment_text", "user_id"],
        },
      ],
    });
    if (!singlePost) {
      res.status(404).json({ message: "No Post found" });
      return;
    }
    res.json(singlePost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async(req, res) => {
  try {
    const createPost = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id,
    });
    res.json(createPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async(req, res) => {
  try {
    const updatePost = await Post.update(
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatePost) {
      res.status(404).json({ message: "No Post found" });
      return;
    }
    res.json(updatePost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async(req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletePost) {
      res.status(404).json({ message: "No Post found" });
      return;
    }
    res.json(deletePost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
