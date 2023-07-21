--used to delete data(rows) from tables given a primary key of the table

DELIMITER //
CREATE PROCEDURE DeleteUserLogin(IN NetId_l VARCHAR(10)) --need NetID
BEGIN
    DELETE FROM User_Login_Table
    WHERE NetId = NetId_l;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE DeleteCourse(IN CRN_l INT) --need CRN
BEGIN
    DELETE FROM Courses_Table
    WHERE CRN = CRN_l;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE DeleteGenEd(IN GenEdID_l INT) --need GenEdID
BEGIN
    DELETE FROM GenEd_Table
    WHERE GenEdID = GenEdID_l;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE DeleteMap(IN BuildingName_l VARCHAR(255)) --need Building Name
BEGIN
    DELETE FROM Map_Table
    WHERE BuildingName = BuildingName_l;
END //
DELIMITER ;