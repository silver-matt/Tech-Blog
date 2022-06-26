// required files
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

//gets every post
router.get("/", async(req, res) => {
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

module.exports = router;
