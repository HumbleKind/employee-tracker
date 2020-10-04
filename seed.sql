-- SEED DATA
INSERT INTO department (id, name) VALUES (1, 'Engineering');
INSERT INTO role (id, title, salary, department_id) VALUES (1, 'Software Engineer', 100000, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, 'Christian', 'Sinai', 1, NULL);

/* EXAMPLE SEED CODE
INSERT INTO department (branch) VALUES ("Sales"),("Engineering"),("Finance"),("Legal");

INSERT INTO job (title, salary, department_id)
VALUES ("Sales Lead", 100000, (SELECT id FROM department where branch = "Sales")),
("Salesperson", 80000, (SELECT id FROM department where branch = "Sales")),
("Lead Engineer", 150000, (SELECT id FROM department where branch = "Engineering")),
("Software Engineer", 120000, (SELECT id FROM department where branch = "Engineering")),
("Accountant", 125000, (SELECT id FROM department where branch = "Finance")),
("Legal Team Lead", 100000,(SELECT id FROM department where branch = "Legal")),
("Lawyer", 100000, (SELECT id FROM department where branch = "Finance"));

INSERT INTO employee (first_name, last_name, job_id)
VALUES ("John", "Doe", (SELECT id FROM job where title = "Sales Lead")),
("Mike", "Chan",(SELECT id FROM job where title = "Salesperson")),
("Ashley", "Rodriguez",(SELECT id FROM job where title = "Lead Engineer")),
("Kevin", "Tupik",(SELECT id FROM job where title = "Software Engineer")),
("Malia", "Brown",(SELECT id FROM job where title = "Accountant")),
("Sarah", "Lourd",(SELECT id FROM job where title = "Legal Team Lead")),
("Tom", "Allen",(SELECT id FROM job where title = "Lawyer"));

UPDATE employee
SET manager_id = 3
WHERE id = 1;

UPDATE employee
SET manager_id = 3
WHERE id = 4;

UPDATE employee
SET manager_id = 6
WHERE id = 7;

UPDATE employee
SET manager_id = 1
WHERE id = 2;
*/
