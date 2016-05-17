/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

ons.bootstrap();
var module = angular.module('myApp', ['onsen', 'ngResource']);



module.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
 $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    console.log("dadsadada");

  contentType = 'application/x-www-form-urlencoded;application/json;charset=utf-8';
  $httpProvider.defaults.headers.post = {'Content-Type': contentType};
  $httpProvider.defaults.headers.put = {'Content-Type': contentType};
  $httpProvider.defaults.headers.delete = {'Content-Type': contentType};

}]);

    module.factory("User", ['$resource', function($resource){

        return $resource(
            'http://localhost:3000/users/:id',
            {id: '@id'},
            {
                get: { method: 'GET', isArray: true},
                create: {method: 'POST'}
            }
        );
    }]);

    module.factory("Record", ['$resource', function($resource){

        return $resource(
            'http://localhost:3000/users/:user_id/records/:id',
            {user_id: '@user_id', id: '@id'},
            {
                query: { method: 'GET', isArray: true},
                get: { method: 'GET', isArray: false},
                update: { method: 'PUT', withCredentials: true}
            }
        );
    }]);




    module.controller('topController', ['$scope', 'User', function($scope, User){
        $scope.users = User.query();

    }]);

    module.controller('detailController', ['$scope', 'Record', function($scope, Record) {
        var options = $scope.myNavigator.getCurrentPage().options;
        $scope.user = options.user;
        var tmp;


    Record.query({user_id: $scope.user.id}).$promise.then(function(records){
        $scope.records = records;

        angular.forEach($scope.records, function(value, key){
            if(value.ended_at == null && value.user_id == $scope.user.id){
                $scope.record = value;
                $(".start_btn").text("STOP");
            }
        });
    });
    console.log("loaded");

        $scope.onclick = function(){
            var time = new Date();

            if($scope.record == null){
                console.log("create");
                $scope.record = new Record;
                $scope.record.user_id = $scope.user.id;
                $scope.record.started_at = time;
                $scope.record.$save();

                $(".start_btn").text("STOP");

            }else if($scope.record.ended_at == null){
                $scope.record = new Record($scope.record);
                console.log($scope.record);
                $scope.record.ended_at = time;
                console.log($scope.record);
                $scope.record.$update();
                console.log("update");
                tmp = $scope.record.ended_at - Date.parse($scope.record.started_at);
                var hour = Math.floor(tmp / 1000 / 60 / 60);
                var min = Math.floor((tmp - hour * 1000 + 60 * 60) / 1000 / 60);
                $scope.time_count = String(hour) + "時間" + String(min) + "分";
                $(".start_btn").text("START");
            }
        }
    }]);

