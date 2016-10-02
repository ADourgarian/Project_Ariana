var arraySort = require('array-sort');
var Data = [];
var coins = require('../../models/coins');
var candles = require('../../models/candles');
var C = require('../../constants');
var request = require('request');
var set = true;
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

    C.coins.forEach(function(currencyPair){
      request('https://poloniex.com/public?command=returnChartData&currencyPair='+currencyPair+'&start=1405699200&end=9999999999&period=14400', function (error, response, body) {
         if (!error && response.statusCode == 200) {
           console.log('success: ',currencyPair);
           var data = JSON.parse(body);
           candles.create({name: currencyPair, data:data});
         }
      });
      //candles.create({name: currencyPair, data:["as","df"]});
    });
  }
}

function runTest(test){
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

  if (test == 'candles'){
    candles.find({},function(err,candles){
      if (!err) {
        candles.forEach(function(e, i, a){
          var history = {
            name: e.name,
            bestPerformers:[],
            worstPerformers:[]
          };
          var performers = [];
          e.data.forEach(function(e1,i1,a1){
            if (a1.length - i1 > 2){
              var performer = {
                differenceHighL: a1[i111].high - e1.high,
                differenceLowL: a1[i111].low - e1.low,
                volume: e1.volume,
                volumeDifL: a1[i111].volume - e1.volume,
                quoteVolume: e1.quoteVolume,
                quoteVolumeDifL: a1[i1-1].quoteVolume - e1.quoteVolume,
                weightedAverage: e1.weightedAverage,
                weightedAverageDif:a1[i1+1].weightedAverage - e1.weightedAverage,
                i:i1,
                date:e1.date
              };
              performers.push(performer);
            }
          });
          history.worstPerformers = arraySort(performers,  'weightedAverageDif')
          performers = performers.slice(0);
          history.bestPerformers = arraySort(performers,  'weightedAverageDif', {reverse: true})

          console.log(e.name);
          for (var x = 0; x < 4; x++){
            console.log(e.name);
            console.log('best performer ', x,': ', history.bestPerformers[x]);
            console.log('worst performer ', x,': ', history.worstPerformers[x]);
          }
          // for (var x = 0; x < 10; x++){
          //   console.log(e.name);
          //   console.log('worst performer ', x,': ', history.worstPerformers[x]);
          // }

        })
      }
    })
  }
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
