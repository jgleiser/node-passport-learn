'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Generate crypted password for user before save
userSchema.pre('save', function (callback) {
    var user = this;

    // no password change, break out
    if (!user.isModified('password')) return callback();

    // else hash the password
    bcrypt.genSalt(5, function (err, salt) {
        if (err) return callback(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return callback(err);
            user.password = hash;
            callback();
        });
    });

});

// To verify user password
userSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('user', userSchema);
