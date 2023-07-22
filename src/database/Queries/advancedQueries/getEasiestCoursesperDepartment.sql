SELECT Title, Credits, avgGPA, Instructor
FROM Courses_Table
WHERE Department = ?
ORDER BY avgGPA DESC
LIMIT ?

/*
to run add this to server.js
app.post('/get_courses', (req, res) => {
  const { department, num_classes } = req.body;
  const findHighestClassByDept = fs.readFileSync('../src/database/Queries/advancedQueries/getEasiestCoursesperDepartment.sql').toString();
  connection.query(queries.findHighestClassByDept, [department, num_classes], (err, results) => {
    if (err) 
    {
    throw err;
    }
    else
    {
    // send the results as the response
    res.json(results);
    }
  });
*/
