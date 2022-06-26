const { Comment } = require('../models');

const commentData = [
  {
    comment_text: 'Lorem ipsum dolor sit amet',
    user_id: 1,
    post_id: 3,
  },
  {
    comment_text: 'consectetur adipiscing elit, sed do eiusmod',
    user_id: 2,
    post_id: 8,
  },
  {
    comment_text: 'Ut enim ad minim veniam, quis nostrud.',
    user_id: 3,
    post_id: 10,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
