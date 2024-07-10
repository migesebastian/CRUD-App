const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  },{
  timestamps: true
});

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
  profilePicture: String,
  posts: [postSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User
