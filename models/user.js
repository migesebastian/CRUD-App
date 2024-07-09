const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  bio: String,
  profilePicture: String
});

const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  tags: String,
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  createdAt: { 
    type: Date,
    default: Date.now },
  updatedAt: { 
    type: Date, 
    default: Date.now },
});

const User = mongoose.model('User', userSchema);
const Posts = new mongoose.model('Posts', postSchema);

module.exports = User;
module.exports = Posts
