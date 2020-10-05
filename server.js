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
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}
