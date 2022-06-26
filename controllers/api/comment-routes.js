const router = require("express").Router();
const { Comment, Post, User } = require("../../models");

router.get("/", async(req, res) => {
  try {
    // finds comments by id
    const everyComment = await Comment.findAll({
      attributes: ["id", "comment_text", "user_id", "post_id"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
      ],
    });
    res.json(everyComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/", async(req, res) => {
  try {
    const singleComment = await Comment.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "comment_text", "user_id", "post_id"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
      ],
    });
    if (!singleComment) {
      res.status(404).json({ message: "No comment found" });
      return;
    }
    res.json(singleComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async(req, res) => {
  try {
    const createComment = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });
    res.json(createComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
