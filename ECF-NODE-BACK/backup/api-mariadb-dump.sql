-- MariaDB dump 10.19  Distrib 10.7.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: aprex-api
-- ------------------------------------------------------
-- Server version	10.7.3-MariaDB-1:10.7.3+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(1,'admin','admin@admin.fr','$2b$04$kDaM1QTvRtAC7iUyA7XLrO95HGmk1PC8h0eqErJ9YL.9PYokmHrii','ADMIN',''),
(2,'user','user@user.fr','$2a$12$d6BJ1WiYdhZHL4qGSn6Bf.E99eVudrdg13L5xyH/Ag5QUY5DCiPq2','USER',''),
(3,'zulauf','zulauf@zulauf.fr','$2y$10$iJwA8PvZM5Z5Bpx1si3OpOKfebIaPd19mOI0rWMm98hP8n/ky/wci','USER',''),
(4,'hickle','hickle@hickle.fr','$2y$10$pi.Hf3UGiHmCdZ1jtoTMkOWe2CpOp33tP2gdZ7EzuUaR1B/iexRDe','USER',''),
(5,'crooks','crooks@crooks.fr','$2y$10$CwgeIOyBZNcqnCbhgSTupeRNtrIUxKA9O9Y.edKVy1/tIx/m4ll9u','USER','');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-09 12:49:03
