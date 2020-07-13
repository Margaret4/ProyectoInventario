
Use db_partent;
CREATE TABLE `partent` (
  
  `cod` int(11) NOT NULL,
  `codpro` int(11) NOT NULL,
  `codalm` int(11) NOT NULL,
  fecha date,
  PRIMARY KEY (`cod`),
  FOREIGN KEY (`codpro`) REFERENCES proveedor(cod),
  FOREIGN KEY (`codalm`) REFERENCES almacen(cod)
  );

drop table partent;
CREATE TABLE `detalle` (
  
  `cod` int(11) NOT NULL,
  `codart` int(11) NOT NULL,
  `codpe` int(11) NOT NULL,
  `cant` varchar(20) NOT NULL,
  PRIMARY KEY (`cod`),
  FOREIGN KEY (codpe) REFERENCES partent(cod),
  FOREIGN KEY (codart) REFERENCES articulo(cod)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `sessions` (
  `session_id` varchar(128) PRIMARY KEY NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext
);

