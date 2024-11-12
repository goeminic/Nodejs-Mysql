const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/signup', (req,res) => {
    res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
        //debe llamarse con el mismo nombre que se define en la libreria passport
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));


router.get('/profile', (req,res) => {
    res.send('Perfil de usuario');
});



module.exports = router;