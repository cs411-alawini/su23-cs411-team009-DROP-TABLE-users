-- Select the top 10 courses with the highest GPA for the given department and semester
CREATE FUNCTION getHighestCoursesGPA(
  @department VARCHAR(255),
  @semester VARCHAR(4)
)
RETURNS TABLE
AS
RETURN
  SELECT TOP 10 c.CRN, c.Title, c.Department, g.avgGPA
  FROM Courses_Table c
  INNER JOIN GPA_Table g ON c.CRN = g.CRN AND c.Semester = g.Semester
  WHERE c.Department = @department AND c.Semester = @semester
  ORDER BY g.avgGPA DESC;

-- Select the course details for the 
-- student's enrolled courses
-- grouped by day (make it like a schedule)
CREATE FUNCTION getStudentEnrolledCourses(
  @netId VARCHAR(10), -- Input parameter: student NetID
  @semester VARCHAR(4) -- Input parameter: semester
)
RETURNS TABLE
AS
RETURN
  SELECT c.Title, c.CRN, c.BuildingName, c.Day
  FROM User_Login_Table u
  INNER JOIN Courses_Table c ON u.NetId = @netId AND c.Semester = @semester
  GROUP BY c.Title, c.CRN, c.BuildingName, c.Day
  ORDER BY c.Day, c.Time;