var express = require('express');
var router = express.Router();
var User = require('../models/user');
var path = require("path");
const https = require('https')


//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords do not match");
    return next(err);
  }

  if (req.body.email &&
    req.body.firstname &&
    req.body.lastname &&
    req.body.city&&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      city:req.body.city,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/myhub');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/myhub');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/myhub', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          return res.sendFile(path.resolve(__dirname, "../public/myhub.html"));
          listEvents(auth);
        }
      }
    });
});


//==================Send data to the frontend==================== 
router.get("/api/feed", function(req,res){
  
  User.find({_id:req.session.userId}, function(err,data){
    console.log(data);
    res.json(data);
    var query = data[0].interests
    // console.log(query.forEach(bingWebSearch))
    // bingWebSearch(res,"sonic")
    
  })
})
//===================== setting feeds to db =============================
router.post("/api/addfeedfb", function(req,res){
  
  console.log(req.body);
  var newAdd =  req.body.add;
  console.log("The value of newAdd is " +newAdd)
  User.findOneAndUpdate({_id: req.session.userId}, {$push: {fbFeed: newAdd}}, console.log)
  return res.redirect('/myhub');        
})
router.post("/api/addfeedtwitter", function(req,res){
  
  console.log(req.body);
  var newAdd =  req.body.add;
  console.log("The value of newAdd is " +newAdd)
  User.findOneAndUpdate({_id: req.session.userId}, {$push: {twitterFeed: newAdd}}, console.log)
  return res.redirect('/myhub');        
})

router.post("/api/delete", function(req,res){
  var newAdd =  req.body.delete;
  console.log("Im requesting this to b deleted : " + newAdd)
  User.findOneAndUpdate({_id: req.session.userId}, {$pull: {interests: newAdd}}, console.log)
  return res.redirect('/myhub');      ;      
})

//===============================================================

router.post('/add', function (req, res, next) {
  console.log(req.body);
  var newAdd =  req.body.add;
  console.log("The value of newAdd is " +newAdd)
  User.findById(req.session.userId)
  .exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        var err = new Error('Not authorized! Go back!');
        err.status = 400;
        return next(err);
      } else {
        // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        User.findOneAndUpdate({_id: req.session.userId}, {$push: {interests: newAdd}}, console.log)
        return res.redirect('/myhub');        }
    }
  });
  
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});



// function bingWebSearch(tosend,query) {
//   https.get({
//     hostname: 'api.cognitive.microsoft.com',
//     path:     '/bing/v7.0/search?q=' + encodeURIComponent(query)+"&count=2",
//     headers:  {'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY },
//   }, res => {
//     let body = ''
//     res.on('data', part => body += part)
//     res.on('end', () => {
//       for (var header in res.headers) {
//         if (header.startsWith("bingapis-") || header.startsWith("x-msedge-")) {
//           console.log(header + ": " + res.headers[header])
//         }
//       }
//       console.log('\nJSON Response:\n')
//       console.dir(JSON.parse(body), { colors: false, depth: null })
//       tosend(JSON.parse(body), { colors: false, depth: null })
//     })
//     res.on('error', e => {
//       console.log('Error: ' + e.message)
//       throw e
//     })
//   })
// }




module.exports = router;
