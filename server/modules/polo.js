var Data = [];
var coins = require('../../models/coins');
var C = require('../../constants');
var request = require('request');
var set = false;
var timer = 2000;

function getData() {
  if (set === false) {
    set = true;
    //var update = setInterval(function () {
      //request('https://poloniex.com/public?command=returnOrderBook&currencyPair=ALL&depth=10', function (error, response, body) {
      //  if (!error && response.statusCode == 200) {
      //    var data = JSON.parse(body);
      //    //console.log(data);
      //
      //    for (var i in data) {
      //      coins.create({'coin': i, orderBook: {asks: data[i].asks, bids: data[i].bids}})
      //    }
      //  }
      //});
    //   request('https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=200', function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //       var data = JSON.parse(body);
    //       //console.log(data);
    //       data.timestamp = new Date();
    //       coins.update(
    //         {name:'BTC_ETH'},
    //         { $push: { data: {timestamp:data.timestamp, asks: data.asks, bids: data.bids }} },
    //         function(err,doc) {
    //           console.log(err, doc);
    //         }
    //       );
    //     }
    //   });
    // }, timer);
    request('https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start=1405699200&end=9999999999&period=14400', function (error, response, body) {
       if (!error && response.statusCode == 200) {
         var data = JSON.parse(body);
         console.log(data);

       }
    })
  }
}

function runTest(){
  console.log("test 0");

  // coins.find({}).then(function(coins){
  //   //console.log("coins", coins[0].data[10]);
  //   var masterCol = [];
  //   console.log(coins[0].data.length);
  //   coins[0].data.forEach(function(elem, i, array){
  //     if (i > 10 && i < array.length - 10){
  //       masterCol.push(buildMasters(array[i-10],elem, array[i+10], i));
  //     };
  //   });
  //   var results = {
  //     difAB: [],
  //     difAA: [],
  //     difBB: [],
  //     difBA: []
  //     //averages: {
  //     //  topgains:{},
  //     //  toploss:{}
  //     //}
  //   };
  //   results.difAB = masterCol.sort(function(a,b){return a.difAB - b.difAB});
  //   results.difAA = masterCol.sort(function(a,b){return a.difAA - b.difAA});
  //   results.difBB = masterCol.sort(function(a,b){return a.difBB - b.difBB});
  //   results.difBA = masterCol.sort(function(a,b){return a.difBA - b.difBA});
  //   console.log(results.difAA[1075]);
  // })
}

//db.students.update(
//  { name: "joe" },
//  { $push: { scores: { $each: [ 90, 92, 85 ] } } }
//)

module.exports = {
  getpolo: getData,
  runTest: runTest
};

function buildMasters(past, current, future, i){
  return {
    number: i,
    timestamp: current.timestamp,
    difAB: current.asks[0][0] - past.asks[0][0],
    difAA: future.asks[0][0] - current.asks[0][0],
    difBB: current.bids[0][0] - past.bids[0][0],
    difBA: future.bids[0][0] - current.bids[0][0]
  };
};

function sortdesc(a, b){return b-a};
function sortasc(a, b){return b-a};
