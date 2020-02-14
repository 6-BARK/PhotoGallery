DROP DATABASE IF EXISTS houses;

CREATE DATABASE houses;

USE houses

CREATE TABLE houselisting (
    id int NOT NULL AUTO_INCREMENT,
    sqft int(10) NOT NULL,
    bedroom int(10) NOT NULL,
    bathroom int(10) NOT NULL,
    price int(10) NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE images (
    id int NOT NULL AUTO_INCREMENT,
    house_id int NOT NULL,
    image_url varchar(255) NOT NULL,
    FOREIGN KEY (house_id)
        REFERENCES houselisting(id)
    PRIMARY KEY (id)
)