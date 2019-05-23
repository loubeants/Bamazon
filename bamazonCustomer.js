var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connection successful");
    listItems();
});

function start() {
    inquirer.prompt({
        type: "list",
        message: "Select the item or items that you want to purchase",
        name: "shopOrExit",
        choices: ["Shop", "Exit"]
    })
        .then(function (answer) {
            if (answer.shopOrExit === "Shop") {
                ShopItems();
            } else {
                connection.end();
            }
        });
};

function listItems() {
    console.log("\r\nAvailable Items:\r\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item Number: " + res[i].id + " || Item Name: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: $" + res[i].price + " || In Stock: " + res[i].stock_quantity);
        }
        start();
    });
};

function ShopItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "itemNumber",
                type: "input",
                message: "What is the item number for the product you wish to Shop?",
                validate: function (value) {
                    if ((isNaN(value) === false) && (value <= res.length)) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "itemQuantity",
                type: "input",
                message: "How many would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answer) {
            var itemNum = answer.itemNumber;
            var quantity = parseInt(answer.itemQuantity);
            var itemIndex = itemNum - 1;
            var chosenItem = res[itemIndex];
            var newQuantity = (chosenItem.stock_quantity - quantity);
            if (newQuantity >= 0) {
                query = connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            id: itemNum
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log("===========\r\nYou have ordered " + quantity + " " + chosenItem.product_name + ". Your total is $" + (chosenItem.price * quantity) + ". \r\nThank you for shopping with us.\r\n==========")
                        listItems();
                    }
                );
            }
            else {
                console.log("==========\r\nSorry, we do not have enough product left in stock to complete this order, please update your order quantity.\r\n==========")
                listItems();
            }
        });
    });
};