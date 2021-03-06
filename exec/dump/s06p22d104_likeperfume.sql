-- MySQL dump 10.17  Distrib 10.3.24-MariaDB, for Win64 (AMD64)
--
-- Host: stg-yswa-kr-practice-db-master.mariadb.database.azure.com    Database: s06p22d104
-- ------------------------------------------------------
-- Server version	5.6.47.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `likeperfume`
--

DROP TABLE IF EXISTS `likeperfume`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likeperfume` (
  `p_id` bigint(20) NOT NULL,
  `u_seq` bigint(20) NOT NULL,
  PRIMARY KEY (`p_id`,`u_seq`),
  KEY `FK2quur8ob2a4ylw0agipoi7v18` (`u_seq`),
  CONSTRAINT `FK2quur8ob2a4ylw0agipoi7v18` FOREIGN KEY (`u_seq`) REFERENCES `user` (`u_seq`),
  CONSTRAINT `FKde2qy49knpi9ee2cktqf9lfri` FOREIGN KEY (`p_id`) REFERENCES `perfume` (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likeperfume`
--

LOCK TABLES `likeperfume` WRITE;
/*!40000 ALTER TABLE `likeperfume` DISABLE KEYS */;
INSERT INTO `likeperfume` VALUES (21,6),(27,8),(182,4),(256,4),(260,4),(260,6),(260,8),(260,12),(491,4),(492,4),(512,4),(512,5),(513,2),(513,5),(513,11),(516,12),(768,4),(841,12),(1024,6),(1025,4),(1025,8),(1026,8),(1037,6),(1037,12),(1077,8);
/*!40000 ALTER TABLE `likeperfume` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 10:13:38
