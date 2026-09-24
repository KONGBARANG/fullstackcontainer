CREATE DATABASE IF NOT EXISTS appdb;
USE appdb;

-- 1. Table សម្រាប់ Login
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

-- 2. Table សម្រាប់រក្សាទុក Book (តាមរូបភាពរបស់អ្នក)
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL
);

-- បញ្ចូល Account គំរូសម្រាប់ Login
INSERT INTO users (username, password) VALUES ('admin', '123456');