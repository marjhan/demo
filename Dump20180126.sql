-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sts_db
-- ------------------------------------------------------
-- Server version	5.7.20-log

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
-- Table structure for table `channel`
--

DROP TABLE IF EXISTS `channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `channel` (
  `channel_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '渠道id',
  `channel_name` varchar(15) NOT NULL COMMENT '渠道名称',
  `status` char(1) NOT NULL DEFAULT '1' COMMENT '是否启用 0:不启用 1:启用',
  PRIMARY KEY (`channel_id`),
  UNIQUE KEY `channel_id_UNIQUE` (`channel_id`),
  UNIQUE KEY `channel_name_UNIQUE` (`channel_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channel`
--

LOCK TABLES `channel` WRITE;
/*!40000 ALTER TABLE `channel` DISABLE KEYS */;
/*!40000 ALTER TABLE `channel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_source`
--

DROP TABLE IF EXISTS `list_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `list_source` (
  `list_source_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '名单来源id',
  `list_source_name` varchar(10) NOT NULL COMMENT '名单来源',
  `status` char(1) NOT NULL DEFAULT '1' COMMENT '是否启用 0:不启用 1:启用',
  PRIMARY KEY (`list_source_id`),
  UNIQUE KEY `list_source_id_UNIQUE` (`list_source_id`),
  UNIQUE KEY `list_source_name_UNIQUE` (`list_source_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_source`
--

LOCK TABLES `list_source` WRITE;
/*!40000 ALTER TABLE `list_source` DISABLE KEYS */;
/*!40000 ALTER TABLE `list_source` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_change_log`
--

DROP TABLE IF EXISTS `order_change_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_change_log` (
  `order_change_log_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单修改日志id',
  `old_order_status_id` int(11) NOT NULL COMMENT '修改前订单状态',
  `new_order_status_id` int(11) NOT NULL COMMENT '修改后订单状态',
  `old_remark` varchar(2000) NOT NULL COMMENT '修改前备注',
  `new_remark` varchar(2000) NOT NULL COMMENT '修改后备注',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `motify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `user_id` int(11) NOT NULL COMMENT '操作人id',
  PRIMARY KEY (`order_change_log_id`),
  UNIQUE KEY `order_status_log_id_UNIQUE` (`order_change_log_id`),
  KEY `user_id_idx` (`user_id`),
  KEY `old_order_status_id_idx` (`old_order_status_id`),
  KEY `new_order_status_id_idx` (`new_order_status_id`),
  CONSTRAINT `new_order_status_id` FOREIGN KEY (`new_order_status_id`) REFERENCES `order_status` (`order_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `old_order_status_id` FOREIGN KEY (`old_order_status_id`) REFERENCES `order_status` (`order_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_change_log`
--

LOCK TABLES `order_change_log` WRITE;
/*!40000 ALTER TABLE `order_change_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_change_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_info`
--

DROP TABLE IF EXISTS `order_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_info` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `student_name` varchar(20) NOT NULL COMMENT '学生姓名',
  `info` varchar(300) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `motify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `mobile_phone` varchar(11) NOT NULL COMMENT '手机号',
  `qq` varchar(15) NOT NULL COMMENT 'QQ',
  `wechat` varchar(45) NOT NULL COMMENT '微信号',
  `phone` varchar(45) NOT NULL COMMENT '电话',
  `channel_id` int(11) NOT NULL COMMENT '渠道id',
  `list_source_id` int(11) NOT NULL COMMENT '名单来源id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `order_status_id` int(11) NOT NULL COMMENT '订单状态id',
  `remark` varchar(2000) NOT NULL COMMENT '备注',
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `mobile_phone_UNIQUE` (`mobile_phone`),
  UNIQUE KEY `order_id_UNIQUE` (`order_id`),
  KEY `channel_id_idx` (`channel_id`),
  KEY `list_source_idx` (`list_source_id`),
  KEY `user_idx` (`user_id`),
  KEY `order_status_idx` (`order_status_id`),
  CONSTRAINT `channel` FOREIGN KEY (`channel_id`) REFERENCES `channel` (`channel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `list_source` FOREIGN KEY (`list_source_id`) REFERENCES `list_source` (`list_source_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `order_status` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`order_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_info`
--

LOCK TABLES `order_info` WRITE;
/*!40000 ALTER TABLE `order_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_status` (
  `order_status_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单状态id',
  `order_status_name` varchar(45) NOT NULL COMMENT '订单状态',
  `status` char(1) NOT NULL DEFAULT '1' COMMENT '是否启用 0:不启用 1:启用',
  PRIMARY KEY (`order_status_id`),
  UNIQUE KEY `order_status_id_UNIQUE` (`order_status_id`),
  UNIQUE KEY `order_status_name_UNIQUE` (`order_status_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `role_name` varchar(20) NOT NULL COMMENT '角色',
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_id_UNIQUE` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (0,'god'),(1,'admin'),(2,'user');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(20) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `real_name` varchar(20) NOT NULL COMMENT '真实姓名',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `motify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `status` char(1) NOT NULL DEFAULT '1' COMMENT '是否启用 0:不启用 1:启用',
  `role_id` int(11) NOT NULL DEFAULT '0' COMMENT '角色id',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  KEY `role_idx` (`role_id`),
  CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (0,'god','LTc0OTFmOTNmOWE3NmIyNzlkNjBmMmJkOTY0N2U3N2Ni','超管','2018-01-26 00:32:50','2018-01-25 16:33:03','1',0),(1,'admin','NjcwYjE0NzI4YWQ5OTAyYWVjYmEzMmUyMmZhNGY2YmQ=','管理员','2018-01-09 22:07:52','2018-01-25 16:32:50','1',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sts_db'
--

--
-- Dumping routines for database 'sts_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-26  1:06:24
