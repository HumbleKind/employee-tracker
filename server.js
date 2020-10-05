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
    // afterConnection();
    runTask();
});

        // function afterConnection() {
        //     connection.query("SELECT * FROM employee", function(err, res) {
        //         if (err) throw err;
        //         console.log(res);
        //         connection.end();
        //     });
        // }

// Use inquirer switch method to ask if adding department, roles, or employee; then repeat
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

function addEmployee() {
    inquirer
        .prompt(
            [
                {
                    name: "first",
                    type: "input",
                    message: "What is the employee's first name?",
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
                }
            ])
        .then(function(answer) {
            var query = "INSERT INTO employee (id, first_name, last_name) VALUES (1, '" + answer.first + "', '" + answer.last + "')";
            connection.query(query, function(err, res) {
                if (err) throw err;
                runTask();
            })
        });
}
