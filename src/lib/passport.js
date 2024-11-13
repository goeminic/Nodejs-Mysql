const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');

const helpers = require('../lib/helpers');

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username', //se utiliza el name que se especifica en el formulario en la vista signup
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    return done(null, newUser);
}));

passport.serializeUser((usr, done) => {
    
});
