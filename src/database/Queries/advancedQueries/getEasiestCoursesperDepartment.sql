SELECT Title, Credits, avgGPA, Instructor
FROM Courses_Table
WHERE Department = ?
ORDER BY avgGPA DESC
LIMIT ?

/*
to run add this to server.js
app.post('/get_easy_courses_by_dept', (req, res) => {
  const { department, num_classes } = req.body;
  const findHighestClassByDept = fs.readFileSync('../src/database/Queries/advancedQueries/getEasiestCoursesperDepartment.sql').toString();
  connection.query(findHighestClassByDept, [department, num_classes], (err, results) => {
    if (err) 
    {
    console.error('Error executing the query:', err);
    }
    else
    {
    // send the results as the response
    console.log('Here are the results:');
    res.json(results);
    }
  });
*/
