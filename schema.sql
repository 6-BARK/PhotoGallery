DROP DATABASE IF EXISTS houses;

CREATE DATABASE houses;

USE houses

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
)

CREATE TABLE houselisting (
    id int NOT NULL AUTO_INCREMENT,
    users_id int NOT NULL,
    sqft int(10) NOT NULL,
    bedroom int(10) NOT NULL,
    bathroom int(10) NOT NULL,
    price int(10) NOT NULL,
    FOREIGN KEY (users_id)
        REFERENCES users(id)
    PRIMARY KEY (id)
)

CREATE TABLE images (
    id int NOT NULL AUTO_INCREMENT,
    users_id int NOT NULL,
    house_id int NOT NULL,
    image_url varchar(255) NOT NULL,
    FOREIGN KEY (house_id)
        REFERENCES houselisting(id)
    FOREIGN KEY (users_id)
        REFERENCES users(id)
    PRIMARY KEY (id)
)

CREATE TABLE usersavedhomes (
    id int NOT NULL AUTO_INCREMENT,
    users_id int NOT NULL,
    house_id int NOT NULL,
    FOREIGN KEY (users_id) 
        REFERENCES users(id)
    FOREIGN KEY (house_id) 
        REFERENCES houselisting(id)
    PRIMARY KEY (id)
)