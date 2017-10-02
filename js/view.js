/*
Author: Benjamin Chiong
Email: benjamin.chiong@griffithuni.edu.au
Project: DMS Travel
*/


// Global Variable
var htmlStr = ""; 

// View functions
// Takes album objects and display them
view.displayThumb = function(albumObjects) {

    var htmlStrForPhoto = "";
    $(document).ready(function(){
       var gallery = $('#gallery');
    });
    
    for (var i = 0; i < albumObjects.length; i++) {
        htmlStrForPhoto += '<figure data-val = "' + albumObjects[i].albumId + '"class="draggable"><img src="'+ albumObjects[i].url +'" alt="Photo '+ i +'"></a><figcaption>'+ albumObjects[i].name + '<span class ="likeformat"> Likes </span><span class ="counter">'  + albumObjects[i].likes + '</span></figcaption></figure>';    
    }

    $('#gallery').html(htmlStrForPhoto);
    
        $('#gallery figure').click(function(){
        console.log($(this).attr('data-val'));
        facebookAuth.getPhotosFromAlbum($(this).attr('data-val'));
        $('#gallery').hide();
    })
}

// Takes album photo objects and display them
view.displayAlbumPhotos = function(albumPhotoObjects) {

    $('#album').show();
    $('#backButton').show();
    var htmlStrForPhoto = "";
    $(document).ready(function(){
       var gallery = $('#album');
    });
    
    for (var i = 0; i < albumPhotoObjects.length; i++) {
        htmlStrForPhoto += '<figure data-val = "'+ albumPhotoObjects[i].id +'" class="draggable"><input data-val = "'+albumPhotoObjects[i].id+'" id = "'+ albumPhotoObjects[i].id + '" class = "buttonstyle"  type = "image" name = "like button"  src ="like-outline.png"></button><input data-val = "'+albumPhotoObjects[i].id+'" id = "liked'+ albumPhotoObjects[i].id + '" class = "buttonstyleliked"  type = "image" name = "like button"  src ="like-filled.png"></button><a href="'+ albumPhotoObjects[i].largestPhoto + '"' + 'data-lightbox="searchedimages"' +'data-title="' + albumPhotoObjects[i].description + '"' + '><img class="albumimage" src="'+ albumPhotoObjects[i].thumbnail +'" alt="Photo '+ i +'"></a><figcaption>'+ albumPhotoObjects[i].description + '<span class ="likeformat"> Likes </span><span class ="counter">'  + albumPhotoObjects[i].likes + '</span></figcaption></figure>';    
    
      var targetbutton = albumPhotoObjects[i].id;    

    }
    

    $('#album').html(htmlStrForPhoto);
    $('.buttonstyleliked').hide();
    
    $('#album figure').click(function(){
        var id = $(this).attr('data-val')
        facebookAuth.postLike($(this).attr('data-val'));
        $('#'+ id).hide();
        $('#liked'+ id).show();
        $('#liked' + id ).click(function(){
            facebookAuth.deleteLike(id);
            console.log("button clicked");
            $('#'+ id).show();
            $('#liked'+ id).hide();
            
        });
    }); 

    
    $('#backButton').click(function(){
        $('#album').hide();
        $('#gallery').slideDown();
        $('#backButton').hide();
    });
}

// Methods to dislpay HTML assets when logging in
view.showLoginDisplay = function() {
    $(document).ready(function(){
        $('#target-loginbutton').hide();
        $('#target-logoutbutton').show();
        $('#splashScreen').hide();
        $('#boxAnimation').hide();
        $('#splash').hide();
        $('#gallery').show();
        $('.draggable').draggable(); 

        // display user's name
        htmlStr = '<p> Hi! ' + facebook.username + '</p>'
        $('#userfullname').html(htmlStr);
        htmlStr = '<p>' +facebook.pageDescription+ '</p>'
        $('#pageDescription').html(htmlStr);
        $('#pageDescription').show();
    });

}

// Methods to hide and show HTML assets when logging out
view.showLogOutDisplay = function() {
  
        $(document).ready(function(){
            $('#target-loginbutton').show();
            $('#backButton').hide();
            $('#gallery').hide();
            $('#splashScreen').show();
            $('#boxAnimation').show();
            $('#target-logoutbutton').hide();
            htmlStr = "Log in here"
            $('#userfullname').html(htmlStr);
            $('#target-logoutbutton').hide();
            $('#pageDescription').hide();
    });
    
}

// Method to dislpay full name in html header
view.displayFullName = function (fullName) {
    var htmlStr = "";
    $(document).ready(function(){
       htmlStr = '<p> Hi! ' + fullName + '</p>'
       $('#userfullname').html(htmlStr);
    });
    
 
}

