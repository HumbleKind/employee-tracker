-- SEED DATA
INSERT INTO departments (department)
VALUES ("Engineering"),("Finance"),("Legal"),("Sales");

INSERT INTO roles (title, salary, dep_id)
VALUES ("Accountant", 125000, 2),
("Lawyer", 100000, 3),
("Lead Engineer", 150000, 1),
("Legal Team Lead", 100000, 3),
("Sales Lead", 100000, 4),
("Salesperson", 80000, 4),
("Software Engineer", 120000, 1);

INSERT INTO employees (first_name, last_name, role_id, mgr_id)
VALUES ("John", "Doe", 5, 3),
("Mike", "Chan", 6, 1),
("Ashley", "Rodriguez", 3, null),
("Kevin", "Tupik", 7, 3),
("Malia", "Brown", 1, null),
("Sarah", "Lourd", 4, null),
("Tom", "Allen", 2, 6),
("Christian", "Eckenrode", 3, 2);
