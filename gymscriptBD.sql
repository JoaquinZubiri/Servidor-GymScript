-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: b84l754fxnnbzxvu6l1f-mysql.services.clever-cloud.com    Database: b84l754fxnnbzxvu6l1f
-- ------------------------------------------------------
-- Server version	8.0.15-5

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'f41d366d-91e5-11e9-8525-cecd028ee826:1-136855179';

--
-- Table structure for table `actividad`
--

DROP TABLE IF EXISTS `actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descripcion` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad`
--

LOCK TABLES `actividad` WRITE;
/*!40000 ALTER TABLE `actividad` DISABLE KEYS */;
INSERT INTO `actividad` VALUES (34,'Yoga','Yoga'),(35,'Boxeo','Boxeo');
/*!40000 ALTER TABLE `actividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checkin`
--

DROP TABLE IF EXISTS `checkin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `idSede` int(11) NOT NULL,
  `fechaHora` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuario_check_idx` (`idUsuario`),
  KEY `fk_sede_check_idx` (`idSede`),
  CONSTRAINT `fk_sede_check` FOREIGN KEY (`idSede`) REFERENCES `sede` (`id`),
  CONSTRAINT `fk_usuario_check` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkin`
--

LOCK TABLES `checkin` WRITE;
/*!40000 ALTER TABLE `checkin` DISABLE KEYS */;
/*!40000 ALTER TABLE `checkin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuota`
--

DROP TABLE IF EXISTS `cuota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuota` (
  `fechaPago` date NOT NULL,
  `importe` float NOT NULL,
  `fechaVenc` date DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idInscripcion` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_insc_couta_idx` (`idInscripcion`),
  CONSTRAINT `fk_insc_couta` FOREIGN KEY (`idInscripcion`) REFERENCES `inscripcion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuota`
--

LOCK TABLES `cuota` WRITE;
/*!40000 ALTER TABLE `cuota` DISABLE KEYS */;
INSERT INTO `cuota` VALUES ('2023-11-19',12000,'2023-12-19',109,100),('2023-11-19',12000,'2023-12-19',110,101),('2023-11-20',6000,'2023-12-20',111,102),('2023-11-20',8000,'2023-12-20',112,103),('2023-11-29',12000,'2023-12-29',113,104),('2023-12-03',8000,'2024-01-02',114,105),('2024-01-17',8000,'2024-02-16',115,103);
/*!40000 ALTER TABLE `cuota` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entrenador`
--

DROP TABLE IF EXISTS `entrenador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entrenador` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `horarioTrabajo` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrenador`
--

LOCK TABLES `entrenador` WRITE;
/*!40000 ALTER TABLE `entrenador` DISABLE KEYS */;
/*!40000 ALTER TABLE `entrenador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horario`
--

DROP TABLE IF EXISTS `horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horario` (
  `horaDesde` time NOT NULL,
  `horaHasta` time NOT NULL,
  `idSedeAct` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dia` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dia-hora-idSedeAct_UNIQUE` (`idSedeAct`,`dia`,`horaDesde`),
  CONSTRAINT `fk_sa_h` FOREIGN KEY (`idSedeAct`) REFERENCES `sedes_actividades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horario`
--

LOCK TABLES `horario` WRITE;
/*!40000 ALTER TABLE `horario` DISABLE KEYS */;
INSERT INTO `horario` VALUES ('13:00:00','14:00:00',1,2,'martes'),('20:00:00','21:00:00',1,7,'martes'),('19:00:00','20:30:00',1,8,'jueves');
/*!40000 ALTER TABLE `horario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripcion`
--

DROP TABLE IF EXISTS `inscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripcion` (
  `idPlan` int(11) NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date DEFAULT NULL,
  `idSede` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_idPlan_idx` (`idPlan`),
  KEY `fk_usuario_insc_idx` (`idUsuario`),
  KEY `fk_sede_insc_idx` (`idSede`),
  CONSTRAINT `fk_plan-Insc` FOREIGN KEY (`idPlan`) REFERENCES `plan` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_sede_insc` FOREIGN KEY (`idSede`) REFERENCES `sede` (`id`),
  CONSTRAINT `fk_usuario_insc` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripcion`
--

LOCK TABLES `inscripcion` WRITE;
/*!40000 ALTER TABLE `inscripcion` DISABLE KEYS */;
INSERT INTO `inscripcion` VALUES (9,'2023-11-19','2023-11-19',9,100,34),(9,'2023-11-19',NULL,8,101,34),(4,'2023-11-20','2023-11-20',6,102,35),(10,'2023-11-20',NULL,6,103,36),(9,'2023-11-29',NULL,9,104,37),(10,'2023-12-03',NULL,8,105,39);
/*!40000 ALTER TABLE `inscripcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localidad`
--

DROP TABLE IF EXISTS `localidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localidad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `idProvincia` int(11) NOT NULL,
  `codPostal` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codPostal_UNIQUE` (`codPostal`),
  KEY `fk_prov_loc_idx` (`idProvincia`),
  CONSTRAINT `fk_prov_loc` FOREIGN KEY (`idProvincia`) REFERENCES `provincia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localidad`
--

LOCK TABLES `localidad` WRITE;
/*!40000 ALTER TABLE `localidad` DISABLE KEYS */;
INSERT INTO `localidad` VALUES (7,'Pergamino',113,'2700'),(8,'Rosario',131,'2000'),(9,'Villa Carlos Paz',132,'5152');
/*!40000 ALTER TABLE `localidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan`
--

DROP TABLE IF EXISTS `plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `precioMensual` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
INSERT INTO `plan` VALUES (4,'BÁSICO','Acceso al gimnasio - Horario Flexible - Asesoramiento básico - Seguimiento de progreso',6000),(9,'PREMIUM','Acceso exclusivo - Entrenamiento personalizado - Nutrición avanzada - Clases de Boxeo',12000),(10,'ESTÁNDAR','Acceso a clases grupales - Asesoramiento personalizado - Acceso a vestuarios premium - Descuentos en suplementos',8000);
/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan-actividad`
--

DROP TABLE IF EXISTS `plan-actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan-actividad` (
  `idActividad` int(11) NOT NULL,
  `idPlan` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `fk_plan-act_idx` (`idPlan`),
  KEY `fk_act_pa_idx` (`idActividad`),
  CONSTRAINT `fk_act_pa` FOREIGN KEY (`idActividad`) REFERENCES `actividad` (`id`),
  CONSTRAINT `fk_plan_pa` FOREIGN KEY (`idPlan`) REFERENCES `plan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan-actividad`
--

LOCK TABLES `plan-actividad` WRITE;
/*!40000 ALTER TABLE `plan-actividad` DISABLE KEYS */;
INSERT INTO `plan-actividad` VALUES (35,10,6);
/*!40000 ALTER TABLE `plan-actividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descripcion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tipo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (5,'RedBull','Bebida energetica','Bebidas','https://images.ctfassets.net/lcr8qbvxj7mh/eyz1nHwgaDd9TKO6jslKD/1964dc02d78dc20fe267d864d5fabe14/DRES_AR_ED-250ml_cold_closed_front_redbullcom.png'),(6,'Whey Protein','Suplemento dietario','Suplementos','https://c0.klipartz.com/pngpicture/403/33/gratis-png-suplemento-dietetico-proteina-de-suero-dymatize-elite-100-whey-dymatize-elite-whey-5lbs-whey.png'),(7,'Mancuernas','Mancuernas hexagonales (55kg)','Equipamiento','https://c0.klipartz.com/pngpicture/293/83/gratis-png-par-de-pesas-de-gimnasia-de-peso-fijo-55-negras-entrenamiento-con-pesas-con-pesas-kettlebell-aptitud-fisica-archivo-de-pesas.png'),(8,'Bolso deportivo','Bolsillos Unisex Rbc Hombre','Ropa y Accesorios','https://http2.mlstatic.com/D_NQ_NP_972259-MLA53003316466_122022-O.webp'),(9,'Remera Fit Deportiva','Running Ciclista Camiseta Hombre','Ropa y Accesorios','https://http2.mlstatic.com/D_NQ_NP_640708-MLA54868405014_042023-O.webp'),(15,'Kit de bandas circulares','3 bandas circulares de latex, una por tensión','Equipamiento','https://i0.wp.com/kine-shop.com.ar/wp-content/uploads/2022/06/banda-circular-3-tensiones.jpg?fit=635%2C749&ssl=1'),(16,'SuperBanda para dominadas','Resistencia BAJA – Roja -2000 x 13 x 4.5mm','Equipamiento','https://i0.wp.com/kine-shop.com.ar/wp-content/uploads/2022/06/15679540398723ad9972eddce814d01e590ef0b2f5-3.jpg?fit=1002%2C1024&ssl=1'),(17,'Banda elástica con tobillera','Posee agarres regulables para los tobillos','Equipamiento','https://i0.wp.com/kine-shop.com.ar/wp-content/uploads/2022/06/2289.jpg?fit=800%2C800&ssl=1'),(18,'Guantes De Gimnasio','Son de cuero Mir','Ropa y Accesorios','https://i0.wp.com/kine-shop.com.ar/wp-content/uploads/2022/06/Guantes-de-Cuero-Negro.jpg?fit=1080%2C1250&ssl=1'),(19,'Botella Deportiva','600ml - Pico anti derrames','Ropa y Accesorios','https://i0.wp.com/kine-shop.com.ar/wp-content/uploads/2022/06/Kinemed-d3-Tape-Botellas-2.jpg?fit=1200%2C1200&ssl=1'),(20,'Balanza','Ideal para tu casa','Balanzas','https://todoparacasa.com.ar/control/archivos/6a4457_2WhatsAppImage2022-03-17at8.09.48PM(1).jpeg');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provincia`
--

DROP TABLE IF EXISTS `provincia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provincia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provincia`
--

LOCK TABLES `provincia` WRITE;
/*!40000 ALTER TABLE `provincia` DISABLE KEYS */;
INSERT INTO `provincia` VALUES (113,'Buenos Aires'),(134,'Catamarca'),(132,'Cordoba'),(136,'La Pampa'),(137,'La Rioja'),(135,'San Luis'),(131,'Santa Fe');
/*!40000 ALTER TABLE `provincia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sede`
--

DROP TABLE IF EXISTS `sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sede` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `direccion` varchar(60) NOT NULL,
  `idLocalidad` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_idLocalidad_idx` (`idLocalidad`),
  CONSTRAINT `fk_idLocalidad` FOREIGN KEY (`idLocalidad`) REFERENCES `localidad` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sede`
--

LOCK TABLES `sede` WRITE;
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
INSERT INTO `sede` VALUES (6,'Zeballos 1340',7),(8,'Pellegrini 500',8),(9,'Ov. Lagos 4940',8),(10,'Av. Libertad 211',9);
/*!40000 ALTER TABLE `sede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sede-act_entrenadores`
--

DROP TABLE IF EXISTS `sede-act_entrenadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sede-act_entrenadores` (
  `idEntrenador` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idSedeAct` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idSedeAct_UNIQUE` (`idSedeAct`),
  KEY `fk_ent_idx` (`idEntrenador`),
  CONSTRAINT `fk_ent_sae` FOREIGN KEY (`idEntrenador`) REFERENCES `entrenador` (`id`),
  CONSTRAINT `fk_sa_sae` FOREIGN KEY (`idSedeAct`) REFERENCES `sedes_actividades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sede-act_entrenadores`
--

LOCK TABLES `sede-act_entrenadores` WRITE;
/*!40000 ALTER TABLE `sede-act_entrenadores` DISABLE KEYS */;
/*!40000 ALTER TABLE `sede-act_entrenadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sedes_actividades`
--

DROP TABLE IF EXISTS `sedes_actividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sedes_actividades` (
  `idSede` int(11) NOT NULL,
  `idActividad` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idSede-idActividad_UNIQUE` (`idSede`,`idActividad`),
  KEY `fk_act-sa_idx` (`idActividad`),
  KEY `fk_sede_sa_idx` (`idSede`),
  CONSTRAINT `fk_act_sa` FOREIGN KEY (`idActividad`) REFERENCES `actividad` (`id`),
  CONSTRAINT `fk_sede_sa` FOREIGN KEY (`idSede`) REFERENCES `sede` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sedes_actividades`
--

LOCK TABLES `sedes_actividades` WRITE;
/*!40000 ALTER TABLE `sedes_actividades` DISABLE KEYS */;
INSERT INTO `sedes_actividades` VALUES (6,35,1),(8,35,4);
/*!40000 ALTER TABLE `sedes_actividades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `dni` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `mail` varchar(60) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contraseña` varchar(70) NOT NULL,
  `rol` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mailCli_UNIQUE` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (12313,'Rodrigo','Gimenez',99999999,'mail@gmail.com',11,'$2b$10$Nn2NqPAC2kdkdksJ3NHifKPZRa/.YUmsjnbtgZBHcOeO5GXWJTGLpQ6i/eC','user'),(123313,'Administrador','Prueba',11212313,'a@a.com',16,'$2b$10$71HEFjgIOoIv/2GuFDmQ3.Yifj4B5m1bvf4B39jc19H7.pjIUnxe2','admin'),(5545421,'Franco','Sanchez',8419212,'b@b.com',19,'$2b$10$hRF4Pwg7uaRz9deu/h.8pewkkoEsfArD8VKb5AgKmciD2JRXGmthG','user'),(2149237,'Roberto','Martinez',328491,'robertoMartinez@gmail.com',24,'$2b$10$nUTwzEIKw.8DGFEFiEnOk.0lPw/8ViFsnWPwUOVwF8qXYyFVZ9lo2','user'),(1000000,'Manuel','Mongelos',3121213,'manumong@gmail.com',25,'$2b$10$Dp8EaZcxXbbdt8UlzZYAGOxtF8EmRMTQAGmdU/e4UNTdntfpXoNA6','user'),(89114112,'aeasae','asas',199121,'onaeonae@gonaoms.com',27,'$2b$10$VPh5IQOqGRn.lkHMqJlN0eo0cFiuXzHlFeA/wF/Al.xEB0igVW2jC','user'),(12345672,'Franco','Sanchez',341648152,'soporte@francosanchez.com.ar',30,'$2b$10$qUdgMm3B2IWT3OzD45xwD.pUeR862tB63f.093XXCQaGMuLWhJHVO','admin'),(919529,'Franco','Sanchez',6146412,'aa@aa.com',34,'$2b$10$MWuBQS6nA0HUH3hV.UutbeCf692GS1QdhXTOE6zB8u/JLHdoAdpfu','user'),(43242343,'augusto','castellano',221432523,'augustocas05@hotmail.com',35,'$2b$10$OrZgRG9MAJdsP2rQtCaCauZVY.vRdSkXcY7zmUpe1JRmhLn/Gd/Yq','user'),(44111222,'Joaquin','Zubiri',24773020,'j@z.com',36,'$2b$10$TqfT6aqb8pvNFj/9W5rj9uVkxj7vVbpqnbB8D3FdYPZJgrphrqXge','user'),(121313,'Nicolas','Fani',121212,'aeonae@onma.com',37,'$2b$10$Ygqr7LKNX.TqeEfzovxGEOgyFQR1C/Kk2hQvQzZP9BiMUVWxKOuZi','user'),(1213123,'Gino','Fina',121212,'asmoasm@onae.com',38,'$2b$10$4bOSCvT1KDDA9FVCRlZWeOJEDTf1u.7MPfkLYbJ.oXc5iiraGfB8C','user'),(1212,'waw','awaw',121213,'hola@hola.com',39,'$2b$10$uPEuYyfWbdwMwmX6hTtKtew6a5y0lwSChZDibLSIFtuHzOcZI59M6','user');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-19 21:50:46
