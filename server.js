const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MySQL5erver!",
    database: "employee_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.clear();
    console.log("Connected as ID " + connection.threadId);
    companyTable();
});

function companyTable() {
    var query = "SELECT employees.emp_id AS nID, employees.first_name, employees.last_name, roles.role_id AS tID, roles.title, departments.dep_id AS dID, departments.department, roles.salary FROM employees JOIN roles ON employees.role_id = roles.role_id JOIN departments ON roles.dep_id = departments.dep_id ORDER BY employees.emp_id ASC";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.clear();
        console.log("COMPANY");
        console.table(res);
        runAction();
    })
}

function runAction() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                // "View All Employees By Department",
                // "View All Employees By Manager",
                "Add Employee",
                // "Remove Employee",
                "Update Employee Role",
                // "Update Employee Manager",
                "View All Roles",
                "Add Role",
                // "Remove Roll",
                "View All Departments",
                "Add Department",
                // "Remove Department"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {

            case "View All Employees":
                viewEmployees();
                break;

            case "Add Employee":
                addEmployee();
                break;
            
            case "Update Employee Role":
                updateEmpRole();
                break;

            case "View All Roles":
                viewRoles();
                break;

            case "Add Role":
                addRole();
                break;

            case "View All Departments":
                viewDepartments();
                break;

            case "Add Department":
                addDepartment();
                break;
            }
        });
}

function viewEmployees() {
    var query = "SELECT * FROM employees";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.clear();
        console.log("EMPLOYEES");
        console.table(res);
        runAction();
    })
}

function addEmployee() {
    // display the employee table to review current employees
    var query = "SELECT * FROM employees";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.clear();
        console.log("EMPLOYEES");
        console.table(res);
    
    inquirer
        .prompt(
            [
                {
                    name: "first",
                    type: "input",
                    message: "What is the employee's first name?"
                    // validate: function(answer) {
                    //     if (answer !== "") {
                    //         return true;
                    //     }
                    //     return "Please enter at least one character."
                    // }
                },
                {
                    name: "last",
                    type: "input",
                    message: "What is the employee's last name?"
                },
                {
                    name: "role",
                    type: "input",
                    message: "What is the employee's title ID?"
                },
                {
                    name: "manager",
                    type: "input",
                    message: "What is the employee's manager ID?"
                }
            ])
        .then(function(answer) {
            // var query = "INSERT INTO employee (id, first_name, last_name) VALUES (1, '" + answer.first + "', '" + answer.last + "');
            var query = "INSERT INTO employees SET ?";
            var newEmployee = {
                first_name: answer.first,
                last_name: answer.last,
                role_id: answer.role,
                mgr_id: answer.manager
            }
            connection.query(query, newEmployee, function(err, res) {
                if (err) throw err;
                companyTable();
            })
        });
    });
}

function updateEmpRole() {
    // display the employee table to help select an employee (id) to update
    var query = "SELECT * FROM employees";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.clear();
        console.log("EMPLOYEES");
        console.table(res);
    
    inquirer
        .prompt(
            [
                {
                    name: "employee",
                    type: "input",
                    message: "Enter the 'nID' of the employee above who's title you want to update?",
                },
                {
                    name: "role",
                    type: "input",
                    message: "Enter the 'ID' for the employee's new title?",
                }
            ])
        .then(function(answer) {
            var query = "UPDATE employees SET ? WHERE ?";
            var updateRole = [
                { role_id: answer.role },
                { emp_id: answer.employee }
            ];
            connection.query(query, updateRole, function(err, res) {
                if (err) throw err;
                companyTable();
            })
        });
    });
}

function viewRoles() {
    var query = "SELECT * FROM roles";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.clear();
        console.log("ROLES");
        console.table(res);
        runAction();
    })
}

function addRole() {
    var query = "SELECT * FROM roles";
    connection.query(queryRole, function(err, res) {
        if (err) throw err;
        console.clear();
        console.log("ROLES");
        console.table(res);

    inquirer
        .prompt(
            [
                {
                    name: "title",
                    type: "input",
                    message: "What is the title for the new role?"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is the salary for the new role?"
                },
                {
                    name: "department",
                    type: "input",
                    message: "What is the department ID (dID) for the new role?"
                }
            ])
        .then(function(answer) {
            var query = "INSERT INTO roles SET ?";
            var newRole = {
                title: answer.title,
                salary: answer.salary,
                dep_id: answer.department
            }
            connection.query(query, newRole, function(err, res) {
                if (err) throw err;
                viewRoles();
            })
        });
    });
}

function viewDepartments() {
    var query = "SELECT * FROM departments";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.clear();
        console.log("DEPARTMENTS");
        console.table(res);
        runAction();
    })
}

function addDepartment() {
    inquirer
        .prompt(
            [
                {
                    name: "name",
                    type: "input",
                    message: "What is the name for the new department?"
                }
            ])
        .then(function(answer) {
            var query = "INSERT INTO departments SET ?";
            var newDepartment = {
                department: answer.name
            }
            connection.query(query, newDepartment, function(err, res) {
                if (err) throw err;
                viewDepartments();
            })
        });
}
