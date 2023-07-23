var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var fs = require('fs');
var DROP_TABLE_db = mysql.createConnection({
                host: '34.71.86.68',
                user: 'root',
                password: 'YES',
                database: 'classicmodels' //changing this to match the table we add (might need to change this)
});

DROP_TABLE_db.connect;


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
app.get('/login', function(req, res) {
    res.render('user_login.ejs');
  });
  
  app.get('/search', function(req, res) {
    res.render('course_search.ejs');
  });
  
  app.get('/schedule', function(req, res) {
    res.render('schedule.ejs');
  });
  
  app.get('/admin', function(req, res) {
    res.render('admin.ejs');
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
    console.log("/createUser");
    DROP_TABLE_db.query(findEmail, [req.body.email], function(err, res1) {
      if (err) { 
        console.log(err)
      } 
      else if (res1.length >= 1) {
          res.send("Email Exists")
          // 2 second delay
          setTimeout(function(){
            console.log("Email Exists: Executed after 2 second");
          }, 2000);
          res.redirect('/login');
      } 
      else {
        // check if netid already exists
          DROP_TABLE_db.query(findNetId, [req.body.netid], function (err2, res2) {
              if (err2) {
                  console.log(err2)
              } 
              else if (res2.length >= 1) {
                  res.send("NetId Exists")
                  // 2 second delay
                  setTimeout(function(){
                    console.log("NetId Exists: Executed after 2 second");
                  }, 2000);
                  res.redirect('/login');
              } 
              else {
                  // add new user to database
                  DROP_TABLE_db.query(addUser, [req.body.netid, req.body.email, req.body.password], function (err3, res3) {
                      if (err3) {
                          console.log(err3)
                      }
                      else {
                        console.log("new user: " + req.body.netid + " added to database");
                        res.render('user_login_result', { info: res3 });
                      }
                  });
              }
          });
      }
  });
});

// post Request: Update User password\
// @desc update user's password in 'User_Login_Table'
// @req getting info from frontend
// @res sending info to frontend
app.post('/updateUserPassword', function (req,res) {
  console.log("/updateUserPassword");
    DROP_TABLE_db.query(updatePassword, [req.body.password,req.body.netid], (err1, result) => {
      if (err1) {
          console.log(err1)
      } else {
          console.log("new password updated: " + req.body.password);
          res.render('user_login_result', { info: result });
      }
  });
});

// post Request: Update User Email address
// @desc update user's email address in 'User_Login_Table'
// @req getting info from frontend
// @res sending info to frontend
app.post('/updateUserEmail', function(req,res) {
    console.log("/updateUserEmail");
    DROP_TABLE_db.query(updateEmail, [req.body.email,req.body.netid], function(err1, res1) {
      if (err1) {
          console.log(err1)
      } else {
          console.log("new email updated: " + req.body.email);
          res.render('user_login_result', { info: res1 });
      }
  });
});

// DELETE Request: Delete User
// @desc delete user from 'User_Login_Table'
// @req getting info from frontend
// @res sending info to frontend
app.post('/deleteUser', function (req,res) {
    console.log("/deleteUser");
    var netid = req.params.netid;
    DROP_TABLE_db.query(deleteUser, [netid], (err1, res1) => {
        if (err1) {
            console.log(err1)
        } else {
            res.send("Deleted Sucessfully");
        }
    });
});


// ------------------- Course Search Queries ------------------- //
// Basic Queries
const findCRN = fs.readFileSync('../src/database/Queries/Courses/findCRN.sql').toString();
const addCourse = fs.readFileSync('../src/database/Queries/Courses/addCourse.sql').toString();
const updateTitle = fs.readFileSync('../src/database/Queries/Courses/updateTitle.sql').toString();
const updateDept = fs.readFileSync('../src/database/Queries/Courses/updateDept.sql').toString();
const updateBuilding = fs.readFileSync('../src/database/Queries/Courses/updateBuilding.sql').toString();
const updateTime = fs.readFileSync('../src/database/Queries/Courses/updateTime.sql').toString();
const updateInstructor = fs.readFileSync('../src/database/Queries/Courses/updateInstructor.sql').toString();
const deleteCourse = fs.readFileSync('../src/database/Queries/Courses/deleteCourse.sql').toString();

// POST Request: Add New Courses
// @desc create new user and insert the information into 'User_Login_Table'
// @req getting information from frontend
// @res sending information to frontend
app.post('/addCourses', function(req, res) {
  console.log("/addCourses");
  DROP_TABLE_db.query(findCRN, [req.body.CRN], function(err, res1) {
    if (err) { 
      console.log(err)
    } 
    else if (res1.length >= 1) {
        res.send("Course Exists")
        // 2 second delay
        setTimeout(function(){
          console.log("Course Exists: Executed after 2 second");
        }, 2000);
        res.redirect('/admin');
    } 
    else {
        var CRN = req.body.CRN;
        var semester = req.body.semester;
        var title = req.body.title;
        var department = req.body.department;
        var credits = req.body.credits;
        var buildingName = req.body.buildingName;
        var start_time = req.body.start_time;
        var day = req.body.day;
        var instructor = req.body.instructor;
        var genedId = req.body.genedId;
        DROP_TABLE_db.query(addCourse, [CRN, semester,title,department,credits,buildingName,start_time,day,instructor,genedId,0,0], function (err3, res3) {
          if (err3) {
              console.log(err3)
          }
          else {
            console.log("new course added");
            res.send("New Course Added");
            // 2 second delay
            setTimeout(function(){
              console.log("Wait for 2 sec and back to /admin");
            }, 2000);
            res.redirect('/admin');
          }
      });
    }
  });
});

// post Request: Update Course info
// @req getting info from frontend
// @res sending info to frontend
app.post('/updateCourseInfo', function (req,res) {
  console.log("/updateCourseInfo");
  var CRN = req.body.CRN;
  DROP_TABLE_db.query(findCRN, [CRN], function(err, res1) {
    if (err) { 
      console.log(err)
    } 
    else if (res1.length == 0) {
        res.send("Course Not Exists")
        // 2 second delay
        setTimeout(function(){
          console.log("Course Not Exists: Executed after 2 second");
        }, 2000);
        res.redirect('/admin');
    } 
    else {
        var CRN = req.body.CRN;
        var title = req.body.title;
        if (title != null){
          DROP_TABLE_db.query(updateTitle, [title,CRN], function (err4, res3) {
            if (err4) {
                console.log(err4)
            }
          });
        }
        var department = req.body.department;
        if (department != null){
          DROP_TABLE_db.query(updateDept, [department,CRN], function (err5, res3) {
          if (err5) {
              console.log(err5)
          }
        });}
        var buildingName = req.body.buildingName;
        if (buildingName != null){
          DROP_TABLE_db.query(updateBuilding, [buildingName,CRN], function (err6, res3) {
          if (err6) {
              console.log(err6)
          }
        });}
        var start_time = req.body.start_time;
        if (start_time != null){
          DROP_TABLE_db.query(updateTime, [start_time,CRN], function (err7, res3) {
            if (err7) {
                console.log(err7)
            }
          });
        }
        var instructor = req.body.instructor;
        if (instructor != null){
          DROP_TABLE_db.query(updateInstructor, [instructor,CRN], function (err9, res3) {
            if (err9) {
                console.log(err9)
            }
          });
        }
        console.log("update sucessfully")
        res.send("Update Successfully");
        // 2 second delay
        setTimeout(function(){
          console.log("Update Successfully: Executed after 2 second");
        }, 2000);
        res.redirect('/admin');

    }
  });
});

// DELETE Request: Delete Course
// @req getting info from frontend
// @res sending info to frontend
app.post('/deleteCourse', function (req,res) {
  console.log("/deleteCourse");
  var CRN = req.params.CRN;
  DROP_TABLE_db.query(deleteCourse, [CRN], (err1, res1) => {
      if (err1) {
          console.log(err1)
      } else {
          res.send("Deleted Sucessfully");
          // 2 second delay
          setTimeout(function(){
            console.log("Course Not Exists: Executed after 2 second");
          }, 2000);
          res.redirect('/admin');
      }
  });
});


// POST Request: Search by Department
// @desc search courses by department from 'Course_Table'
// @req getting info from frontend
// @res sending info to frontend
app.post('/searchDept', function(req, res) {
  console.log("/searchDept");
  var deparmtent = req.body.deparmtent;
  var semester = req.body.semester;
  
  if (semester == null) {
    DROP_TABLE_db.query('SELECT * FROM Courses_Table WHERE Department = ? ORDER BY Semester', [deparmtent], function(err, result) {
      if (err) {
        res.send(err)
        return;
      }
      res.render('search_result', { classes: result });
    });  
  }
  else {  
    DROP_TABLE_db.query('SELECT * FROM Courses_Table WHERE Department = ? AND Semester = ?', [deparmtent,semester], function(err, result) {
      if (err) {
        res.send(err)
        return;
      }
      res.render('search_result', { classes: result });
  });}
});

// POST Request: Search by Instructor Name
// @desc search courses by instructor from 'Course_Table'
// @req getting info from frontend
// @res sending info to frontend
app.post('/searchInstr', function(req, res) {
  console.log("/searchInstr");
  var instructor = req.body.instructor;
  var semester = req.body.semester;

  if (semester == null) {
    DROP_TABLE_db.query('SELECT * FROM Courses_Table WHERE Instructor = ? ORDER BY Semester', [instructor], function(err, result) {
      if (err) {
        res.send(err)
        return;
      }
      res.render('search_result', { classes: result });
    });  
  }
  else {
    DROP_TABLE_db.query('SELECT * FROM Courses_Table WHERE Instructor = ? AND Semester = ?', [instructor,semester], function(err, result) {
      if (err) {
        res.send(err)
        return;
      }
      res.render('search_result', { classes: result });
    });
  }
});

// POST Request: Search by Rating
// @desc search courses by Rating from 'Course_Table'
// @req getting info from frontend
// @res sending info to frontend
app.post('/searchRating', function(req, res) {
  console.log("/searchRating");
  var Rating = req.body.Rating;
  var semester = req.body.semester;

  if (semester == null) {
    DROP_TABLE_db.query('SELECT * FROM Courses_Table WHERE Rating >= ? ORDER BY Semester', [Rating], function(err, result) {
      if (err) {
        res.send(err)
        return;
      }
      res.render('search_result', { classes: result });
    });  
  }
  else {
    DROP_TABLE_db.query('SELECT * FROM Courses_Table WHERE Rating >= ? AND Semester = ? ORDER BY Rating DESC', [Rating,semester], function(err, result) {
      if (err) {
        res.send(err)
        return;
      }
      res.render('search_result', { classes: result });
    });
  }
});


// advance Queries
const findBestGenEds = fs.readFileSync('../src/database/Queries/advQueries/getBestGenEds.sql').toString();
const findHighestClassByDept = fs.readFileSync('../src/database/Queries/advQueries/getEasiestCoursesperDepartment.sql').toString();


// POST Request: Get TOP N GPA courses
// @TODO Not advanced queries, need modification
// @desc search courses by Rating from 'Course_Table'
// @req getting info from frontend
// @res sending info to frontend
app.post('/advSearch1', function(req, res) {
  console.log("/advSearch1");
  var department = req.body.deparmtent;
  var count = req.body.count;

  DROP_TABLE_db.query(findHighestClassByDept, [department, count], function(err, result) {
    if (err) {
      console.error(err);
      return;
    }
    res.render('search_result',{classes: result})
  });
});

// POST Request: Get TOP N GPA GenEd courses
// @desc search courses by Rating from 'Course_Table'
// @req getting info from frontend
// @res sending info to frontend
app.post('/advSearch2', (res) => {
  console.log("/advSearch2");
  DROP_TABLE_db.query(findBestGenEds, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    res.render('search_result_adv2',{classes: result})
  });
});


app.listen(80, function () {
    console.log('Node app is running on port 80');
});
