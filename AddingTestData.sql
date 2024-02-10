use Demo;

DELIMITER $$

DROP TRIGGER IF EXISTS Before_PeerCodingTask_Insert$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER Before_PeerCodingTask_Insert
BEFORE INSERT ON peercodingtasks
FOR EACH ROW
BEGIN
    SET NEW.task_url = CONCAT('http://simplecompany.com/Task', LOWER(NEW.task_number));
    -- Include additional logic here if needed
END$$

DELIMITER ;


ALTER TABLE `newhireinfo` 
CHANGE COLUMN `EmployeeID` `EmployeeID` INT NOT NULL AUTO_INCREMENT;


INSERT INTO `demo`.`newhireinfo` (`Name`, `EmploymentType`, `Mentor`) VALUES ('Patty Mayonaise', 'Full Time', b'1');
INSERT INTO `demo`.`newhireinfo` (`Name`, `EmploymentType`, `Mentor`) VALUES ('Simon Dubois', 'Full Time', b'1');
INSERT INTO `demo`.`newhireinfo` (`Name`, `EmploymentType`, `Mentor`) VALUES ('Paul Smith', 'Full Time', b'1');
INSERT INTO `demo`.`newhireinfo` (`Name`, `EmploymentType`, `Mentor`) VALUES ('Phillip Huge', 'Full Time', b'1');

INSERT INTO `demo`.`newhireinfo` (`Name`, `EmploymentType`, `Mentor`) VALUES ('Melly Pants', 'Intern', b'0');
INSERT INTO `demo`.`newhireinfo` (`Name`, `EmploymentType`, `Mentor`) VALUES ('Heidi Jarl', 'Contractor', b'0');
INSERT INTO `demo`.`newhireinfo` (`Name`, `EmploymentType`, `Mentor`) VALUES ('Richard Shoe', 'Apprentice', b'0');
INSERT INTO `demo`.`newhireinfo` (`Name`, `EmploymentType`, `Mentor`) VALUES ('Kelvin Lowe', 'Apprentice', b'0');
INSERT INTO `demo`.`newhireinfo` (`Name`, `EmploymentType`, `Mentor`) VALUES ('Smack Dab', 'Intern', b'0');
INSERT INTO `demo`.`newhireinfo` (`Name`, `EmploymentType`, `Mentor`) VALUES ('Benny Hilltop', 'Contractor', b'0');
INSERT INTO `demo`.`newhireinfo` (`Name`, `EmploymentType`, `Mentor`) VALUES ('Warren Spelling', 'Apprentice', b'0');
INSERT INTO `demo`.`newhireinfo` (`Name`, `EmploymentType`, `Mentor`) VALUES ('Clearly Fuzzy', 'Intern', b'0');
INSERT INTO `demo`.`newhireinfo` (`Name`, `EmploymentType`, `Mentor`) VALUES ('Avery Label', 'Intern', b'0');

-- Assuming TaskID and EmployeeID mapping is correct; adjust EmployeeID as needed.
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (21, '948', 'Service');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (22, '523', 'Junit');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (24, '724', 'Cypress');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (23, '421', 'UI');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (23, '623', 'Cypress');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (29, '121', 'UI');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (28, '842', 'Cypress');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (26, '314', 'UI');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (25, '153', 'Junit');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (27, '916', 'Service');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (28, '235', 'Junit');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (29, '613', 'Cypress');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (21, '464', 'UI');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (25, '531', 'Junit');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (22, '464', 'Cypress');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (21, '693', 'Service');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (28, '338', 'Cypress');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (25, '814', 'Junit');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (26, '763', 'Service');
INSERT INTO `demo`.`peercodingtasks` (`EmployeeID`, `task_number`, `task_type`) VALUES (27, '918', 'Service');
