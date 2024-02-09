-- DROP DATABASE TaskTest;
CREATE DATABASE TaskTest;

USE TaskTest;


CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255),
    EmploymentType ENUM('Full Time', 'Contractor', 'Apprentice', 'Intern') NOT NULL,
    -- You can add other mentor attributes here
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE MentorMenteeAssignments (
    AssignmentID INT PRIMARY KEY AUTO_INCREMENT,
    MentorID INT NOT NULL,
    MenteeID INT NOT NULL,
    AssignedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (MentorID) REFERENCES Employees(EmployeeID),
    FOREIGN KEY (MenteeID) REFERENCES Employees(EmployeeID),
    CONSTRAINT chk_Mentor_Mentee CHECK (MentorID != MenteeID)
);

CREATE TABLE Tasks (
    TaskID INT PRIMARY KEY AUTO_INCREMENT,
    EmployeeID INT,
    TaskNumber VARCHAR(15),
    TaskURL VARCHAR(100),
    Description TEXT,
    DueDate DATE,
    TaskType ENUM('UI', 'Cypress', 'Junit', 'Service') NOT NULL,
    -- Any other task-related fields
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

DELIMITER $$

CREATE TRIGGER Before_Task_Insert
BEFORE INSERT ON Tasks
FOR EACH ROW
BEGIN 
    SET NEW.TaskURL = CONCAT('http://simplecompany.com/Task', LOWER(NEW.TaskNumber));
END$$

DELIMITER ;
mvn clean install
mvn spring-boot:run


DELIMITER $$

CREATE TRIGGER Before_Tasks_Insert
BEFORE INSERT ON Tasks
FOR EACH ROW
BEGIN
    -- Calculate the current day and the number of days until the next Tuesday
    SET @dayOfWeek = DAYOFWEEK(CURDATE()); -- Finds out the day of the week for today
    SET @daysUntilNextTuesday = CASE
        WHEN @dayOfWeek <= 3 THEN 3 - @dayOfWeek -- If today is Sunday, Monday, or Tuesday
        ELSE 10 - @dayOfWeek -- For Wednesday to Saturday
    END;

    -- Calculate the DueDate to be a Tuesday at least two weeks from today
    SET NEW.DueDate = DATE_ADD(CURDATE(), INTERVAL (@daysUntilNextTuesday + 14) DAY);
END$$

DELIMITER ;


-- SELECT Mentees.Name AS MenteeName, Tasks.Description, Tasks.DueDate, Tasks.Status
-- FROM Mentees
-- JOIN Tasks ON Mentees.MenteeID = Tasks.MenteeID
-- WHERE Mentees.MentorID = 1; -- Replace ? with the selected MentorID


INSERT INTO `TaskTest`.`Employees` (`Name`, `EmploymentType`) VALUES ('Patty Mayonaise', 'Full Time');
INSERT INTO `TaskTest`.`Employees` (`Name`, `EmploymentType`) VALUES ('Simon Dubois', 'Full Time');
INSERT INTO `TaskTest`.`Employees` (`Name`, `EmploymentType`) VALUES ('Paul Smith', 'Full Time');
INSERT INTO `TaskTest`.`Employees` (`Name`, `EmploymentType`) VALUES ('Phillip Huge', 'Full Time');

-- Inserting mentees (Other Employment Types)
INSERT INTO `TaskTest`.`Employees` (`Name`, `EmploymentType`) VALUES ('Melly Pants', 'Intern');
INSERT INTO `TaskTest`.`Employees` (`Name`, `EmploymentType`) VALUES ('Heidi Jarl', 'Contractor');
INSERT INTO `TaskTest`.`Employees` (`Name`, `EmploymentType`) VALUES ('Richard Shoe', 'Apprentice');
INSERT INTO `TaskTest`.`Employees` (`Name`, `EmploymentType`) VALUES ('Kelvin Lowe', 'Apprentice');
INSERT INTO `TaskTest`.`Employees` (`Name`, `EmploymentType`) VALUES ('Smack Dab', 'Intern');
INSERT INTO `TaskTest`.`Employees` (`Name`, `EmploymentType`) VALUES ('Benny Hilltop', 'Contractor');
INSERT INTO `TaskTest`.`Employees` (`Name`, `EmploymentType`) VALUES ('Warren Spelling', 'Apprentice');
INSERT INTO `TaskTest`.`Employees` (`Name`, `EmploymentType`) VALUES ('Clearly Fuzzy', 'Intern');
INSERT INTO `TaskTest`.`Employees` (`Name`, `EmploymentType`) VALUES ('Avery Label', 'Intern');

INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (5, '948', 'Fill out expense reports', 'Service');
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (6, '523', 'Schedule meetings', 'Junit);
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (8, '724', 'Deal with email overload', 'Cypress');
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (7, '421', 'Data entry', 'UI');
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (7, '623', 'Clean up digital files', 'Cypress');
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (13, '121', 'Attend unnecessary meetings', 'UI');
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (12, '842', 'Troubleshooting tech issues', 'Cypress');
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (10, '314', 'Create reports', 'UI');
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (9, '153', 'Chase people for responses', 'Junit);
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (11, '916', 'Manual reconciliation of accounts', 'Service');
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (12, '235', 'Profread documents', 'Junit);
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (13, '613', 'File paperwork', 'Cypress');
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (5, '464', 'Update software', 'UI');
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (9, '531', 'Clean workspaces', 'Junit);
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (6, '464', 'Take inventory', 'Cypress');
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (5, '693', 'Train on compliance', 'Service');
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (12, '338', 'Manage subscriptions and memberships');
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (9, '814', 'Organize retirement party', 'Junit);
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (10, '763', 'Deal with spam calls and emails', 'Service');
INSERT INTO `TaskTest`.`Tasks` (`EmployeeID`, `TaskNumber`, `Description`, 'TaskType') VALUES (11, '918', 'Wait on hold for copier tech support', 'Service');


SELECT EmployeeID, Name FROM Employees WHERE EmployeeID IN (1, 2);
SELECT EmployeeID, Name FROM Employees WHERE EmploymentType = 'Full Time';
SELECT EmployeeID, Name FROM Employees WHERE EmploymentType != 'Full Time';
INSERT INTO Employees (Name, EmploymentType) VALUES ('Mentor Name', 'Full Time');
INSERT INTO Employees (Name, EmploymentType) VALUES ('Mentee Name', 'Intern');
INSERT INTO MentorMenteeAssignments (MentorID, MenteeID) VALUES (1, 7);
CREATE VIEW MentorMenteeView AS
SELECT 
    m.Name AS MentorName,
    e.Name AS MenteeName,
    ma.AssignedAt
FROM MentorMenteeAssignments ma
JOIN Employees m ON ma.MentorID = m.EmployeeID
JOIN Employees e ON ma.MenteeID = e.EmployeeID;
SELECT * FROM MentorMenteeView;

SELECT DISTINCT e.EmployeeID, e.Name
FROM Employees e
LEFT JOIN MentorMenteeAssignments mma ON e.EmployeeID = mma.MentorID
WHERE e.EmploymentType = 'Full Time' OR mma.MentorID IS NOT NULL;

INSERT INTO `TaskTest`.`MentorMenteeAssignments` (`MentorID`, `MenteeID`) VALUES ('3', '8');
INSERT INTO `TaskTest`.`MentorMenteeAssignments` (`MentorID`, `MenteeID`) VALUES ('2', '6');
INSERT INTO `TaskTest`.`MentorMenteeAssignments` (`MentorID`, `MenteeID`) VALUES ('4', '5');
INSERT INTO `TaskTest`.`MentorMenteeAssignments` (`MentorID`, `MenteeID`) VALUES ('1', '9');
INSERT INTO `TaskTest`.`MentorMenteeAssignments` (`MentorID`, `MenteeID`) VALUES ('2', '11');
INSERT INTO `TaskTest`.`MentorMenteeAssignments` (`MentorID`, `MenteeID`) VALUES ('3', '13');
INSERT INTO `TaskTest`.`MentorMenteeAssignments` (`MentorID`, `MenteeID`) VALUES ('4', '10');
INSERT INTO `TaskTest`.`MentorMenteeAssignments` (`MentorID`, `MenteeID`) VALUES ('1', '12');
INSERT INTO `TaskTest`.`MentorMenteeAssignments` (`MentorID`, `MenteeID`) VALUES ('14', '15');


