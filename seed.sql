DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

/*
QUESTION: is it OK to add insert statement here, or best after all create statements?
QUESTION: how many lines of 'seed' date is needed/ best?
QUESTION: what's best for dummy data?
*/
INSERT INTO department (id, name) VALUES (1, 'department');

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2),
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO role (id, title, salary, department_id) VALUES (1, 'title', 0, 1);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, 'first_name', 'last_name', 1, 1);
