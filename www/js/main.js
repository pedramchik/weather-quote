//oct 14 2015 : New Api Key : 7f4701bbe519610521c5dc62e277268d

var myFB = new Firebase('https://quote-app.firebaseio.com/');

var quotes = [
    {
        'quote':'“cool things happen to cool people”',
        'author':'Matt',
        'url':'http://mattcoady.me'
    },
    {
        'quote': '“just do it”',
        'author': 'nike',
        'url':'http://nike.com'
    },
    {
        'quote':'“UX Should be better known as Empathy Design”',
        'author':'Carlos',
        'url':'http://uxgilbert.businesscatalyst.com/index.html'
    },
    {
        'quote': '“Let me think about it”',
        'author': 'Sacha Floyd',
        'url':'http://sachafloyd.com'
    },
    {
        'quote':'“Sorry I am late”',
        'author':'Hanna Joney',
        'url':'http://twitter.com/hannajoney'
    },
    {
        'quote': '“live and let live”',
        'author': 'Ana Nieto',
        'url':'http://instagram.com/ananietocolina/'
    }
];




var images = {
    'Clear':'clear.svg',
    'Clouds':'Clouds.svg',
    'Rain':'Rain.svg'
};

var quoteCount = 0;


// Vancouver Bc
$(document).ready(function() {

    var apiLink = "http://api.openweathermap.org/data/2.5/forecast/";
    var apiCity = "vancouver,canada";

    var apiUrl = apiLink +
        "daily?q=" + apiCity + "&mode=json&units=metric" +
        "&APPID=7f4701bbe519610521c5dc62e277268d";

    $.ajax({
        //url:"http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=7f4701bbe519610521c5dc62e277268d",
        url: apiUrl,
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

            //fourdays(json.list);
        },
        fail: function(){console.log("Error!")}

    });

});




function citybuilder(json) {


    //========CITY TEMPERATURE=======

    var cityTemp = Math.floor(json.list[0].temp.day);

    var cityTemperature = $("<div/>", {
        class: "city-temperature",
        text: cityTemp + "°C"
    }).appendTo('.temp');


    var weatherImage = $("<img/>", {
        src: images[json.list[0].weather[0].main]
    }).appendTo('.imagemaker');

}


var biggest = 0;

window.ondevicemotion = function(event){
    ///Accel only for shake
    var x2 = event.acceleration.x;
    var y2 = event.acceleration.y;
    var z2 = event.acceleration.z;

    var totalaccel= Math.abs(x2)+Math.abs(y2)+Math.abs(z2);


    if(totalaccel > biggest){
        biggest = totalaccel;
        console.log(totalaccel);
    }
    //Shaking sensitivity number 0-30 effortless shake, 30-80 good shake, 80-180 Hard shake
    if(totalaccel > 30){
        quoteRefresh();
    }

};

document.getElementById('text').addEventListener('click',function(){
   quoteRefresh();
});

function quoteRefresh(){
    var randomNumb = Math.floor(Math.random() * quotes.length);
    $('.qod-text').text(quotes[randomNumb].quote);
    $('.qod-author').text(quotes[randomNumb].author);
    $('.qod-author').attr('href', quotes[randomNumb].url);
}


document.getElementById('submit-button').addEventListener('click',function(e){
    e.preventDefault();

    var fbName = $('#name-input').val();
    var fbQuote = $('#quote-input').val();
    var fbLink = $('#link-input').val();

    myFB.push({author:fbName,quote:fbQuote,url:fbLink});
    $('#quote-input').val("");

});





myFB.on('child_added',function(snapshot){
    quotes.push(snapshot.val());
});
