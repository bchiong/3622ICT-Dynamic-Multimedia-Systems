/*
Author: Benjamin Chiong
Email: benjamin.chiong@griffithuni.edu.au
Project: DMS Travel
*/

// Objects 
var controller = {};
var facebook = {};
var view = {};
var facebookAuth = {};
var weather = {}


$(document).ready(function() {
    
    $('#backButton').hide();
    $('#target-logoutbutton').hide();
    $('#goButton').click(function() {

        $('#splashScreen').hide();
        $('#boxAnimation').hide();
        $('#splash').slideUp();
        $('#gallery').show();
        $('.draggable').draggable();         
        
    });
  
    $('#loginBtn').click(function(){
        facebookAuth.login(view.showLoginDisplay, view.displayThumb);
        weather.getWeatherData();
    });
    
    $('#logoutBtn').click(function(){
        console.log('Logout clicked');
        FB.logout(function(){
            facebookAuth.revokePermission(); // to revoke user's permission
            FB.getLoginStatus(function(response){
            console.log(response)
            view.showLogOutDisplay();
            });
        });
    });
    
    
    $('#gallery figure').click(function(){
        console.log($(this).attr('data-val'));
        console.log($(this).data('val'));
    })

    $('#gallery figure button').click(function(){
        console.log($(this).attr('data-val'));
        console.log($(this).data('val'));
    })    
});


// Setup FB SDK
$(function(){

    $.ajaxSetup({ cache: true });
    $.getScript("//connect.facebook.net/en_US/sdk.js", function(){
        FB.init({
            appId: facebook.APPID,
            version: 'v2.8' // or v2.1, v2.2, v2.3, ...
        });
       
        FB.getLoginStatus(function(response){
          console.log(response); 
        });
       

    });

});


// Display call back

controller.displayCallback = function (photos) {

    console.log("there login call back")

}




