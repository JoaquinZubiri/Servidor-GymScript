-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
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

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'f41d366d-91e5-11e9-8525-cecd028ee826:1-134698348';

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
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuota`
--

LOCK TABLES `cuota` WRITE;
/*!40000 ALTER TABLE `cuota` DISABLE KEYS */;
INSERT INTO `cuota` VALUES ('2023-11-15',6000,'2023-12-15',5,24),('2023-11-15',6000,'2023-12-15',62,52),('2023-10-14',4000,'2023-11-14',63,52);
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
  `horaDia` datetime NOT NULL,
  `duracion` time NOT NULL,
  `idSedeAct` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `horaDia_UNIQUE` (`horaDia`),
  UNIQUE KEY `idSedeAct_UNIQUE` (`idSedeAct`),
  CONSTRAINT `fk_sa_h` FOREIGN KEY (`idSedeAct`) REFERENCES `sedes_actividades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horario`
--

LOCK TABLES `horario` WRITE;
/*!40000 ALTER TABLE `horario` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripcion`
--

LOCK TABLES `inscripcion` WRITE;
/*!40000 ALTER TABLE `inscripcion` DISABLE KEYS */;
INSERT INTO `inscripcion` VALUES (4,'2023-11-11',NULL,6,24,11),(4,'2023-11-15',NULL,6,52,12);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localidad`
--

LOCK TABLES `localidad` WRITE;
/*!40000 ALTER TABLE `localidad` DISABLE KEYS */;
INSERT INTO `localidad` VALUES (7,'Pergamino',113,'2700'),(8,'Rosario',131,'2000');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (5,'RedBull','Bebida energetica','Bebidas','https://images.ctfassets.net/lcr8qbvxj7mh/eyz1nHwgaDd9TKO6jslKD/1964dc02d78dc20fe267d864d5fabe14/DRES_AR_ED-250ml_cold_closed_front_redbullcom.png'),(6,'Whey Protein','Suplemento dietario','Suplementos','https://c0.klipartz.com/pngpicture/403/33/gratis-png-suplemento-dietetico-proteina-de-suero-dymatize-elite-100-whey-dymatize-elite-whey-5lbs-whey.png'),(7,'Mancuernas','Mancuernas hexagonales (55kg)','Equipamiento','https://c0.klipartz.com/pngpicture/293/83/gratis-png-par-de-pesas-de-gimnasia-de-peso-fijo-55-negras-entrenamiento-con-pesas-con-pesas-kettlebell-aptitud-fisica-archivo-de-pesas.png'),(8,'Bolso deportivo','Bolsillos Unisex Rbc Hombre','Ropa y Accesorios','https://http2.mlstatic.com/D_NQ_NP_972259-MLA53003316466_122022-O.webp'),(9,'Remera Fit Deportiva','Running Ciclista Camiseta Hombre','Ropa y Accesorios','https://http2.mlstatic.com/D_NQ_NP_640708-MLA54868405014_042023-O.webp'),(11,'Guantes Proyec','Extreme Gym Cuero Pesas Funcional','Equipamiento','https://http2.mlstatic.com/D_NQ_NP_793678-MLA71262035990_082023-O.webp'),(15,'Kit de bandas circulares','3 bandas circulares de latex, una por tensión','Equipamiento','https://i0.wp.com/kine-shop.com.ar/wp-content/uploads/2022/06/banda-circular-3-tensiones.jpg?fit=635%2C749&ssl=1'),(16,'SuperBanda para dominadas','Resistencia BAJA – Roja -2000 x 13 x 4.5mm','Equipamiento','https://i0.wp.com/kine-shop.com.ar/wp-content/uploads/2022/06/15679540398723ad9972eddce814d01e590ef0b2f5-3.jpg?fit=1002%2C1024&ssl=1'),(17,'Banda elástica con tobillera','Posee agarres regulables para los tobillos','Equipamiento','https://i0.wp.com/kine-shop.com.ar/wp-content/uploads/2022/06/2289.jpg?fit=800%2C800&ssl=1'),(18,'Guantes De Gimnasio','Son de cuero Mir','Ropa y Accesorios','https://i0.wp.com/kine-shop.com.ar/wp-content/uploads/2022/06/Guantes-de-Cuero-Negro.jpg?fit=1080%2C1250&ssl=1'),(19,'Botella Deportiva','600ml - Pico anti derrames','Ropa y Accesorios','https://i0.wp.com/kine-shop.com.ar/wp-content/uploads/2022/06/Kinemed-d3-Tape-Botellas-2.jpg?fit=1200%2C1200&ssl=1'),(20,'Balanza','Ideal para tu casa','Balanzas','https://todoparacasa.com.ar/control/archivos/6a4457_2WhatsAppImage2022-03-17at8.09.48PM(1).jpeg');
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
INSERT INTO `provincia` VALUES (113,'Buenos Aires'),(134,'Catamarca'),(132,'Cordoba'),(136,'La Pampa'),(137,'La Rioja'),(135,'San Luis'),(131,'Santa Fe'),(133,'Santiago Del Estero');
/*!40000 ALTER TABLE `provincia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salon`
--

DROP TABLE IF EXISTS `salon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(60) NOT NULL,
  `capacidad` int(11) NOT NULL,
  `nroSalon` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salon`
--

LOCK TABLES `salon` WRITE;
/*!40000 ALTER TABLE `salon` DISABLE KEYS */;
/*!40000 ALTER TABLE `salon` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sede`
--

LOCK TABLES `sede` WRITE;
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
INSERT INTO `sede` VALUES (6,'Zeballos 1340',7);
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
  `idSalon` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `fk_act-sa_idx` (`idActividad`),
  KEY `fk_sede_sa_idx` (`idSede`),
  KEY `fk_salon_sa_idx` (`idSalon`),
  CONSTRAINT `fk_act_sa` FOREIGN KEY (`idActividad`) REFERENCES `actividad` (`id`),
  CONSTRAINT `fk_salon_sa` FOREIGN KEY (`idSalon`) REFERENCES `salon` (`id`),
  CONSTRAINT `fk_sede_sa` FOREIGN KEY (`idSede`) REFERENCES `sede` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sedes_actividades`
--

LOCK TABLES `sedes_actividades` WRITE;
/*!40000 ALTER TABLE `sedes_actividades` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (12313,'Rodrigo','Gimenez',99999999,'mail@gmail.com',11,'$2b$10$Nn2NqPAC2kdkdksJ3NHifKPZRa/.YUmsjnbtgZBHcOeO5GXWJTGLpQ6i/eC','user'),(12313,'asd','qwe',111,'ads',12,'$2b$10$niY3c5RuruVH6fokHhOW8O0Owhvz5znD0YLYBPvttGYxvrwSioz/2','user'),(4444444,'Prueba','Clase',123123,'email@gmail.com',13,'$2b$10$IUHNUnANrExada5DQPYXO.zKYdD5EDW.N0abzO437.T9kETOzwhtu','admin'),(1111111,'otraPrueba','clase',3333333,'gmail@gmail.com',14,'$2b$10$IrWfz4KUrXpIMSOtCWLaBetKQmZKtR6VNk4ijT7/.4uRjbhZciin2','user'),(123,'a','a',1,'a@a.com',16,'$2b$10$71HEFjgIOoIv/2GuFDmQ3.Yifj4B5m1bvf4B39jc19H7.pjIUnxe2','admin'),(5545421,'eaeaea','sasasa',841921,'b@b.com',19,'$2b$10$19hSjaBYHZ1Ggt.DmnOc7u5GIbA8ZfkVWljM3l5U/cdmnH1QdH0bS','user');
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

-- Dump completed on 2023-11-16 18:08:38
