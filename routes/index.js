var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js')
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/results', function(req,res,next){
  let pageNo = parseInt(req.query.pageNo);
    let size = parseInt(req.query.size);
    let query = {};
    if(pageNo < 0 || pageNo === 0 ){
        response = {"error": true, "message": "invalid"};
        return res.send(response);
    }
    query.skip = size * (pageNo - 1 );
    query.limit = size;
    User.find({},{}, query, function(err,data){
        if(err){
            response = {"error": true,"message": "error fetching data"}
        } else {
            response = {"success": true,"message": data}
        }
            res.json({
            status: "success",
            message: "Comments retrieved successfully",
            data: response
        });
    })
})

router.get('/records', function(req, res, next) {
 return User.find( function( err, clients ) {
  if( !err ) {
        res.json(clients);
      } else {
        return console.log( err );
      }                             
  });
});

router.post('/', function(req, res, next) {
   const { name, email, subject, message } = req.body;
   let user = new User({
      name,
      email,
      subject,
      message
    });  
    

    user.save(function(err, Person){
      if(err)
        console.log(err);
      else
        console.log('Success');
    });
   res.json(user);

  //  if(!personInfo.name || !personInfo.email || !personInfo.subject && !personInfo.message){
  //   res.send();
  // } else {

  //   var c=1;
  //   Comment.findOne({},function(err,data){
     
  //     if (data) {
  //       console.log("if");
  //        c = data.unique_id + 1;
  //     }

  //     var newPerson = new Comment({
  //       unique_id:c,
  //       name: personInfo.name,
  //       email: personInfo.email,
  //       subject: personInfo.subject,
  //       message: personInfo.message
  //     });

  //     newPerson.save(function(err, Person){
  //       if(err)
  //         console.log(err);
  //       else
  //         console.log('Success');
  //     });
      
  //   }).sort({_id: -1}).limit(1);

  // }
  // res.json({Success:'1'});
});

router.get('/show', function(req, res, next) {
  //res.json({ "data": "available"});
  Comment.find(function(err, response){
    res.json(response);
  });

});

router.put('/user/:id', function(req, res) {
  var id = req.params.id;
  console.log("id"+id);
  var personInfo = req.body;
  console.log()

  User.update({unique_id:id}, {
    username: personInfo.username, 
    fullname: personInfo.fullname, 
    age: personInfo.age
  }, function(err, rawResponse) {
   console.log(rawResponse);
 });

});

router.delete('/user/:id', function(req, res) {
  var id = req.params.id;
  console.log("id"+id);

  /*User.find({unique_id:id}, function(err, data) {
    data.remove();
  });*/
  User.findOneAndRemove({'unique_id' : id}, function (err,offer){
    console.log('asa');
  });
  res.send("Success");
});

module.exports = router;
