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


    module.controller('topController', ['$scope', 'User', function($scope, User){
        var data = {
            data1:{
                id: 1,
                name: "北村尚紀"
            },
            data2:{
                id: 2,
                name: "佐々木友美"
            },
            data3:{
                id: 3,
                name: "久米啓太"
            },
            data4:{
                id: 4,
                name: "帆刈大樹"
            }
        }

//        $scope.users = user.query();

        window.localStorage.setItem("users",JSON.stringify(data));
        var users = users;
        $scope.users = JSON.parse(users);
    }]);





    module.controller('detailController', function($scope) {
        var options = $scope.myNavigator.getCurrentPage().options;
        $scope.user = options.user;
        var tmp;

        $scope.onclick = function(){
            var time = new Date();
            var records = window.localStorage.getItem("records");
            $scope.records = JSON.parse(records);
            var count = 0;
            var record_flag = true; //新しいレコードを作る場合はtrue
            if(records != null){
                for(var record in $scope.records){
                    if(record.user_id == 1){
                        $(".start_btn").text("STOP");
                        record_exist = false;
                        $scope.record = record;
                    }
                    count++;
                }
            }

            if(record_flag){
                var key = ("data" + String(count + 1));
                var obj = new Object();
                var data = {
                    id:count + 1,
                    user_id:$scope.user.id,
                    started_at:time,
                    ended_at:null
                }
                obj[key] = data;
                $scope.inserted_new_records_list = $scope.records.push(obj);
                $(".start_btn").text("STOP");

                window.localStorage.setItem("records",JSON.stringify(inserted_new_records_list));
                $scope.records =JSON.parse(window.localStorage.getItem("records"));
                record_flag = false;
            }else{
                var data = {
                    id:$scope.record.id,
                    user_id:$scope.record.user_id,
                    started_at:t$scope.record.started_at,
                    ended_at:time
                }
                window.localStorage.setItem("records",JSON.stringify(data));
                tmp = $scope.record.ended_at - $scope.record.started_at;
                var hour = Math.floor(tmp / 1000 / 60 / 60);
                var min = Math.floor((tmp - hour * 1000 + 60 * 60) / 1000 / 60);
                $scope.time_count = String(hour) + "時間" + String(min) + "分";

            }
        }
    });
