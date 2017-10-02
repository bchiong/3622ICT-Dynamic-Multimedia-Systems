/* 
Author: Benjamin Chiong
Email: benjamin.chiong@griffithuni.edu.au
Project: DMS Travel
*/

// Global Variables
facebookAuth.displayCallBack;
facebookAuth.displayCallBackForAlbum;


// login function to retrieve oAuthUser
// Retrieves the .authresonse and the access token
// also sets the permission parameters
// Get (RESTFUL) requests for fields: like, cover_photo, name, location, description
// Assigns reponses into an array of photo objects 

facebookAuth.login  = function(displayCallBack, displayCallBackForAlbum) {
    facebookAuth.displayCallBackForAlbum = displayCallBackForAlbum;
    FB.login(function(response){
       if (response.authResponse){
            facebook.accessToken = response.authResponse.accessToken;
            FB.api('/me', function(user){
                facebook.userid = user.id;
                facebook.username = user.name;
                facebookAuth.getPermission(user);
                facebook.displayCallBack = displayCallBack();
            });
           
            FB.api('/' + facebook.OBJECTID, 'GET',  {"fields":"description"},
                function(response) {
                    facebook.pageDescription = response.description;
                    facebook.displayCallBack = displayCallBack();
            });
            
            // TODO: Assign all the properties in the albumsObjects array here
            FB.api('/' + facebook.OBJECTID, 'GET', {"fields":"albums{location,likes,cover_photo,name},description,name"},
                function(response) {
                    var location;
                    var indicator = 0;
                    var albumId = '';
                    var albumName = '';
                    var coverId = '';
                    var coverUrl = '';
                    coverUrlArray = [];
                    var likesCount = 0;
                    albumIdArray = [];
                    albumObjects = [];
                    
                    
                    var size = response.albums.data.length
                    for (var i = 0; i < size; i++) {
                        
                        location = response.albums.data[i].location;
                        if (typeof location != "undefined") {
                        indicator = location.search(/australia/i);
                        }
                            
                        if (indicator > -1) {
                            albumObject = {};
                            coverId = response.albums.data[i].cover_photo.id;
                            albumIdArray.push(response.albums.data[i].id);
                            facebook.likesArray.push(response.albums.data[i].likes.data.length);
                            facebook.albumsName.push(response.albums.data[i].name);
                            facebook.coverIdArray.push(response.albums.data[i].cover_photo.id);
    
                            FB.api('/' + coverId, 'GET', {"fields":"picture"},
                                function(response) {

                            coverUrl = response.picture;
                            facebook.albumSource2.push(coverUrl);

                            
                            if (albumIdArray.length == facebook.albumSource2.length) {
                         // convert all array into an array of album objects
                                for (var j = 0; j < facebook.albumSource2.length; j++) {
                                    albumObject = {};
                                    albumObject["cid"] = facebook.coverIdArray[j];
                                    albumObject["name"] = facebook.albumsName[j];
                                    albumObject["likes"] = facebook.likesArray[j];
                                    albumObject["albumId"] = albumIdArray[j];
                                    albumObject["url"] = facebook.albumSource2[j];
                                    albumObjects[j] = albumObject;
                                    console.log(albumObjects);
                                }  
                                    facebookAuth.sortByLikes(albumObjects);
                                    facebookAuth.displayCallBackForAlbum(albumObjects);                                
                            }
                            });
                        } 
                    }
                });
        } 
    
    }, {scope: 'email,user_likes,publish_actions'});    
     // Note: if you need further permission then you need to specify the scope property. See lecture notes.

         
}

// Get methods
// Get (RESTFUL) Request from facebook for the likes,images, name and desctiption of photos in an album
facebookAuth.getPhotosFromAlbum = function(albumId) {
    
   
FB.api('/' + albumId, 'GET', {"fields":"photos{likes,images,name},description"},
  function(response) {

      var size = response.photos.data.length;
      var imageSize = 0;
      var photoHeight = 0;
      albumPhotos = [];
      
      for (var i = 0; i < size; i++) {
        albumPhotoObj = {};          
        //console.log(response.photos.data[i].likes.data.length); // like count
        console.log(response.photos.data[i].id); // image name
       // console.log("biggest " + response.photos.data[i].images[0].height);
        albumPhotoObj["id"] = response.photos.data[i].id
        albumPhotoObj["likes"] = response.photos.data[i].likes.data.length;
        albumPhotoObj["description"] = response.photos.data[i].name;
        albumPhotoObj["largestPhoto"] = response.photos.data[i].images[0].source 
        imageSize = response.photos.data[i].images.length;
        for(var j = 0; j < imageSize; j++) {
            photoHeight = response.photos.data[i].images[j].height;
            if (photoHeight == 320) {
                //console.log(response.photos.data[i].images[j].height); 
                //console.log(response.photos.data[i].images[j].source);
                albumPhotoObj["thumbnail"] = response.photos.data[i].images[j].source;
            }
        }
         
         albumPhotos[i] = albumPhotoObj;
       //  console.log(albumPhotos);
         view.displayAlbumPhotos(albumPhotos);
      }
  });    

}


// Function to sort likes in descending order 
facebookAuth.sortByLikes = function (albumObjects) {
    albumObjects.sort(function(a,b){
       return (b.likes - a.likes);
    });
   
}



// Post Methods
// Post (RESTFUL) Request from facebook for likes
facebookAuth.postLike = function (objectId) {
    FB.api('/'+objectId+'/likes', 'POST', {access_token: facebook.accessToken},
  function(response) {
      console.log(response);
  });
}

// Get permission
facebookAuth.getPermission = function() {
    $.get('https://graph.facebook.com/'+ facebook.userid +'/permissions?access_token='+ facebook.accessToken,
    function(permission) {
       // console.log(permission);    
       console.log(permission);
    });
}


// Delete Methods
// Delete (RESTFUL) Request from facebook for likes
facebookAuth.deleteLike = function (objectId) {
    FB.api('/'+objectId+'/likes', 'DELETE', {access_token: facebook.accessToken},
  function(response) {
      console.log(response);
  });    
}


// Revoke permission
facebookAuth.revokePermission  = function() {
    $.ajax({
       url: 'http://graph.facebook.com/' + facebook.userid + '/permissions?access_token=' + facebook.accessToken, type: 'DELETE',
       success: function(result) {
       }
    });
}

