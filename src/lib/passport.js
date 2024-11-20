const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');

const helpers = require('../lib/helpers');


passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    console.log(req.body)
    console.log(username)
    console.log(password)
}));


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
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null,user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users Where id = ?', [id]);
    done(null, rows[0]);
});