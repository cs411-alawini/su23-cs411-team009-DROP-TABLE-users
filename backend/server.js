var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var fs = require('fs');
var connection = mysql.createConnection({
                host: '34.71.86.68',
                user: 'root',
                password: 'YES',
                database: 'classicmodels' //changing this to match the table we add (might need to change this)
});

connection.connect;


var app = express();

// set up ejs view engine 
app.set('views', path.join('..','frontend', 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering index.ejs */
app.get('/', function(req, res) {
  res.render('index', { title: 'Mark Attendance' });
});

/* response by navigate to user_login page */
app.get('/user_login', function(req, res) {
    res.render('user_login.ejs');
  });
  
  app.get('/search', function(req, res) {
    res.render('search.ejs');
  });
  
  app.get('/update', function(req, res) {
    res.render('update.ejs');
  });
  
  app.get('/delete', function(req, res) {
    res.render('delete.ejs');
  });
  
  app.get('/advanced_query', function(req, res) {
    res.render('advanced_query.ejs');
  });

 
// this code is executed when a user clicks the form submit button
app.post('/mark', function(req, res) {
  var netid = req.body.netid;
   
  var sql = `INSERT INTO attendance (netid, present) VALUES ('${netid}',1)`;



console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/success');
  });
});

 
// ------------------- User Login Table Queries ------------------- //

// SQL Util Queries for user Table
const findNetId = fs.readFileSync('../src/database/Queries/UserLogin/findNetId.sql').toString();
const findEmail = fs.readFileSync('../src/database/Queries/UserLogin/findEmail.sql').toString();
const addUser = fs.readFileSync('../src/database/Queries/UserLogin/addUser.sql').toString();
const deleteUser = fs.readFileSync('../src/database/Queries/UserLogin/deleteUser.sql').toString();
const updateEmail = fs.readFileSync('../src/database/Queries/UserLogin/updateEmail.sql').toString();
const updatePassword = fs.readFileSync('../src/database/Queries/UserLogin/updatePassword.sql').toString();

// POST Request: Create new User
// @desc create new user and insert the information into 'User_Login_Table'
// @req getting information from frontend
// @res sending information to frontend
app.post('/createUser', function(req, res) {
    DROP_TABLE_db.query(findEmail, [req.body.email], function(err, res1) {
      if (err) { 
        console.log(err)
      } 
      else if (res1.length >= 1) {
          res.send("Email Exists")
      } 
      else {
        // check if netid already exists
          DROP_TABLE_db.query(findNetId, [req.body.netid], function (err2, res2) {
              if (err2) {
                  console.log(err2)
              } 
              else if (res2.length >= 1) {
                  res.send("NetId Exists")
              } 
              else {
                  // add new user to database
                  DROP_TABLE_db.query(addUser, [req.body.netid, req.body.email, req.body.password], function (err3, res3) {
                      if (err3) {
                          console.log(err3)
                      }
                      else {
                        console.log("new user: " + req.body.netid + " added to database");
                        res.send("Account created");
                      }
                  });
              }
          });
      }
  });
});

// PUT Request: Update User password\
// @desc update user's password in 'User_Login_Table'
// @req getting info from frontend
// @res sending info to frontend
app.put('/updateUserPassword', function (req,res) {
  console.log("update password for" + req.body.netid);
  console.log(req.body.password);
    DROP_TABLE_db.query(updatePassword, [req.body.password,req.body.netid], (err1, res1) => {
      if (err1) {
          console.log(err1)
      } else {
          console.log("new password updated: " + req.body.password);
          res.send("Password updated")
      }
  });
});

// PUT Request: Update User Email address
// @desc update user's email address in 'User_Login_Table'
// @req getting info from frontend
// @res sending info to frontend
app.put('/updateUserEmail', function(req,res) {
  console.log("update email for" + req.body.netid);
    DROP_TABLE_db.query(updateEmail, [req.body.email,req.body.netid], function(err1, res1) {
      if (err1) {
          console.log(err1)
      } else {
          console.log("new email updated: " + req.body.email);
          res.send("email updated")
      }
  });
});

// DELETE Request: Delete User
// @desc delete user from 'User_Login_Table'
// @req getting info from frontend
// @res sending info to frontend
app.delete('/deleteUser', function (req,res) {
    var netid = req.params.netid;
    DROP_TABLE_db.query(deleteUser, [netid], (err1, res1) => {
        if (err1) {
            console.log(err1)
        } else {
            res.send("Deleted User");
        }
    });
});

const findCourseInfo = fs.readFileSync('../src/database/Queries/Courses/findCourseInfo.sql').toString();


app.get('/findCourseInfo', (req,res) => {
    // Execute the query against the database
    var CRN_l = req.params.CRN;
    var sem = req.params.semester;
    DROP_TABLE_db.query(findCourseInfo, [CRN_l], [sem] ,(err, result) => {
        if(err)
        {
            console.error('Error executing the query:', err);
        } 
        else 
        {
            // Display the results back to the user
            res.json(result);
        }
    });
});


app.listen(80, function () {
    console.log('Node app is running on port 80');
});
