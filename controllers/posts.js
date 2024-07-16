const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Index route for displaying the user's posts
router.get('/', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      const posts = currentUser.posts || [];
      res.render('posts/index.ejs', {
        posts: posts,
        user: currentUser
      });
    } catch (error) {
      res.redirect('/');
    }
  });

router.get('/new', (req, res) => {
    res.render('posts/new.ejs', { user: req.session.user });
  });

  router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
  
      if (!currentUser.posts) {
        currentUser.posts = [];
      }
  
      currentUser.posts.push(req.body);
  
      await currentUser.save();
  
      res.redirect('/posts');
    } catch (error) {
      res.redirect('/posts/new');
    }
  });

// Show route for displaying a specific post
router.get('/:postId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const post = currentUser.posts.id(req.params.postId);
      res.render('posts/show.ejs', {
        post: post,
        user: currentUser
      });
    } catch (error) {
      res.redirect('/posts');
    }
  });

 // Edit route for rendering the form to edit a specific post
router.get('/:postId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const post = currentUser.posts.id(req.params.postId);
      res.render('posts/edit.ejs', {
        post: post,
        user: currentUser
      });
    } catch (error) {
      res.redirect('/posts');
    }
  });
  
// Update route for updating a specific post
router.put('/:postId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const post = currentUser.posts.id(req.params.postId);
      post.set(req.body);
      await currentUser.save();
      res.redirect(`/posts`);
    } catch (error) {
      res.redirect(`/posts/${req.params.postId}/edit`);
    }
  });
  // Delete route for removing a post
router.delete('/:postId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);

      currentUser.posts.id(req.params.postId).deleteOne();

      await currentUser.save();

      res.redirect(`/posts`);
    } catch (error) {
      res.redirect('/posts');
    }
  });

module.exports = router;