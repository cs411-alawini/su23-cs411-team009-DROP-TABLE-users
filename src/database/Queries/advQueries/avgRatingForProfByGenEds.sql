SELECT Courses_Table.Instructor,AVG(Courses_Table.Rating) AS AvgRating
FROM Courses_Table LEFT JOIN GenEd_Table ON Courses_Table.GenEdID = GenEd_Table.GenEdID
WHERE GenEd_Table.GenEdGroup = ?
GROUP BY Courses_Table.Instructor