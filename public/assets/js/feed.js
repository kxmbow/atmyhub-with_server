$(document).ready(function(){
   

  function twitterFeed(param){
  $('.social-feed-container-twitter').socialfeed({
        // TWITTER
        twitter:{
          accounts: param,                      //Array: Specify a list of accounts from which to pull tweets
          limit: 2,                                   //Integer: max number of tweets to load
          consumer_key: 'CxwYskHCu4QC3VPTSp6O8FXWu',          //String: consumer key. make sure to have your app read-only
          consumer_secret: '4XY357eY2uej7RYTrASAH9LWqKuqdQwFkjtk1rcCll9vsLns3L' //String: consumer secret key. make sure to have your app read-only
        },

        // GENERAL SETTINGS
        length:400                                      //Integer: For posts with text longer than this length, show an ellipsis.
  });
  }
  

  function fbFeeds(param){
    $('.social-feed-container-fb').socialfeed({
    // FACEBOOK
      facebook:{
      accounts: param,  //Array: Specify a list of accounts from which to pull wall posts
      limit: 2,                                   //Integer: max number of posts to load
      access_token: '1499245463488595|ef6e82bb6d0d31f7e2137ec57effb353'  //String: "APP_ID|APP_SECRET"
    },
    // GENERAL SETTINGS
      length:400,
      date_locale: "en",                                      //Integer: For posts with text longer than this length, show an ellipsis.
    });
  }

  function igFeed(){
    $('.social-feed-container-ig').socialfeed({
      instagram:{
        accounts: ["@tester9362"],  //Array: Specify a list of accounts from which to pull posts
        limit: 10,                                   //Integer: max number of posts to load
        client_id: '0490bdeb6f90478c8c9d86f55313e0a1',       //String: Instagram client id (option if using access token)
        access_token: '6244861332.1677ed0.d971f4e355864dbe8734e1e2f7db6a49' //String: Instagram access token
    },
    // GENERAL SETTINGS
      length:400,
      date_locale: "en",
      show_media: true                                       //Integer: For posts with text longer than this length, show an ellipsis.
    });
  }
  
  
  
    //============== Getting fb access token ===========================================
    // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
  
    var token = response.authResponse.accessToken;
    
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '1499245463488595',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    
    FB.api('/me', function(response) {
     
    document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

  //================= Running functions to display social media stream =================================
$.ajax({
    method: "get",
    url: "/api/feed"
}).done(function(data){
    
    fbFeeds(data[0].fbFeed);
    twitterFeed(data[0].twitterFeed);
    
})
  
    
});