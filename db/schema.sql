-- In the case that there's an existing database called company_db, delete that database --

DROP DATABASE IF EXISTS company_db;

-- Creates a new database called company_db --

CREATE DATABASE company_db;

-- Use the company_db as the default database for subsequent statements -- 

USE company_db;

-- Creates a new table within company_db called departments -- 

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

-- Creates a new table within company_db called roles --

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    salary DECIMAL (15,2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id),
    REFERENCES departments(id),
    ON DELETE SET NULL
);

-- Creates a new table within company_db called employees --

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    department_id INT,
    manager_id INT,
    FOREIGN KEY (department_id),
    REFERENCES departments(id),
    ON DELETE SET NULL
    FOREIGN KEY (role_id),
    REFERENCES roles(id),
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id),
    REFERENCES employees(id),
    ON DELETE SET NULL
);