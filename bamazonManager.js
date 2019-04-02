var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3307,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startManager();
});

function startManager() {
    inquirer.prompt({
        type: "list",
        name: "options",
        message: "Welcome Manager! What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function (answer) {
        switch (answer.options) {
            case "View Products for Sale": console.log("Chose Products")
                break;
            case "View Low Inventory": console.log("Chose low inventory");
                break;
            case "Add to Inventory": console.log("chose add to inventory");
                break;
            case "Add New Product": console.log("chose new product");
                break;
            default: console.log("Please make a selection");
                break;
        }

    })
}