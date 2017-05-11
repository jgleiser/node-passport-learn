'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const thingController = require('./controllers/thing');
const userController = require('./controllers/user');
const authController = require('./controllers/auth');

const db_conf = require('./config/database');

mongoose.connect('mongodb://'+db_conf.USER+':'+db_conf.PWD+'@'+db_conf.HOST+'/'+db_conf.DB);

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api', router);

router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

router.route('/things')
    .post(authController.isAuthenticated, thingController.postThings)
    .get(authController.isAuthenticated, thingController.getThings);

router.route('/things/:thing_id')
    .get(authController.isAuthenticated, thingController.getThing)
    .put(authController.isAuthenticated, thingController.putThing)
    .delete(authController.isAuthenticated, thingController.deleteThing);

app.listen(port, function() {
    console.log('server at port ' + port);
});
