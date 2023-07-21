-- will return course info into server.js given a CRN and Semster
SELECT *
FROM Courses_Table
WHERE CRN = ? AND Semester = ?