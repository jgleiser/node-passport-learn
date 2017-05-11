'use strict';

const Thing = require('../models/thing');

// endpoint POST /api/things
exports.postThings = function (req, res) {
    const thing = new Thing();

    thing.name = req.body.name;
    thing.type = req.body.type;
    thing.total = req.body.total;
    thing.userId = req.user._id;

    thing.save(function (err) {
        if (err) return res.send(err);
        res.json({
            message: 'New thing added',
            data: thing
        });
    });
};

// endpoint GET /api/things
exports.getThings = function (req, res) {
    Thing.find({ userId: req.user._id }, function (err, thing) {
        if (err) return res.send(err);
        res.json(thing);
    });
};

// endpoint GET /api/things/:thing_id
exports.getThing = function (req, res) {
    Thing.find({ userId: req.user._id, _id: req.params.thing_id }, function (err, thing) {
        if (err) return res.send(err);
        return res.json(thing);
    });
};

// endpoint PUT /api/things/:thing_id
exports.putThing = function (req, res) {
    Thing.update(
        { userId: req.user._id, _id: req.params.thing_id },
        { total: req.body.total },
        function (err, num, raw) {
            if (err) return res.send(err);
            res.json({ 
                message: num + ' thing(s) updated'
            });
        }
    );
};

// endpoint DELETE /api/things/:thing_id
exports.deleteThing = function (req, res) {
    Thing.remove({ userId: req.user._id, _id: req.params.thing_id }, function (err) {
        if (err) return res.send(err);
        res.json({
            message: 'Thing removed from the DB'
        });
    });
};
