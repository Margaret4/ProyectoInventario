
Use db_partent;
ALTER TABLE `db_partent`.`detalle` 
DROP FOREIGN KEY `detalle_ibfk_1`,
DROP FOREIGN KEY `detalle_ibfk_2`;
ALTER TABLE `db_partent`.`detalle` 
ADD CONSTRAINT `detalle_ibfk_1`
  FOREIGN KEY (`codpe`)
  REFERENCES `db_partent`.`partent` (`cod`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
ADD CONSTRAINT `detalle_ibfk_2`
  FOREIGN KEY (`codart`)
  REFERENCES `db_partent`.`articulo` (`cod`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `db_partent`.`partent` 
DROP FOREIGN KEY `partent_ibfk_1`;
ALTER TABLE `db_partent`.`partent` 
ADD CONSTRAINT `partent_ibfk_1`
  FOREIGN KEY (`codpro`)
  REFERENCES `db_partent`.`proveedor` (`cod`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;



CREATE TABLE `articulo` (
  `cod` VARCHAR(10) NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  `stock` FLOAT NOT  NULL, 
  `uni` VARCHAR(5) NOT  NULL, 
  PRIMARY KEY (`cod`)
);

CREATE TABLE `almacen` (
  `cod` VARCHAR(11) NOT NULL,
  `name` VARCHAR(11) NOT NULL,
  `dir` TEXT NOT NULL,
  PRIMARY KEY (`cod`)
);

CREATE TABLE `proveedor` (
  `cod` VARCHAR(11) NOT NULL,
  `name` VARCHAR(11) NOT NULL,
  PRIMARY KEY (`cod`)
);

CREATE TABLE `partent` (  
  `cod` VARCHAR(11) NOT NULL,
  `codpro` VARCHAR(11) NOT NULL,
  `codalm` VARCHAR(11) NOT NULL,
  fecha date default NOW(),
  PRIMARY KEY (`cod`),
  FOREIGN KEY (`codpro`) REFERENCES proveedor(cod),
  FOREIGN KEY (`codalm`) REFERENCES almacen(cod)
  );
CREATE TABLE `detalle` (
  `cod` int(11) NOT NULL AUTO_INCREMENT,
  `codart` VARCHAR(11) NOT NULL,
  `codpe` VARCHAR(11) NOT NULL,
  `cant` FLOAT NOT  NULL,
  PRIMARY KEY (`cod`),
  FOREIGN KEY (codpe) REFERENCES partent(cod),
  FOREIGN KEY (codart) REFERENCES articulo(cod)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `sessions` (
  `session_id` varchar(128) PRIMARY KEY NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext
);

