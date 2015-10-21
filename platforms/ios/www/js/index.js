///*
// * Licensed to the Apache Software Foundation (ASF) under one
// * or more contributor license agreements.  See the NOTICE file
// * distributed with this work for additional information
// * regarding copyright ownership.  The ASF licenses this file
// * to you under the Apache License, Version 2.0 (the
// * "License"); you may not use this file except in compliance
// * with the License.  You may obtain a copy of the License at
// *
// * http://www.apache.org/licenses/LICENSE-2.0
// *
// * Unless required by applicable law or agreed to in writing,
// * software distributed under the License is distributed on an
// * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// * KIND, either express or implied.  See the License for the
// * specific language governing permissions and limitations
// * under the License.
// */
//var app = {
//    // Application Constructor
//    initialize: function() {
//        this.bindEvents();
//    },
//    // Bind Event Listeners
//    //
//    // Bind any events that are required on startup. Common events are:
//    // 'load', 'deviceready', 'offline', and 'online'.
//    bindEvents: function() {
//        document.addEventListener('deviceready', this.onDeviceReady, false);
//    },
//    // deviceready Event Handler
//    //
//    // The scope of 'this' is the event. In order to call the 'receivedEvent'
//    // function, we must explicitly call 'app.receivedEvent(...);'
//    onDeviceReady: function() {
//        app.receivedEvent('deviceready');
//    },
//    // Update DOM on a Received Event
//    receivedEvent: function(id) {
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
//
//        console.log('Received Event: ' + id);
//    }
//};





//Api Key : 90e7f18c9b7552f37aa64e757531b09b




//var apiUrl = "" +
//
//    "http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID={90e7f18c9b7552f37aa64e757531b09b}";
//
//
//console.log(apiUrl);
//
//
//
//$.ajax({
//    url: apiUrl,
//    dataType: "jsonp",
//    success: function(data){
//        console.log(data);
//        itemBuilder(data);
//
//    },
//    fail: function(){console.log("Error!")}
//});
//
//var cityUrl = "http://api.openweathermap.org/data/2.5/forecast?id=524901";
//console.log(cityUrl);
//
//
//function itemBuilder(data) {
//
//
//var grad = data.list;
//var list = $("<UL/>");
//
//
//for (var i = 0; i < grad.length; i++) {
//
//    var graditem = $('<LI/>', {
//        text: grad[i].title
//    }).appendTo(list);
//    }
//
//    $('body').append(list);
//
//}
//



// Vancouver Bc
$(document).ready(function() {

    $.ajax({

        url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=vancouver,canada&mode=json&units=metric",
        dataType : "json",
        type: "GET",

        success: function(json) {

            console.log(json);

            citybuilder(json);

            var date = new Date(json.list[0].dt * 1000);
            var day = date.getDay();

            var temp = Math.round(json.list[0].temp.day);
            var description = (json.list[0].weather[0].description);
            $('#city-temperature').html(temp + '° C');
            $('#city-description').html(description);
            $('img#city-icon').attr('src', 'http://openweathermap.org/img/w/' + json.list[0].weather[0].icon + '.png');

            fourdays(json.list);
        },
        fail: function(){console.log("Error!")}

    });

});


var weekday = ['SU ','MO ','TU ','WE ','TH ','FR ','SA '];
//d= new Date();



//var forecast = ['18° ','17° ','20° ','21° ','19° ','17° ','19° '];


//$('#forecast').append(forecast);


function citybuilder(json) {







    var city = $("<div/>", {
        class: "city"
    });

    var cityWrapper = $("<div/>", {
        class: "city-wrapper"
    }).appendTo(city);


    //========CITY TITLE=======

    var cityText = json.city.name;

    var cityTitle = $("<div/>", {
        class: "city-title",
        text: cityText
    }).appendTo(cityWrapper);



    //========CITY TEMPERATURE=======

    var cityTemp = json.list[0].temp.day;

    var cityTemperature = $("<div/>", {
        class: "city-temperature",
        text: cityTemp

    }).appendTo(cityWrapper);

    var cityDescription = $("<div/>", {
        class: "city-description"
    }).appendTo(cityWrapper);

    var weatherImage = $("<img/>", {
        src: "#"
    }).appendTo(cityWrapper);

    var weekdays = $("<div/>", {
        class: "weekdays"
    }).appendTo(cityWrapper);

    var forecast = $("<div/>", {
        class: "forecast"
    }).appendTo(cityWrapper);


    $('.cities').append(city);


}



function fourdays(nextday) {

    console.log(nextday);

    for (var i = 1; i < nextday.length; i++) {
        var dayTemp= Math.round(nextday[i].temp.day);
        var date = new Date(nextday[i].dt * 1000);
        var day = date.getDay();

        $('<div/>').append(weekday[day]).appendTo($('#weekdays'));
        $("<div/>").append(dayTemp).appendTo($('#forecast'));



    }


};

