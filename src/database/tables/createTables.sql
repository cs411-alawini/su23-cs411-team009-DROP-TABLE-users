
CREATE TABLE User_Login_Table (
  NetId VARCHAR(10) PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255)
);


CREATE TABLE Courses_Table (
  CRN INT,
  Semester VARCHAR(4),
  Title VARCHAR(255),
  Department VARCHAR(255),
  Credits INT,
  BuildingName VARCHAR(255),
  Time VARCHAR(255),
  Day VARCHAR(255),
  Instructor VARCHAR(255),
  GenEdID INT,
  PRIMARY KEY (CRN, Semester),
  FOREIGN KEY (BuildingName) REFERENCES Map_Table(BuildingName),
  FOREIGN KEY (GenEdID) REFERENCES GenEd_Table(GenEdID)
);


CREATE TABLE GenEd_Table (
  GenEdID INT PRIMARY KEY,
  GenEdGroup VARCHAR(255)
);


CREATE TABLE GPA_Table (
  GPA_ID INT PRIMARY KEY,
  CRN INT,
  Semester VARCHAR(4),
  avgGPA REAL,
  Rate INT,
  FOREIGN KEY (CRN) REFERENCES Courses_Table(CRN),
  FOREIGN KEY (Semester) REFERENCES Courses_Table(Semester)
);


CREATE TABLE Map_Table (
  BuildingName VARCHAR(255) PRIMARY KEY,
  Address VARCHAR(255),
  Latitudes DECIMAL(9,6),
  Longitudes DECIMAL(9,6)
);