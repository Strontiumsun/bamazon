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
    storeOpen();
});

function storeOpen() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Welcome to Inkopolis Square!\n");
        var table = new Table({
            head: ['ID', 'Product', 'Department', 'Price($)', 'Stock']
            , colWidths: [10, 35, 20, 10, 10]
        });


        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])


        }
        console.log(table.toString());
        console.log("\n");
        welcomeCustomer();
    })
};

function welcomeCustomer() {
    inquirer.prompt([
        {
            type: "input",
            message: "Write the ID of the product you wish to purchase.",
            name: "getID"
        },
        {
            type: "input",
            message: "How many units of the product would you like to purchase?",
            name: "getQuant"
        }
    ]).then(function (ans) {
        // console.log(ans);
        connection.query(`SELECT * FROM products WHERE item_id = '${ans.getID}'`, function (err, res) {
            if (err) throw err;
            // console.log(res);
            var stockIn = res[0].stock_quantity;
            var quant = parseInt(ans.getQuant);
            // console.log(stockIn, quant);

            if (stockIn - quant > 0) {
                stockIn = stockIn - quant;
                // console.log(stockIn);
                connection.query("UPDATE products SET ? WHERE ?",
                    [{
                        stock_quantity: stockIn
                    },
                    {
                        item_id: ans.getID
                    }
                    ], function (err, res) {
                        if (err) throw err;
                        console.log("Database Updated\n")
                        console.log("Thanks for your purchase!\n")
                    })


                storeOpen();
            }
            else {
                console.log("Unable to process purchase. Try again.");
                storeOpen();
            }
            //-- if amount in inventory minus ans.itemQuant is greater than 0, then perform inventory minus ans.itemQuant

        })
    });
};



// function tableTrial() {


//     // instantiate
//     var table = new Table({
//         head: ['ID', 'Product', 'Department', 'Price', 'Stock']
//         , colWidths: [10, 35, 20, 10, 10]
//     });

//     // table is an Array, so you can `push`, `unshift`, `splice` and friends
//     table.push(
//         ['First value', 'Second value']
//         , ['First value', 'Second value']
//     );

//     console.log(table.toString());
// }
