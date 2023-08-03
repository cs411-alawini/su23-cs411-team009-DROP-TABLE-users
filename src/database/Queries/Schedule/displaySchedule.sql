SELECT * 
FROM enrollment_table e 
JOIN Courses_Table c ON c.NetID = e.NetID 
WHERE NetID LIKE ?
ORDER BY c.semester ASC;