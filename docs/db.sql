-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: mktayal_ufesm
-- ------------------------------------------------------
-- Server version	5.5.46-0ubuntu0.14.04.2

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
-- Table structure for table `appsection`
--

DROP TABLE IF EXISTS `appsection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appsection` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `sectionname` varchar(50) NOT NULL,
  `title` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appsection`
--

LOCK TABLES `appsection` WRITE;
/*!40000 ALTER TABLE `appsection` DISABLE KEYS */;
/*!40000 ALTER TABLE `appsection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset`
--

DROP TABLE IF EXISTS `asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asset` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset`
--

LOCK TABLES `asset` WRITE;
/*!40000 ALTER TABLE `asset` DISABLE KEYS */;
/*!40000 ALTER TABLE `asset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatter`
--

DROP TABLE IF EXISTS `chatter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chatter` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `response` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatter`
--

LOCK TABLES `chatter` WRITE;
/*!40000 ALTER TABLE `chatter` DISABLE KEYS */;
/*!40000 ALTER TABLE `chatter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactus`
--

DROP TABLE IF EXISTS `contactus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contactus` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `phonenumber` varchar(50) NOT NULL,
  `message` text,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactus`
--

LOCK TABLES `contactus` WRITE;
/*!40000 ALTER TABLE `contactus` DISABLE KEYS */;
INSERT INTO `contactus` VALUES (1,'poker',NULL,NULL,'pp',NULL,'2015-10-11 19:26:35'),(2,'poker john','a 101','poker@hon','9999','give me a line','2015-10-11 19:29:39'),(3,'john mo','a 209','john@mo','99099','drop me a line','2015-10-11 19:33:04'),(4,'ppp',NULL,NULL,'777','ppp','2015-10-16 00:43:34'),(5,'ppp',NULL,NULL,'777','ppp','2015-10-16 00:47:00'),(6,'ppp',NULL,NULL,'777','ppp','2015-10-16 00:47:03'),(7,'ppp',NULL,NULL,'777','ppp','2015-10-16 00:47:06'),(8,'oooo',NULL,NULL,'888','oooo','2015-10-16 00:49:02');
/*!40000 ALTER TABLE `contactus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion`
--

DROP TABLE IF EXISTS `discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discussion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `starter` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion`
--

LOCK TABLES `discussion` WRITE;
/*!40000 ALTER TABLE `discussion` DISABLE KEYS */;
/*!40000 ALTER TABLE `discussion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion_map_chatter`
--

DROP TABLE IF EXISTS `discussion_map_chatter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discussion_map_chatter` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `discussionid` int(10) unsigned NOT NULL,
  `chatterid` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `discussionid` (`discussionid`),
  KEY `chatterid` (`chatterid`),
  CONSTRAINT `discussion_map_chatter_ibfk_1` FOREIGN KEY (`discussionid`) REFERENCES `discussion` (`id`),
  CONSTRAINT `discussion_map_chatter_ibfk_2` FOREIGN KEY (`chatterid`) REFERENCES `chatter` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion_map_chatter`
--

LOCK TABLES `discussion_map_chatter` WRITE;
/*!40000 ALTER TABLE `discussion_map_chatter` DISABLE KEYS */;
/*!40000 ALTER TABLE `discussion_map_chatter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `galleryimage`
--

DROP TABLE IF EXISTS `galleryimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `galleryimage` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(256) DEFAULT NULL,
  `subtitle` varchar(256) DEFAULT NULL,
  `position` tinyint(3) NOT NULL,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galleryimage`
--

LOCK TABLES `galleryimage` WRITE;
/*!40000 ALTER TABLE `galleryimage` DISABLE KEYS */;
INSERT INTO `galleryimage` VALUES (1,NULL,NULL,2,'gallery-image-01.png'),(2,NULL,NULL,3,'gallery-image-02.png'),(3,NULL,NULL,4,'gallery-image-03.png'),(4,NULL,NULL,5,'gallery-image-04.png'),(5,NULL,NULL,6,'gallery-image-05.png'),(6,NULL,NULL,7,'gallery-image-06.png'),(7,NULL,NULL,8,'gallery-image-07.png'),(8,NULL,NULL,9,'gallery-image-08.png'),(9,NULL,NULL,10,'gallery-image-09.png'),(10,NULL,NULL,11,'gallery-image-10.png'),(11,NULL,NULL,12,'gallery-image-11.png'),(12,NULL,NULL,13,'gallery-image-12.png'),(13,NULL,NULL,14,'gallery-image-13.png'),(14,NULL,NULL,15,'gallery-image-14.png'),(15,NULL,NULL,16,'gallery-image-15.png'),(16,NULL,NULL,17,'gallery-image-16.png'),(17,NULL,NULL,18,'gallery-image-17.png'),(18,NULL,NULL,19,'gallery-image-18.png'),(19,NULL,NULL,20,'gallery-image-19.png'),(20,NULL,NULL,21,'gallery-image-20.png'),(21,NULL,NULL,22,'gallery-image-21.png'),(22,NULL,NULL,23,'gallery-image-22.png'),(23,NULL,NULL,24,'gallery-image-23.png'),(24,NULL,NULL,25,'gallery-image-24.png'),(25,NULL,NULL,26,'gallery-image-25.png'),(26,NULL,NULL,27,'gallery-image-26.png'),(27,NULL,NULL,28,'gallery-image-27.png'),(28,NULL,NULL,29,'gallery-image-28.png'),(29,NULL,NULL,30,'gallery-image-29.png'),(30,NULL,NULL,31,'gallery-image-30.png'),(31,NULL,NULL,32,'gallery-image-31.png'),(32,NULL,NULL,33,'gallery-image-32.png'),(33,NULL,NULL,34,'gallery-image-33.png'),(34,NULL,NULL,1,'secretary-general.33184af9.jpg');
/*!40000 ALTER TABLE `galleryimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_map_section`
--

DROP TABLE IF EXISTS `member_map_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member_map_section` (
  `id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `memberid` smallint(5) unsigned NOT NULL,
  `sectionid` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `memberid` (`memberid`),
  KEY `sectionid` (`sectionid`),
  CONSTRAINT `member_map_section_ibfk_1` FOREIGN KEY (`memberid`) REFERENCES `registeredmember` (`id`),
  CONSTRAINT `member_map_section_ibfk_2` FOREIGN KEY (`sectionid`) REFERENCES `appsection` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_map_section`
--

LOCK TABLES `member_map_section` WRITE;
/*!40000 ALTER TABLE `member_map_section` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_map_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menuitem`
--

DROP TABLE IF EXISTS `menuitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menuitem` (
  `id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `position` tinyint(2) NOT NULL,
  `level` tinyint(1) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menuitem`
--

LOCK TABLES `menuitem` WRITE;
/*!40000 ALTER TABLE `menuitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `menuitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menuitem_map_pageaggregate`
--

DROP TABLE IF EXISTS `menuitem_map_pageaggregate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menuitem_map_pageaggregate` (
  `id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `menuitemid` tinyint(2) unsigned NOT NULL,
  `pageaggregateid` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `menuitemid` (`menuitemid`),
  KEY `pageaggregateid` (`pageaggregateid`),
  CONSTRAINT `menuitem_map_pageaggregate_ibfk_1` FOREIGN KEY (`menuitemid`) REFERENCES `menuitem` (`id`),
  CONSTRAINT `menuitem_map_pageaggregate_ibfk_2` FOREIGN KEY (`pageaggregateid`) REFERENCES `pageaggregate` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menuitem_map_pageaggregate`
--

LOCK TABLES `menuitem_map_pageaggregate` WRITE;
/*!40000 ALTER TABLE `menuitem_map_pageaggregate` DISABLE KEYS */;
/*!40000 ALTER TABLE `menuitem_map_pageaggregate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menuitem_map_pageitem`
--

DROP TABLE IF EXISTS `menuitem_map_pageitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menuitem_map_pageitem` (
  `id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `menuitemid` tinyint(2) unsigned NOT NULL,
  `pageitemid` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `menuitemid` (`menuitemid`),
  KEY `pageitemid` (`pageitemid`),
  CONSTRAINT `menuitem_map_pageitem_ibfk_1` FOREIGN KEY (`menuitemid`) REFERENCES `menuitem` (`id`),
  CONSTRAINT `menuitem_map_pageitem_ibfk_2` FOREIGN KEY (`pageitemid`) REFERENCES `pageitem` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menuitem_map_pageitem`
--

LOCK TABLES `menuitem_map_pageitem` WRITE;
/*!40000 ALTER TABLE `menuitem_map_pageitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `menuitem_map_pageitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menutitle`
--

DROP TABLE IF EXISTS `menutitle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menutitle` (
  `id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `position` tinyint(2) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menutitle`
--

LOCK TABLES `menutitle` WRITE;
/*!40000 ALTER TABLE `menutitle` DISABLE KEYS */;
/*!40000 ALTER TABLE `menutitle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menutitle_map_menuitem`
--

DROP TABLE IF EXISTS `menutitle_map_menuitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menutitle_map_menuitem` (
  `id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `menutitleid` tinyint(2) unsigned NOT NULL,
  `menuitemid` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `menutitleid` (`menutitleid`),
  KEY `menuitemid` (`menuitemid`),
  CONSTRAINT `menutitle_map_menuitem_ibfk_1` FOREIGN KEY (`menutitleid`) REFERENCES `menutitle` (`id`),
  CONSTRAINT `menutitle_map_menuitem_ibfk_2` FOREIGN KEY (`menuitemid`) REFERENCES `menuitem` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menutitle_map_menuitem`
--

LOCK TABLES `menutitle_map_menuitem` WRITE;
/*!40000 ALTER TABLE `menutitle_map_menuitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `menutitle_map_menuitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pageaggregate`
--

DROP TABLE IF EXISTS `pageaggregate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pageaggregate` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(1000) NOT NULL,
  `pagename` varchar(256) NOT NULL,
  `createdate` datetime DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `readonly` char(1) DEFAULT NULL,
  `publishdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pageaggregate`
--

LOCK TABLES `pageaggregate` WRITE;
/*!40000 ALTER TABLE `pageaggregate` DISABLE KEYS */;
INSERT INTO `pageaggregate` VALUES (14,'first aggregator','first-aggregator.php','2015-12-02 17:26:09','2015-12-02 17:26:09',NULL,NULL),(15,'another agg','another-agg.php','2015-12-02 17:26:25','2015-12-02 17:26:25',NULL,NULL),(16,'another aggy','another-aggy.php','2015-12-02 21:21:00','2015-12-02 21:21:00',NULL,NULL),(17,'some brand new page','some-brand-new-page.php','2015-12-02 21:23:41','2015-12-02 21:23:41',NULL,NULL),(18,'so far','so-far.php','2015-12-02 21:29:35','2015-12-02 22:07:19',NULL,NULL),(19,'ll - put some more herepp','ll---put-some-more-herepp.php','2015-12-02 21:34:39','2015-12-02 23:22:25',NULL,'2015-12-02 23:22:25'),(20,'aggregate page','aggregate-page.php','2015-12-04 23:42:44','2015-12-04 23:42:44',NULL,NULL),(21,'home aggregate','home-aggregate.php','2015-12-05 00:37:30','2015-12-05 00:37:52',NULL,NULL),(22,'the first best home page','the-first-best-home-page.php','2015-12-05 00:57:34','2015-12-05 02:08:33',NULL,'2015-12-05 02:08:33');
/*!40000 ALTER TABLE `pageaggregate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pageaggregate_map_pageitem`
--

DROP TABLE IF EXISTS `pageaggregate_map_pageitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pageaggregate_map_pageitem` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `pageaggregateid` tinyint(3) unsigned NOT NULL,
  `pageitemid` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pageaggregateid` (`pageaggregateid`),
  KEY `pageitemid` (`pageitemid`),
  CONSTRAINT `pageaggregate_map_pageitem_ibfk_1` FOREIGN KEY (`pageaggregateid`) REFERENCES `pageaggregate` (`id`),
  CONSTRAINT `pageaggregate_map_pageitem_ibfk_2` FOREIGN KEY (`pageitemid`) REFERENCES `pageitem` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pageaggregate_map_pageitem`
--

LOCK TABLES `pageaggregate_map_pageitem` WRITE;
/*!40000 ALTER TABLE `pageaggregate_map_pageitem` DISABLE KEYS */;
INSERT INTO `pageaggregate_map_pageitem` VALUES (14,15,3),(15,16,3),(16,16,7),(17,16,1),(18,16,11),(19,16,13),(20,16,1),(21,17,7),(56,19,3),(57,19,5),(59,19,7),(60,19,10),(72,19,17),(73,20,3),(82,21,3),(83,21,4),(84,21,7),(85,21,9),(86,21,11),(154,22,1),(155,22,2),(156,22,4),(157,22,5),(159,22,7),(160,22,8),(161,22,12),(165,18,6),(166,19,6),(167,22,6);
/*!40000 ALTER TABLE `pageaggregate_map_pageitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pageitem`
--

DROP TABLE IF EXISTS `pageitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pageitem` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(1000) NOT NULL,
  `subtitle` text,
  `body` text,
  `titleimage` varchar(1000) DEFAULT NULL,
  `publishdate` datetime DEFAULT NULL,
  `pagename` varchar(256) NOT NULL,
  `createdate` datetime DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `readonly` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pageitem`
--

LOCK TABLES `pageitem` WRITE;
/*!40000 ALTER TABLE `pageitem` DISABLE KEYS */;
INSERT INTO `pageitem` VALUES (1,'first page create',NULL,NULL,NULL,'2015-11-28 00:22:13','first-page-create.php','2015-11-28 00:20:46','2015-11-28 00:20:46',NULL),(2,'second page craeted',NULL,NULL,NULL,NULL,'second-page-craeted.php','2015-11-28 00:21:39','2015-11-28 00:21:39',NULL),(3,'third page',NULL,NULL,NULL,'2015-11-28 12:46:22','third-page.php','2015-11-28 12:46:20','2015-11-28 12:46:20',NULL),(4,'fifthi page',NULL,NULL,NULL,'2015-11-28 12:46:51','fifthi-page.php','2015-11-28 12:46:41','2015-11-28 12:46:41',NULL),(5,'froth page',NULL,NULL,NULL,'2015-11-28 12:48:13','froth-page.php','2015-11-28 12:48:12','2015-11-28 12:48:12','1'),(6,'adfasdf','pppp\n','<p>pppp</p>\n',NULL,'2015-11-29 20:43:35','adfasdf.php','2015-11-29 20:43:27','2015-12-07 23:21:49',NULL),(7,'Gallery',NULL,NULL,NULL,'2015-11-29 21:12:35','gallery.php','2015-11-29 21:12:35','2015-11-29 21:12:35','1'),(8,'Donate',NULL,NULL,NULL,'2015-11-29 21:12:35','donate.php','2015-11-29 21:12:35','2015-11-29 21:12:35','1'),(9,'Contact us',NULL,NULL,NULL,'2015-11-29 21:12:35','contactus.php','2015-11-29 21:12:35','2015-11-29 21:12:35','1'),(10,'Gallery',NULL,NULL,NULL,'2015-11-29 22:11:12','gallery.php','2015-11-29 22:11:12','2015-11-29 22:11:12','1'),(11,'Donate',NULL,NULL,NULL,'2015-11-29 22:11:12','donate.php','2015-11-29 22:11:12','2015-11-29 22:11:12','1'),(12,'Contact us',NULL,NULL,NULL,'2015-11-29 22:11:12','contactus.php','2015-11-29 22:11:12','2015-11-29 22:11:12','1'),(13,'ADAsd',NULL,'<div>\n<table border=\"1\" cellpadding=\"10\" cellspacing=\"10\" style=\"width:100%\">\n	<tbody>\n		<tr>\n			<td style=\"width: 50%;\">\n			<p>asdfa a;sddkf a;sddf alsddkfj a;sdlfka;sdlfka s;dlfkja s;dflka sd;lfka sd;flkj asd;lfkja s;dlf ja;sdlfk ja;sdlfk a;sdlfkj a;sdlfkja ;sldfkj a;sdlfkj ;dsflk ajsd;flkjja sd;flkasdj f;alsdkjf a;sdlf a;sdf l</p>\n\n			<p>adsfadsfasdf</p>\n\n			<p>asdfadsfadsfasdf</p>\n\n			<p>asddfadsdfasfadsfadsfads ajsdf;lkja dsf;lkasd flkasdf;lkajsddf lakdsf ;alsdkfa;dsf;laksdjf ;aldskjf asdf</p>\n\n			<p>&nbsp;</p>\n			</td>\n			<td style=\"vertical-align: top;\">adsfasfasdf</td>\n		</tr>\n		<tr>\n			<td>&nbsp;</td>\n			<td>&nbsp;</td>\n		</tr>\n		<tr>\n			<td>&nbsp;</td>\n			<td>&nbsp;</td>\n		</tr>\n	</tbody>\n</table>\nFixed width</div>\n\n<div>Dynamically sized content1</div>\n\n<div>Dynamically sized content2</div>\n',NULL,'2015-11-29 22:44:59','ADAsd.php','2015-11-29 22:44:53','2015-11-29 22:44:53',NULL),(14,'new page',NULL,'<p>with some stuff in it</p>\n',NULL,NULL,'new-page.php','2015-12-02 17:15:55','2015-12-02 17:15:55',NULL),(15,'anon','aaaa\n\naaaa\n','<p>aaaa</p>\n\n<p>aaaa</p>\n',NULL,NULL,'anon.php','2015-12-02 17:29:23','2015-12-07 09:03:51',NULL),(16,'and again',NULL,NULL,NULL,NULL,'and-again.php','2015-12-02 21:08:38','2015-12-02 21:08:38',NULL),(17,'pppp','Dear all,\n\n\n	All members expressed happiness after knowing that now, United Front of Ex-Servicemen (UFESM) is a Regd all India body, vide its Regn No 716 dt 30/11/15 and no body else can misuse this n','<p>Dear all,</p>\n\n<ol>\n	<li>All members expressed happiness after knowing that now, United Front of Ex-Servicemen (UFESM) is a Regd all India body, vide its Regn No 716 dt 30/11/15 and no body else can misuse this name any more...ooo</li>\n</ol>\n',NULL,NULL,'pppp.php','2015-12-02 21:33:59','2015-12-03 08:59:43',NULL),(18,'arthurd page',NULL,NULL,NULL,NULL,'arthurd-page.php','2015-12-04 23:41:05','2015-12-04 23:41:05',NULL);
/*!40000 ALTER TABLE `pageitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pageitem_map_pageitem`
--

DROP TABLE IF EXISTS `pageitem_map_pageitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pageitem_map_pageitem` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `pageitemid` tinyint(3) unsigned NOT NULL,
  `subitemid` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pageitemid` (`pageitemid`),
  KEY `subitemid` (`subitemid`),
  CONSTRAINT `pageitem_map_pageitem_ibfk_1` FOREIGN KEY (`pageitemid`) REFERENCES `pageitem` (`id`),
  CONSTRAINT `pageitem_map_pageitem_ibfk_2` FOREIGN KEY (`subitemid`) REFERENCES `pageitem` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pageitem_map_pageitem`
--

LOCK TABLES `pageitem_map_pageitem` WRITE;
/*!40000 ALTER TABLE `pageitem_map_pageitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `pageitem_map_pageitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagetemplate`
--

DROP TABLE IF EXISTS `pagetemplate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pagetemplate` (
  `id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `pagetype` varchar(20) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `title` varchar(50) NOT NULL,
  `template` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagetemplate`
--

LOCK TABLES `pagetemplate` WRITE;
/*!40000 ALTER TABLE `pagetemplate` DISABLE KEYS */;
INSERT INTO `pagetemplate` VALUES (1,'pageaggregate','Use this template to create aggregate pages that include references to other pages','Aggregate page','aggregate'),(2,'pageitem','Use this template to create detail page that have content such as body text, images etc','Content page','content'),(3,'pageaggregate','Use this template to create a home page like page that has an aggregate section and a members comments section','Home page','home');
/*!40000 ALTER TABLE `pagetemplate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagetemplate_map_pageaggregate`
--

DROP TABLE IF EXISTS `pagetemplate_map_pageaggregate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pagetemplate_map_pageaggregate` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `pagetemplateid` tinyint(2) unsigned NOT NULL,
  `pageaggregateid` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pagetemplateid` (`pagetemplateid`),
  KEY `pageaggregateid` (`pageaggregateid`),
  CONSTRAINT `pagetemplate_map_pageaggregate_ibfk_1` FOREIGN KEY (`pagetemplateid`) REFERENCES `pagetemplate` (`id`),
  CONSTRAINT `pagetemplate_map_pageaggregate_ibfk_2` FOREIGN KEY (`pageaggregateid`) REFERENCES `pageaggregate` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagetemplate_map_pageaggregate`
--

LOCK TABLES `pagetemplate_map_pageaggregate` WRITE;
/*!40000 ALTER TABLE `pagetemplate_map_pageaggregate` DISABLE KEYS */;
INSERT INTO `pagetemplate_map_pageaggregate` VALUES (14,1,16),(15,1,17),(21,1,18),(29,1,19),(30,1,20),(34,3,21),(43,3,22);
/*!40000 ALTER TABLE `pagetemplate_map_pageaggregate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagetemplate_map_pageitem`
--

DROP TABLE IF EXISTS `pagetemplate_map_pageitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pagetemplate_map_pageitem` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `pagetemplateid` tinyint(2) unsigned NOT NULL,
  `pageitemid` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pagetemplateid` (`pagetemplateid`),
  KEY `pageitemid` (`pageitemid`),
  CONSTRAINT `pagetemplate_map_pageitem_ibfk_1` FOREIGN KEY (`pagetemplateid`) REFERENCES `pagetemplate` (`id`),
  CONSTRAINT `pagetemplate_map_pageitem_ibfk_2` FOREIGN KEY (`pageitemid`) REFERENCES `pageitem` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagetemplate_map_pageitem`
--

LOCK TABLES `pagetemplate_map_pageitem` WRITE;
/*!40000 ALTER TABLE `pagetemplate_map_pageitem` DISABLE KEYS */;
INSERT INTO `pagetemplate_map_pageitem` VALUES (18,2,1),(19,2,2),(20,2,3),(21,2,4),(22,2,5),(24,2,7),(25,2,8),(26,2,9),(27,2,10),(28,2,11),(29,2,12),(30,2,13),(31,2,14),(39,2,16),(45,2,17),(46,2,18),(47,2,15),(49,2,6);
/*!40000 ALTER TABLE `pagetemplate_map_pageitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registeredmember`
--

DROP TABLE IF EXISTS `registeredmember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registeredmember` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `email` varchar(256) DEFAULT NULL,
  `sex` char(1) NOT NULL,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registeredmember`
--

LOCK TABLES `registeredmember` WRITE;
/*!40000 ALTER TABLE `registeredmember` DISABLE KEYS */;
INSERT INTO `registeredmember` VALUES (1,'poker','pokerj','poker@ha.com','m','2015-10-26 20:56:56'),(2,'pokerj','pokerj','don@aa.com','m','2015-10-26 21:00:35'),(3,'pokerj','pokerj','john@ami.com','m','2015-10-26 21:01:50'),(4,'pokerj','password','john@gmail.com','m','2015-10-26 21:03:15'),(5,'pokerj','pokerj','poker@ha.com','m','2015-10-26 21:20:32'),(6,'pokerj','pokerj','poker@ha.com','m','2015-10-26 21:22:32'),(7,'pokerj','poker@ha.com ','poker@ha.com','m','2015-10-26 21:24:14'),(8,'pokerj','poker','poker@ha.com','m','2015-10-26 21:26:11'),(9,'pokerj','pokerj','poker@ha.com','m','2015-10-26 21:27:56'),(10,'pokerj','pokerj','poker@ha.com','m','2015-10-26 21:29:09'),(11,'poker','poker@ha.com ','poker@ha.com','m','2015-10-26 21:32:06'),(12,'poker','poker@ha.com','poker@ha.com','m','2015-10-26 21:43:38'),(13,'peter barraud','japan','gapeterb@gmail.com','f','2015-10-26 21:50:22'),(14,'poker','gapeterb@gmail.com','gapeter1b@gmail.com','m','2015-10-26 21:53:55');
/*!40000 ALTER TABLE `registeredmember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickeritem`
--

DROP TABLE IF EXISTS `tickeritem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tickeritem` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(1000) NOT NULL,
  `position` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickeritem`
--

LOCK TABLES `tickeritem` WRITE;
/*!40000 ALTER TABLE `tickeritem` DISABLE KEYS */;
INSERT INTO `tickeritem` VALUES (1,'another hange that has changed',1),(2,'B',9),(3,'G',8),(4,'GG',6),(5,'ff',5),(7,'GGG',4),(8,'bbb',2),(9,'ccccc',3),(10,'plo',10),(11,'lop',7);
/*!40000 ALTER TABLE `tickeritem` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-11  8:15:39
