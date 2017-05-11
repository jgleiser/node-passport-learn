'use strict';

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('../models/user');

passport.use(new BasicStrategy(
    function (username, password, callback) {
        User.findOne({ username: username }, function (err, user) {
            if (err) return callback(err);
            // no user found
            if (!user) return callback(null, false);
            // check if password is correct
            user.verifyPassword(password, function (err, isMatch) {
                if (err) return callback(err);
                if (!isMatch) return callback(null, false);
                return callback(null, user);
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session: false });
