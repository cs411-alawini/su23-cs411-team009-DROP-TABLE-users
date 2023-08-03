SELECT * 
FROM Enrollment_Table e 
JOIN Courses_Table c ON c.CRN = e.CRN
WHERE NetID LIKE ?
ORDER BY c.Semester ASC;