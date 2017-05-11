'use strict';

const mongoose = require('mongoose');

const ThingSchema = new mongoose.Schema({
    name: String,
    type: String,
    total: Number,
    userId: String
});

module.exports = mongoose.model('Thing', ThingSchema);
