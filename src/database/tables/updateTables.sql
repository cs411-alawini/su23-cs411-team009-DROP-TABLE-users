--File to update Tables

DELIMITER //
CREATE PROCEDURE InsertUserLoginTable(IN NetId_l VARCHAR(10), IN email_l VARCHAR(255), IN password_l VARCHAR(255))
BEGIN
    INSERT INTO User_Login_Table (NetId, email, password)
    VALUES (NetId_l, email_l, password_l);
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE InsertCourseTable(
    IN CRN_l INT,
    IN Semester_l VARCHAR(20),
    IN Title_l VARCHAR(255),
    IN Department_l VARCHAR(255),
    IN Credits_l INT,
    IN BuildingName_l VARCHAR(255),
    IN Time_l VARCHAR(255),
    IN Day_l VARCHAR(255),
    IN Instructor_l VARCHAR(255),
    IN GenEdID_l INT,
    IN avgGPA_l REAL,
    IN Rating_l INT
)
BEGIN
    INSERT INTO Courses_Table (CRN, Semester, Title, Department, Credits, BuildingName, Time, Day, Instructor, GenEdID, avgGPA, Rating)
    VALUES (CRN_l, Semester_l, Title_l, Department_l, Credits_l, BuildingName_l, Time_l, Day_l, Instructor_l, GenEdID_l, avgGPA_l, Rating_l);
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE InsertGenEdTable(IN GenEdID_l INT, IN GenEdGroup_l VARCHAR(255))
BEGIN
    INSERT INTO GenEd_Table (GenEdID, GenEdGroup)
    VALUES (GenEdID_l, GenEdGroup_l);
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE InsertMapTable(
    IN BuildingName_l VARCHAR(255),
    IN Address_l VARCHAR(255),
    IN RoomNumber_l INT,
    IN Latitudes_l DECIMAL(9, 6),
    IN Longitudes_l DECIMAL(9, 6)
)
BEGIN
    INSERT INTO Map_Table (BuildingName, Address, RoomNumber, Latitudes, Longitudes)
    VALUES (BuildingName_l, Address_l, RoomNumber_l, Latitudes_l, Longitudes_l);
END //
DELIMITER ;

--example calls
--CALL InsertUserLogin_l('Kyle Kim', 'kk123@illinois.com', 'citeron11');
--CALL InsertCourse_l(81729, 'Fall 2023', 'Introduction to Embedded Programming', 'Computer Science', 3, 'ECE Building', '10:00 AM - 11:20 AM', 'Monday, Wednesday, Friday', 'Dr. Jabbari', 3, 3.11, 4);
--CALL InsertGenEd_l(3, 'Natural Sciences');
--CALL InsertMap_l('ECE Building', '306 N Wright St', 202, 40.7128, -74.0060);