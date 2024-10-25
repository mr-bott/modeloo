modelPaper DataBase:

users:

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(35),
    gmail VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255),
    branch VARCHAR(7),
    year INT ,
    sem INT ,
    rollno VARCHAR(15) UNIQUE,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    google_sub VARCHAR(255),
    signup_method VARCHAR(10) NOT NULL
);
----------------------------------------------------------
CREATE TABLE `R203` (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    sub_code TEXT(10) NOT NULL,
    sub_name TEXT(60) NOT NULL
);
------------------------------------------------------------
CREATE TABLE subject (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sub_code VARCHAR(10) NOT NULL,
    sub_name VARCHAR(60) NOT NULL,
    upload_by VARCHAR(15) NOT NULL,
    img BLOB,
    upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upload_date DATE NOT NULL
);
