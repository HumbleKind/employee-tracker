SELECT
    employees.emp_id AS nID,
    employees.first_name,
    employees.last_name,
    roles.role_id AS rID,
    roles.title,
    departments.dep_id AS dID,
    departments.department,
    roles.salary,
    employees.mgr_id
FROM employees
JOIN roles
ON employees.role_id = roles.role_id
JOIN departments
ON roles.dep_id = departments.dep_id
ORDER BY employees.emp_id ASC;
