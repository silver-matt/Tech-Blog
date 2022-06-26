const { Post } = require('../models');

const postData = [
  {
    title: 'Duis aute irure dolor in reprehenderit.',
    post_url: 'https://loremipsum.io/',
    user_id: 1,
  },
  {
    title: 'dolore eu fugiat nulla pariatur.',
    post_url: 'https://nasa.gov/donec.json',
    user_id: 2,
  },
  {
    title: 'in voluptate velit esse cillum.',
    post_url:
      'https://en.wikipedia.org/wiki/Website',
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
