var express = require('express');
var router = express.Router();
var socketApi = require("../socketApi");

var Mongolib = require("../db/Mongolib");

router.post('/', function (req, res, next) {
  Mongolib.getDatabase(db => {
    Mongolib.insertDocuments(db, data => {
      socketApi.sendNotification();
      res.send(req.body);
    }, req.body)
  });
});

router.get('/', function (req, res, next) {
  Mongolib.getDatabase(db => {
    Mongolib.findDocuments(db, docs => {
      res.send(docs);
    })
  });
});

module.exports = router;
