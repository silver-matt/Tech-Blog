const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = [
  {
    username: 'emaliname',
    email: 'username@example.com',
    password: 'wigwog3',
  },
  {
    username: 'passWordy',
    email: 'email@example.com',
    password: 'qJfoAWSR95j12@$*^WQndaAS',
  },
  {
    username: 'NameyMcNameface',
    email: 'password@example.com',
    password: 'hackerman1775',
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
