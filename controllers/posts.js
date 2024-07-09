const express = require('express');
const router = express.Router();

const Post = require('../models/user.js');
const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
      const posts = await Post.findById(req.session.user._id);
      res.render('posts/index.ejs', { posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.redirect('/');
    }
  });

router.get('/new', (req, res) => {
    res.render('posts/new.ejs');
  });

router.post('/', async (req, res) => {
    try {
        const { title, content} = req.body;
        const newPost = new Post({
            title,
            content, 
            author: req.session.user._id
        }) 
    await newPost.save();
    res.redirect('/posts');
  } catch (error) {
    console.error('Error creating post:', error);
    res.redirect('/posts/new');
  }
})

router.get('/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('author').exec();
      res.render('posts/show.ejs', { post });
    } catch (error) {
      console.error('Error fetching post:', error);
      res.redirect('/posts');
    }
  });

  router.get('/:id/edit', isSignedIn, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render('posts/edit.ejs', { post });
    } catch (error) {
      console.error('Error fetching post for editing:', error);
      res.redirect('/posts');
    }
  });

  router.put('/:id', isSignedIn, async (req, res) => {
    try {
      const { title, content } = req.body;
      const post = await Post.findById(req.params.id);
      post.title = title;
      post.content = content;
      await post.save();
      res.redirect(`/posts/${post._id}`);
    } catch (error) {
      console.error('Error updating post:', error);
      res.redirect(`/posts/${req.params.id}/edit`);
    }
  });
  
router.delete('/:id', isSignedIn, async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.redirect('/posts');
    } catch (error) {
      console.error('Error deleting post:', error);
      res.redirect('/posts');
    }
  });
  
module.exports = router;