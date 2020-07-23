
CREATE TABLE `almacen` (
  `cod` varchar(11) NOT NULL,
  `name` varchar(11) NOT NULL,
  `dir` text NOT NULL,
  `est` bit(1) DEFAULT b'1',
  PRIMARY KEY (`cod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `articulo` (
  `cod` varchar(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `stock` float NOT NULL,
  `uni` varchar(5) NOT NULL,
  `est` bit(1) DEFAULT b'1',
  PRIMARY KEY (`cod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `proveedor` (
  `cod` varchar(11) NOT NULL,
  `name` varchar(11) NOT NULL,
  `est` bit(1) DEFAULT b'1',
  PRIMARY KEY (`cod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `sessions` (
  `session_id` varchar(128) NOT NULL,
  `expires` int(10) unsigned NOT NULL,
  `data` mediumtext,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `partent` (
  `cod` varchar(11) NOT NULL,
  `codpro` varchar(11) NOT NULL,
  `codalm` varchar(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`cod`),
  KEY `codalm` (`codalm`),
  KEY `partent_ibfk_1` (`codpro`),
  CONSTRAINT `partent_ibfk_1` FOREIGN KEY (`codpro`) REFERENCES `proveedor` (`cod`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `partent_ibfk_2` FOREIGN KEY (`codalm`) REFERENCES `almacen` (`cod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `detalle` (
  `cod` int(11) NOT NULL AUTO_INCREMENT,
  `codart` varchar(11) NOT NULL,
  `codpe` varchar(11) NOT NULL,
  `cant` float NOT NULL,
  PRIMARY KEY (`cod`),
  KEY `detalle_ibfk_1` (`codpe`),
  KEY `detalle_ibfk_2` (`codart`),
  CONSTRAINT `detalle_ibfk_1` FOREIGN KEY (`codpe`) REFERENCES `partent` (`cod`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detalle_ibfk_2` FOREIGN KEY (`codart`) REFERENCES `articulo` (`cod`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

