app.controller('firstCtrl', ['$scope', 'firstFactory', function ($scope, ccFactory){
  console.log('AWWW YEAHHH');
  var socket = io();
  $scope.data = [];

  socket.on('data', function(dataj){
    var data = JSON.parse(dataj);
    console.log(new Date,data);
    if ($scope.data != data){
      $scope.data = data;
    }
  });

}]);