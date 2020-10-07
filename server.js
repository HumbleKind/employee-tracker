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
    console.log("Connected as ID " + connection.threadId);
    afterConnect();
});

function afterConnect() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.department_id, role.salary, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id=role.id";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        runTask();
    })
}

function runTask() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
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
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        runTask();
    })
}

function addEmployee() {
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
                    message: "What is the employee's role ID?"
                },
                {
                    name: "manager",
                    type: "input",
                    message: "What is the employee's manager ID?"
                }
            ])
        .then(function(answer) {
            // var query = "INSERT INTO employee (id, first_name, last_name) VALUES (1, '" + answer.first + "', '" + answer.last + "');
            var query = "INSERT INTO employee SET ?";
            var newEmployee = {
                first_name: answer.first,
                last_name: answer.last,
                role_id: answer.role,
                manager_id: answer.manager
            }
            connection.query(query, newEmployee, function(err, res) {
                if (err) throw err;
                viewEmployees();
                runTask();
            })
        });
}

function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        runTask();
    })
}

function addRole() {
    inquirer
        .prompt(
            [
                {
                    name: "title",
                    type: "input",
                    message: "What is title for the new role?"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is the salary for the new role?"
                },
                {
                    name: "department",
                    type: "input",
                    message: "What is the department ID for the new role?"
                }
            ])
        .then(function(answer) {
            var query = "INSERT INTO role SET ?";
            var newRole = {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department
            }
            connection.query(query, newRole, function(err, res) {
                if (err) throw err;
                viewEmployees();
                runTask();
            })
        });
}

function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        runTask();
    })
}
