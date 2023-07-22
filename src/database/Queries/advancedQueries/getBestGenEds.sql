SELECT GenEd_Table.GenEdGroup, MAX(Courses_Table.Rating) AS MaxRating,Courses_Table.Title AS HighestRatedClass,AVG(Courses_Table.avgGPA) AS AvgGPA
FROM Courses_Table JOIN GenEd_Table ON Courses_Table.GenEdID = GenEd_Table.GenEdID
GROUP BY GenEd_Table.GenEdGroup
ORDER BY AvgGPA DESC;

/* this would require no user input and would only need to user to push a button on the html code

app.post('/get_best_genEdcourses', (res) => {
  const findBestGenEds = fs.readFileSync('../src/database/Queries/advancedQueries/getBestGenEds.sql').toString();
  connection.query(findBestGenEds, [department, num_classes], (err, results) => {
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