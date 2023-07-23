SELECT GenEd_Table.GenEdGroup AS GroupName, MAX(Courses_Table.Rating) AS MaxRating,Courses_Table.Title AS HighestRatedClass,AVG(Courses_Table.avgGPA) AS AvgGPA
FROM Courses_Table JOIN GenEd_Table ON Courses_Table.GenEdID = GenEd_Table.GenEdID
GROUP BY GenEd_Table.GenEdGroup,Courses_Table.Rating,Courses_Table.Title,Courses_Table.avgGPA
ORDER BY AvgGPA DESC;