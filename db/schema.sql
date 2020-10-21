DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
    dep_id INT AUTO_INCREMENT,
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY (dep_id)
);

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10) NOT NULL,
    dep_id INT NOT NULL,
    PRIMARY KEY (role_id),
    FOREIGN KEY (dep_id) REFERENCES departments(dep_id)
);

CREATE TABLE employees (
    emp_id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    mgr_id INT NULL,
    PRIMARY KEY (emp_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
    -- FOREIGN KEY (manager_id) REFERENCES emmployees(emp_id)
);
