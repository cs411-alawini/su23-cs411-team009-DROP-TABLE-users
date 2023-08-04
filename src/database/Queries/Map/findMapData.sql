SELECT map_table.Latitudes, map_table.Longitudes 
FROM Courses_Table INNER JOIN map_table ON Courses_Table.BuildingName = map_table.BuildingName 
WHERE Courses_Table.CRN IN (?, ?);