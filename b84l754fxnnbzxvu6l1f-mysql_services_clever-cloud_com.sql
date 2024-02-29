-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: b84l754fxnnbzxvu6l1f-mysql.services.clever-cloud.com:3306
-- Tiempo de generación: 29-02-2024 a las 13:56:56
-- Versión del servidor: 8.0.15-5
-- Versión de PHP: 8.2.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `b84l754fxnnbzxvu6l1f`
--
DROP DATABASE IF EXISTS `b84l754fxnnbzxvu6l1f`;
CREATE DATABASE IF NOT EXISTS `b84l754fxnnbzxvu6l1f` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `b84l754fxnnbzxvu6l1f`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad`
--

CREATE TABLE `actividad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descripcion` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `actividad`
--

INSERT INTO `actividad` (`id`, `nombre`, `descripcion`) VALUES
(34, 'Yoga', 'Yoga'),
(35, 'Boxeo', 'Boxeo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `checkin`
--

CREATE TABLE `checkin` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idSede` int(11) NOT NULL,
  `fechaHora` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuota`
--

CREATE TABLE `cuota` (
  `fechaPago` date NOT NULL,
  `importe` float NOT NULL,
  `fechaVenc` date DEFAULT NULL,
  `id` int(11) NOT NULL,
  `idInscripcion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cuota`
--

INSERT INTO `cuota` (`fechaPago`, `importe`, `fechaVenc`, `id`, `idInscripcion`) VALUES
('2023-11-19', 12000, '2023-12-19', 109, 100),
('2023-11-19', 12000, '2023-12-19', 110, 101),
('2023-11-20', 6000, '2023-12-20', 111, 102),
('2023-11-20', 8000, '2023-12-20', 112, 103),
('2023-11-29', 12000, '2023-12-29', 113, 104),
('2023-12-03', 8000, '2024-01-02', 114, 105),
('2024-01-17', 8000, '2024-02-16', 115, 103),
('2024-01-22', 8000, '2024-02-21', 116, 107),
('2024-02-27', 8000, '2024-03-28', 117, 103),
('2024-02-27', 8000, '2024-03-28', 118, 103),
('2024-02-27', 8000, '2024-03-28', 119, 103);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenador`
--

CREATE TABLE `entrenador` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `telefono` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `entrenador`
--

INSERT INTO `entrenador` (`id`, `nombre`, `apellido`, `telefono`) VALUES
(3, 'prueba', 'prueba', 12345678);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `horaDesde` time NOT NULL,
  `horaHasta` time NOT NULL,
  `idSedeAct` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `dia` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`horaDesde`, `horaHasta`, `idSedeAct`, `id`, `dia`) VALUES
('13:00:00', '14:00:00', 1, 2, 'martes'),
('20:00:00', '21:00:00', 1, 7, 'martes'),
('19:00:00', '20:30:00', 1, 8, 'jueves');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE `inscripcion` (
  `idPlan` int(11) NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date DEFAULT NULL,
  `idSede` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `inscripcion`
--

INSERT INTO `inscripcion` (`idPlan`, `fechaAlta`, `fechaBaja`, `idSede`, `id`, `idUsuario`) VALUES
(9, '2023-11-19', '2024-01-23', 9, 100, 34),
(9, '2023-11-19', NULL, 8, 101, 34),
(4, '2023-11-20', '2023-11-20', 6, 102, 35),
(10, '2023-11-20', NULL, 6, 103, 36),
(9, '2023-11-29', NULL, 9, 104, 37),
(10, '2023-12-03', NULL, 8, 105, 39),
(10, '2024-01-22', NULL, 6, 107, 40);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidad`
--

CREATE TABLE `localidad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `idProvincia` int(11) NOT NULL,
  `codPostal` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `localidad`
--

INSERT INTO `localidad` (`id`, `nombre`, `idProvincia`, `codPostal`) VALUES
(7, 'Pergamino', 113, '2700'),
(8, 'Rosario', 131, '2000'),
(9, 'Villa Carlos Paz', 132, '5152');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan`
--

CREATE TABLE `plan` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `precioMensual` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `plan`
--

INSERT INTO `plan` (`id`, `nombre`, `descripcion`, `precioMensual`) VALUES
(4, 'BÁSICO', 'Acceso al gimnasio - Horario Flexible - Asesoramiento básico - Seguimiento de progreso', 6000),
(9, 'PREMIUM', 'Acceso exclusivo - Entrenamiento personalizado - Nutrición avanzada - Clases de Boxeo', 12000),
(10, 'ESTÁNDAR', 'Acceso a clases grupales - Asesoramiento personalizado - Acceso a vestuarios premium - Descuentos en suplementos', 8000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan-actividad`
--

CREATE TABLE `plan-actividad` (
  `idActividad` int(11) NOT NULL,
  `idPlan` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `plan-actividad`
--

INSERT INTO `plan-actividad` (`idActividad`, `idPlan`, `id`) VALUES
(35, 10, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descripcion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tipo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `img` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `tipo`, `img`) VALUES
(5, 'RedBull', 'Bebida energetica', 'Bebidas', 'https://images.ctfassets.net/lcr8qbvxj7mh/eyz1nHwgaDd9TKO6jslKD/1964dc02d78dc20fe267d864d5fabe14/DRES_AR_ED-250ml_cold_closed_front_redbullcom.png'),
(6, 'Whey Protein', 'Suplemento dietario', 'Suplementos', 'https://c0.klipartz.com/pngpicture/403/33/gratis-png-suplemento-dietetico-proteina-de-suero-dymatize-elite-100-whey-dymatize-elite-whey-5lbs-whey.png'),
(7, 'Mancuernas', 'Mancuernas hexagonales (55kg)', 'Equipamiento', 'https://c0.klipartz.com/pngpicture/293/83/gratis-png-par-de-pesas-de-gimnasia-de-peso-fijo-55-negras-entrenamiento-con-pesas-con-pesas-kettlebell-aptitud-fisica-archivo-de-pesas.png'),
(8, 'Bolso deportivo', 'Bolsillos Unisex Rbc Hombre', 'Ropa y Accesorios', 'https://http2.mlstatic.com/D_NQ_NP_972259-MLA53003316466_122022-O.webp'),
(9, 'Remera Fit Deportiva', 'Running Ciclista Camiseta Hombre', 'Ropa y Accesorios', 'https://http2.mlstatic.com/D_NQ_NP_640708-MLA54868405014_042023-O.webp'),
(15, 'Kit de bandas circulares', '3 bandas circulares de latex, una por tensión', 'Equipamiento', 'https://i0.wp.com/kine-shop.com.ar/wp-content/uploads/2022/06/banda-circular-3-tensiones.jpg?fit=635%2C749&ssl=1'),
(16, 'SuperBanda para dominadas', 'Resistencia BAJA – Roja -2000 x 13 x 4.5mm', 'Equipamiento', 'https://i0.wp.com/kine-shop.com.ar/wp-content/uploads/2022/06/15679540398723ad9972eddce814d01e590ef0b2f5-3.jpg?fit=1002%2C1024&ssl=1'),
(17, 'Banda elástica con tobillera', 'Posee agarres regulables para los tobillos', 'Equipamiento', 'https://i0.wp.com/kine-shop.com.ar/wp-content/uploads/2022/06/2289.jpg?fit=800%2C800&ssl=1'),
(18, 'Guantes De Gimnasio', 'Son de cuero Mir', 'Ropa y Accesorios', 'https://i0.wp.com/kine-shop.com.ar/wp-content/uploads/2022/06/Guantes-de-Cuero-Negro.jpg?fit=1080%2C1250&ssl=1'),
(19, 'Botella Deportiva', '600ml - Pico anti derrames', 'Ropa y Accesorios', 'https://i0.wp.com/kine-shop.com.ar/wp-content/uploads/2022/06/Kinemed-d3-Tape-Botellas-2.jpg?fit=1200%2C1200&ssl=1'),
(20, 'Balanza', 'Ideal para tu casa', 'Balanzas', 'https://todoparacasa.com.ar/control/archivos/6a4457_2WhatsAppImage2022-03-17at8.09.48PM(1).jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincia`
--

CREATE TABLE `provincia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `provincia`
--

INSERT INTO `provincia` (`id`, `nombre`) VALUES
(113, 'Buenos Aires'),
(134, 'Catamarca'),
(132, 'Cordoba'),
(136, 'La Pampa'),
(137, 'La Rioja'),
(135, 'San Luis'),
(131, 'Santa Fe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sede`
--

CREATE TABLE `sede` (
  `id` int(11) NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `idLocalidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `sede`
--

INSERT INTO `sede` (`id`, `direccion`, `idLocalidad`) VALUES
(6, 'Zeballos 1340', 7),
(8, 'Pellegrini 500', 8),
(9, 'Ov. Lagos 4940', 8),
(10, 'Av. Libertad 211', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sede-act_entrenadores`
--

CREATE TABLE `sede-act_entrenadores` (
  `idEntrenador` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `idSedeAct` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `sede-act_entrenadores`
--

INSERT INTO `sede-act_entrenadores` (`idEntrenador`, `id`, `idSedeAct`) VALUES
(3, 1, 4),
(3, 7, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sedes_actividades`
--

CREATE TABLE `sedes_actividades` (
  `idSede` int(11) NOT NULL,
  `idActividad` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `sedes_actividades`
--

INSERT INTO `sedes_actividades` (`idSede`, `idActividad`, `id`) VALUES
(6, 35, 1),
(8, 35, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `dni` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `mail` varchar(60) NOT NULL,
  `id` int(11) NOT NULL,
  `contraseña` varchar(70) NOT NULL,
  `rol` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`dni`, `nombre`, `apellido`, `telefono`, `mail`, `id`, `contraseña`, `rol`) VALUES
(12313, 'Rodrigo', 'Gimenez', 99999999, 'mail@gmail.com', 11, '$2b$10$Nn2NqPAC2kdkdksJ3NHifKPZRa/.YUmsjnbtgZBHcOeO5GXWJTGLpQ6i/eC', 'user'),
(123313, 'Administrador', 'Prueba', 11212313, 'a@a.com', 16, '$2b$10$71HEFjgIOoIv/2GuFDmQ3.Yifj4B5m1bvf4B39jc19H7.pjIUnxe2', 'admin'),
(5545421, 'Franco', 'Sanchez', 8419212, 'b@b.com', 19, '$2b$10$hRF4Pwg7uaRz9deu/h.8pewkkoEsfArD8VKb5AgKmciD2JRXGmthG', 'user'),
(2149237, 'Roberto', 'Martinez', 328491, 'robertoMartinez@gmail.com', 24, '$2b$10$nUTwzEIKw.8DGFEFiEnOk.0lPw/8ViFsnWPwUOVwF8qXYyFVZ9lo2', 'user'),
(1000000, 'Manuel', 'Mongelos', 3121213, 'manumong@gmail.com', 25, '$2b$10$Dp8EaZcxXbbdt8UlzZYAGOxtF8EmRMTQAGmdU/e4UNTdntfpXoNA6', 'user'),
(89114112, 'aeasae', 'asas', 199121, 'onaeonae@gonaoms.com', 27, '$2b$10$VPh5IQOqGRn.lkHMqJlN0eo0cFiuXzHlFeA/wF/Al.xEB0igVW2jC', 'user'),
(12345672, 'Franco', 'Sanchez', 341648152, 'soporte@francosanchez.com.ar', 30, '$2b$10$qUdgMm3B2IWT3OzD45xwD.pUeR862tB63f.093XXCQaGMuLWhJHVO', 'admin'),
(919529, 'Franco', 'Sanchez', 6146412, 'aa@aa.com', 34, '$2b$10$MWuBQS6nA0HUH3hV.UutbeCf692GS1QdhXTOE6zB8u/JLHdoAdpfu', 'user'),
(43242343, 'augusto', 'castellano', 221432523, 'augustocas05@hotmail.com', 35, '$2b$10$OrZgRG9MAJdsP2rQtCaCauZVY.vRdSkXcY7zmUpe1JRmhLn/Gd/Yq', 'user'),
(44111222, 'Joaquin', 'Zubiri', 24773020, 'j@z.com', 36, '$2b$10$TqfT6aqb8pvNFj/9W5rj9uVkxj7vVbpqnbB8D3FdYPZJgrphrqXge', 'user'),
(121313, 'Nicolas', 'Fani', 121212, 'aeonae@onma.com', 37, '$2b$10$Ygqr7LKNX.TqeEfzovxGEOgyFQR1C/Kk2hQvQzZP9BiMUVWxKOuZi', 'user'),
(1213123, 'Gino', 'Fina', 121212, 'asmoasm@onae.com', 38, '$2b$10$4bOSCvT1KDDA9FVCRlZWeOJEDTf1u.7MPfkLYbJ.oXc5iiraGfB8C', 'user'),
(1212, 'waw', 'awaw', 121213, 'hola@hola.com', 39, '$2b$10$uPEuYyfWbdwMwmX6hTtKtew6a5y0lwSChZDibLSIFtuHzOcZI59M6', 'user'),
(11444222, 'p', 'p', 123, 'p@p.com', 40, '$2b$10$FoEa90YagLGroEyrU41yZuMTrAFlZ8t7QKld4BUvYBm2PAnUrGTve', 'user'),
(12345678, 'pruebaz', 'pruebaz', 123, 'prueba@prueba.com', 42, '$2b$10$5ln2YlvMGBOCbAW/DQmj/eQJB8dmvQsJgjCPrxXarWWEtf.ct6kkq', 'user');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `checkin`
--
ALTER TABLE `checkin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario_check_idx` (`idUsuario`),
  ADD KEY `fk_sede_check_idx` (`idSede`);

--
-- Indices de la tabla `cuota`
--
ALTER TABLE `cuota`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_insc_couta_idx` (`idInscripcion`);

--
-- Indices de la tabla `entrenador`
--
ALTER TABLE `entrenador`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dia-hora-idSedeAct_UNIQUE` (`idSedeAct`,`dia`,`horaDesde`);

--
-- Indices de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_idPlan_idx` (`idPlan`),
  ADD KEY `fk_usuario_insc_idx` (`idUsuario`),
  ADD KEY `fk_sede_insc_idx` (`idSede`);

--
-- Indices de la tabla `localidad`
--
ALTER TABLE `localidad`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codPostal_UNIQUE` (`codPostal`),
  ADD KEY `fk_prov_loc_idx` (`idProvincia`);

--
-- Indices de la tabla `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `plan-actividad`
--
ALTER TABLE `plan-actividad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_plan-act_idx` (`idPlan`),
  ADD KEY `fk_act_pa_idx` (`idActividad`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `provincia`
--
ALTER TABLE `provincia`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_UNIQUE` (`nombre`);

--
-- Indices de la tabla `sede`
--
ALTER TABLE `sede`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_idLocalidad_idx` (`idLocalidad`);

--
-- Indices de la tabla `sede-act_entrenadores`
--
ALTER TABLE `sede-act_entrenadores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idSedeAct_UNIQUE` (`idSedeAct`),
  ADD KEY `fk_ent_idx` (`idEntrenador`);

--
-- Indices de la tabla `sedes_actividades`
--
ALTER TABLE `sedes_actividades`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idSede-idActividad_UNIQUE` (`idSede`,`idActividad`),
  ADD KEY `fk_act-sa_idx` (`idActividad`),
  ADD KEY `fk_sede_sa_idx` (`idSede`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mailCli_UNIQUE` (`mail`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividad`
--
ALTER TABLE `actividad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `checkin`
--
ALTER TABLE `checkin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cuota`
--
ALTER TABLE `cuota`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT de la tabla `entrenador`
--
ALTER TABLE `entrenador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT de la tabla `localidad`
--
ALTER TABLE `localidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `plan`
--
ALTER TABLE `plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `plan-actividad`
--
ALTER TABLE `plan-actividad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `provincia`
--
ALTER TABLE `provincia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT de la tabla `sede`
--
ALTER TABLE `sede`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `sede-act_entrenadores`
--
ALTER TABLE `sede-act_entrenadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `sedes_actividades`
--
ALTER TABLE `sedes_actividades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `checkin`
--
ALTER TABLE `checkin`
  ADD CONSTRAINT `fk_sede_check` FOREIGN KEY (`idSede`) REFERENCES `sede` (`id`),
  ADD CONSTRAINT `fk_usuario_check` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `cuota`
--
ALTER TABLE `cuota`
  ADD CONSTRAINT `fk_insc_couta` FOREIGN KEY (`idInscripcion`) REFERENCES `inscripcion` (`id`);

--
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `fk_sa_h` FOREIGN KEY (`idSedeAct`) REFERENCES `sedes_actividades` (`id`);

--
-- Filtros para la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD CONSTRAINT `fk_plan-Insc` FOREIGN KEY (`idPlan`) REFERENCES `plan` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sede_insc` FOREIGN KEY (`idSede`) REFERENCES `sede` (`id`),
  ADD CONSTRAINT `fk_usuario_insc` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `localidad`
--
ALTER TABLE `localidad`
  ADD CONSTRAINT `fk_prov_loc` FOREIGN KEY (`idProvincia`) REFERENCES `provincia` (`id`);

--
-- Filtros para la tabla `plan-actividad`
--
ALTER TABLE `plan-actividad`
  ADD CONSTRAINT `fk_act_pa` FOREIGN KEY (`idActividad`) REFERENCES `actividad` (`id`),
  ADD CONSTRAINT `fk_plan_pa` FOREIGN KEY (`idPlan`) REFERENCES `plan` (`id`);

--
-- Filtros para la tabla `sede`
--
ALTER TABLE `sede`
  ADD CONSTRAINT `fk_idLocalidad` FOREIGN KEY (`idLocalidad`) REFERENCES `localidad` (`id`);

--
-- Filtros para la tabla `sede-act_entrenadores`
--
ALTER TABLE `sede-act_entrenadores`
  ADD CONSTRAINT `fk_ent_sae` FOREIGN KEY (`idEntrenador`) REFERENCES `entrenador` (`id`),
  ADD CONSTRAINT `fk_sa_sae` FOREIGN KEY (`idSedeAct`) REFERENCES `sedes_actividades` (`id`);

--
-- Filtros para la tabla `sedes_actividades`
--
ALTER TABLE `sedes_actividades`
  ADD CONSTRAINT `fk_act_sa` FOREIGN KEY (`idActividad`) REFERENCES `actividad` (`id`),
  ADD CONSTRAINT `fk_sede_sa` FOREIGN KEY (`idSede`) REFERENCES `sede` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
