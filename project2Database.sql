-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: project2
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `mentorassignments`
--

DROP TABLE IF EXISTS `mentorassignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mentorassignments` (
  `Mentor` varchar(100) NOT NULL,
  `Mentee` varchar(100) NOT NULL,
  PRIMARY KEY (`Mentor`,`Mentee`),
  KEY `fk_mentee` (`Mentee`),
  CONSTRAINT `fk_mentee` FOREIGN KEY (`Mentee`) REFERENCES `newhireinfo` (`Name`),
  CONSTRAINT `fk_mentor` FOREIGN KEY (`Mentor`) REFERENCES `newhireinfo` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentorassignments`
--

LOCK TABLES `mentorassignments` WRITE;
/*!40000 ALTER TABLE `mentorassignments` DISABLE KEYS */;
INSERT INTO `mentorassignments` VALUES ('John Mentor','Alice Mentee'),('John Mentor','Charlie Mentee'),('Bob Mentor','Daniel Mentee'),('John Mentor','David Mentee'),('Bob Mentor','Emily Mentee'),('Bob Mentor','Frank Mentee'),('Eve Mentor','Grace Mentee'),('Eve Mentor','Hannah Mentee'),('Eve Mentor','Isaac Mentee'),('Grace Mentor','Jacob Mentee'),('Grace Mentor','Lily Mentee'),('Grace Mentor','Olivia Mentee');
/*!40000 ALTER TABLE `mentorassignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newhireinfo`
--

DROP TABLE IF EXISTS `newhireinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newhireinfo` (
  `EmployeeID` int NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `EmploymentType` varchar(50) DEFAULT NULL,
  `Mentor` bit(1) DEFAULT NULL,
  PRIMARY KEY (`EmployeeID`),
  UNIQUE KEY `EmployeeID` (`EmployeeID`),
  UNIQUE KEY `unique_employeeid` (`EmployeeID`),
  KEY `idx_name` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newhireinfo`
--

LOCK TABLES `newhireinfo` WRITE;
/*!40000 ALTER TABLE `newhireinfo` DISABLE KEYS */;
INSERT INTO `newhireinfo` VALUES (1,'John Mentor','Full Time',_binary ''),(2,'Bob Mentor','Contractor',_binary ''),(3,'Eve Mentor','Apprentice',_binary ''),(4,'Grace Mentor','Intern',_binary ''),(5,'Alice Mentee','Full Time',_binary '\0'),(6,'Charlie Mentee','Full Time',_binary '\0'),(7,'David Mentee','Contractor',_binary '\0'),(8,'Frank Mentee','Full Time',_binary '\0'),(9,'Emily Mentee','Full-Time',_binary '\0'),(10,'Daniel Mentee','Part-Time',_binary '\0'),(11,'Grace Mentee','Contractor',_binary '\0'),(12,'Isaac Mentee','Full-Time',_binary '\0'),(13,'Hannah Mentee','Part-Time',_binary '\0'),(14,'Jacob Mentee','Full-Time',_binary '\0'),(15,'Lily Mentee','Contractor',_binary '\0'),(16,'Olivia Mentee','Part-Time',_binary '\0');
/*!40000 ALTER TABLE `newhireinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peercodingtasks`
--

DROP TABLE IF EXISTS `peercodingtasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peercodingtasks` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `task_url` varchar(255) DEFAULT NULL,
  `task_number` varchar(50) DEFAULT NULL,
  `mentor_developer` varchar(100) DEFAULT NULL,
  `mentee_developer` varchar(100) DEFAULT NULL,
  `task_type` varchar(50) DEFAULT NULL,
  `total_hours` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `fk_mentee_developer` (`mentee_developer`),
  CONSTRAINT `fk_mentee_developer` FOREIGN KEY (`mentee_developer`) REFERENCES `newhireinfo` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peercodingtasks`
--

LOCK TABLES `peercodingtasks` WRITE;
/*!40000 ALTER TABLE `peercodingtasks` DISABLE KEYS */;
INSERT INTO `peercodingtasks` VALUES (1,'http://example.com/task1','T123','John Mentor','Alice Mentee','UI',10.50),(2,'http://example.com/task2','T124','Bob Mentor','Charlie Mentee','Cypress',8.75),(3,'http://example.com/task3','T125','Eve Mentor','David Mentee','Service',15.25),(4,'http://example.com/task4','T126','Grace Mentor','Frank Mentee','Junit',12.00);
/*!40000 ALTER TABLE `peercodingtasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `registration_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'john_mentor','hashed_password','john.doe@example.com','2024-02-02 19:09:57');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;