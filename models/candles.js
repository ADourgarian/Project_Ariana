var mongoose = require('mongoose');

var candleSchema = new mongoose.Schema({
  name: {type:String, required: true},
  data: { type : Array , "default" : [] }
});

module.exports = mongoose.model('Candle', candleSchema);
