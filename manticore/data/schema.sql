DROP DATABASE IF EXISTS manticore;
CREATE DATABASE manticore;
USE manticore;

CREATE TABLE blog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url TEXT,
    title TEXT,
    text MEDIUMTEXT,
    json MEDIUMTEXT
);