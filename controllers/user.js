'use strict';

const User = require('../models/user');

// endpoint POST /api/users
exports.postUsers = function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err) {
        if (err) return res.send(err);
        res.json({
            message: 'New user added'
        });
    });
};

// endpoint GET /api/users
exports.getUsers = function (req, res) {
    User.find(function (err, users) {
        if (err) return res.send(err);
        res.json(users);
    });
};
