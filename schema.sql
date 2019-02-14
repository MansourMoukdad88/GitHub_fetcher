DROP DATABASE IF EXISTS mansour;

CREATE DATABASE mansour;

USE mansour;

CREATE TABLE repos (
  id int NOT NULL AUTO_INCREMENT,
  repo_id integer NOT NULL,
  user_name varchar(50) NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
