-- User_Login_Table
CREATE TABLE User_Login_Table (
  NetId VARCHAR(10) PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255)
);

-- Courses_Table
CREATE TABLE Courses_Table (
  CRN INT PRIMARY KEY,
  Semester VARCHAR(20),
  Title VARCHAR(255),
  Department VARCHAR(255),
  Credits INT,
  BuildingName VARCHAR(255),
  Time VARCHAR(255),
  Day VARCHAR(255),
  Instructor VARCHAR(255),
  GenEdID INT,
  avgGPA REAL,
  Rating INT,
  FOREIGN KEY (BuildingName) REFERENCES Map_Table(BuildingName),
  FOREIGN KEY (GenEdID) REFERENCES GenEd_Table(GenEdID)
);

-- GenEd_Table for looking up gened reqs
CREATE TABLE GenEd_Table (
  GenEdID INT PRIMARY KEY,
  GenEdGroup VARCHAR(255)
);

-- Map_Table for using with bingMaps API
CREATE TABLE Map_Table (
  BuildingName VARCHAR(255) PRIMARY KEY,
  Address VARCHAR(255),
  RoomNumber INT,
  Latitudes DECIMAL(9,6),
  Longitudes DECIMAL(9,6)
);
