var mysql = require("mysql");
var Table = require('cli-table');
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
            case "View Products for Sale": viewProducts();
                break;
            case "View Low Inventory": viewLowInventory();
                break;
            case "Add to Inventory": addInventory();
                break;
            case "Add New Product": addProduct();
                break;
            default: console.log("Please make a selection");
                break;
        }
    })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Viewing Products...\n");
        var table = new Table({
            head: ['ID', 'Product', 'Department', 'Price($)', 'Stock']
            , colWidths: [10, 35, 20, 10, 10]
        });

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        }
        console.log(table.toString());
        console.log("\n");
        startManager();
    })
}

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        console.log("These products need more inventory!\n");
        var table = new Table({
            head: ['ID', 'Product', 'Department', 'Price($)', 'Stock']
            , colWidths: [10, 35, 20, 10, 10]
        });

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        }
        console.log(table.toString());
        console.log("\n");
        startManager();
    })
}

function addInventory() {
    inquirer.prompt([{
        type: "input",
        name: "product",
        message: "What product would you like to restock?"
    },
    {
        type: "input",
        name: "quantity",
        message: "How much would you like to add?"
    }]).then(function (answer) {
        connection.query(`SELECT * FROM products WHERE item_id = '${answer.product}'`, function (err, res) {
            if (err) throw err;
            // console.log(res);
            var stockNow = res[0].stock_quantity;
            var quant = parseInt(answer.quantity);
            // console.log(stockNow, quant);

            var newStock = stockNow + quant;

            // console.log(newStock);

            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newStock
                    },
                    {
                        item_id: answer.product
                    }
                ], function (err, res) {
                    if (err) throw err;
                    // console.log(res);
                    console.log("Stock Added!")

                });
        })
        startManager();
    })
}

function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter name of new product",
            name: "product_new"
        },
        {
            type: "input",
            message: "Enter price of new product",
            name: "product_price"
        },
        {
            type: "input",
            message: "Enter stock quantity of new product",
            name: "product_stock"
        },
        {
            type: "list",
            message: "Choose a Department",
            name: "product_depo",
            choices: ["Headgear", "Clothing", "Shoes"]
        }
    ]).then(function (ans) {
        console.log(ans.product_new, ans.product_price, ans.product_stock, ans.product_depo)
        connection.query("INSERT INTO products SET ?",
            {
                product_name: ans.product_new,
                department_name: ans.product_depo,
                price: ans.product_price,
                stock_quantity: ans.product_stock
            }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " product inserted!\n");
            })
        startManager();
    })
}