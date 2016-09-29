'use strict';

var async = require('async');
var router = require('express').Router();
var polo = require('../modules/polo');


router.get('/test', function (req, res, next) {
  polo.runTest();
});

router.post('/', function (req, res, next) {

});

router.put('/', function (req, res, next) {

});

router.delete('/', function (req, res, next) {

});

module.exports = router;