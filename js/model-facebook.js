/*
Author: Benjamin Chiong
Email: benjamin.chiong@griffithuni.edu.au
Project: DMS Travel
*/

// Global Variables

weather.APPID = "9e9074c9c5f6054c7cb74f06a27006ae"
facebook.APPID = '706784856143327';
facebook.OBJECTID = '815157038515764';
facebook.accessToken;
facebook.userid;
facebook.username;
facebook.pageDescription;
facebook.albumsArray;
facebook.albumsName = [];
facebook.albumSource = [];
facebook.albumSource2 = [];
facebook.likesArray = [];
facebook.coverIdArray = [];
facebook.albumObject;
facebook.photoData = [];


// Get (RESTFUL) Request from facebook with description fields
facebook.getPageDescription = function () {
  
    FB.api('/815157038515764', 'GET',  {"fields":"description"},
        function(response) {
        facebook.pageDescription = response.description;
        console.log(facebook.pageDescription);
        
    });   
       return facebook.pageDescription
}

// Get (RESTFUL) Request from Open Weather Map
weather.getWeatherData = function() {
     var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=' + weather.APPID + '&q=Paris';

    $.ajax({ url:requestUrl , type: 'GET',
       success: function(result) {
           console.log(result);
       }
    });
}


