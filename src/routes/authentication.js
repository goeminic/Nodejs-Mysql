const express = require('express');
const router = express.Router();

const passport = require('passport');
const { render } = require('timeago.js');

router.get('/signup', (req,res) => {
    res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
        //debe llamarse con el mismo nombre que se define en la libreria passport
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {

    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req,res,next);
});


router.get('/profile', (req,res) => {
    res.send('Perfil de usuario');
});



module.exports = router;