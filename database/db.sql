 CREATE DATABASE canciones;

USE canciones;

--//tablas

--SINGER TABLE
CREATE TABLE canciones.singers (
    id INT(11) NOT NULL AUTO_INCREMENT,
    description TEXT,
    name VARCHAR(150)NOT NULL,
    PRIMARY KEY(id)
);
--ALBUMS TABLE canciones.
CREATE TABLE canciones.albums(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(150)NOT NULL,
    url VARCHAR(255) NOT NULL, 
    description  TEXT,
    singer_id INT(11),
    CONSTRAINT fk_singer FOREIGN KEY (singer_id) REFERENCES singers(id),
    PRIMARY KEY(id)
);
--SONGS TABLE
CREATE TABLE canciones.songs(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(150)NOT NULL,
    url VARCHAR(255) NOT NULL, 
    description  TEXT,

    album_id INT(11),


    CONSTRAINT fk_album FOREIGN KEY (album_id) REFERENCES albums(id),
    PRIMARY KEY(id)
);
ALTER TABLE songs 
ADD PRIMARY KEY(id);
ALTER TABLE songs 
    MODIFY id int(11) NOT NULL AUTO_INCREMENT;

--TAGS TABLE

CREATE TABLE canciones.tags(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    PRIMARY KEY (id)
);
--SONGS_TAGS TABLE
CREATE TABLE canciones.songs_tags(
    id INT(11) NOT NULL AUTO_INCREMENT,
    tag_id INT(11),
    song_id INT(11),
    PRIMARY KEY(id)
);