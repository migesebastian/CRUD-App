const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
      const users = await User.find({});
      res.render('users/index.ejs', { users: users });
    } catch (error) {
      res.redirect('/');
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('posts').exec();
      res.render('users/show.ejs', { user });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.redirect('/');
    }
  });


  router.get('/:id/edit', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.render('users/edit.ejs', { user });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.redirect('/');
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const { username, bio, profilePicture } = req.body;
      await User.findByIdAndUpdate(req.params.id, { username, bio, profilePicture });
      res.redirect(`/users/${req.params.id}`);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.redirect(`/users/${req.params.id}/edit`);
    }
  });
  
  module.exports = router;