var mongoose = require('mongoose');

var coinSchema = new mongoose.Schema({
  name: {type:String, required: true},
  data: {type: Array}
});

module.exports = mongoose.model('Coin', coinSchema);