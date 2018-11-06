var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  // port; if not 3306
  port: 3306,

  // username
  user: "root",

  // password
  password: "kUaf,UUEq3Te",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}
function runStore() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to order?",
        choices: [
          "What type of pizza would you like to buy?",
          "How many pies?",
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "What type of pizza would you like to buy?":
          buyPizza();
          break;
  
        case "How many pies?":
          howmanyPizza();
          break;
        }
      });
  }
  
  function buyPizza() {
    inquirer
      .prompt({
        name: "Pizza Type",
        type: "input",
        message: "What type of Pizza would you like to Order?"
      })
      .then(function(answer) {
        var query = "SELECT * FROM bamazon WHERE ?";
        connection.query(query, { product_name: answer.product_name }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("Position: " + res[i].id + " || Pizza Type: " + res[i].product_name + " || department_name: " + res[i].price);
          }
          runStore();
        });
      });
  }
  
  function howmanyPizza() {
    var query = "SELECT product_name FROM bamazon GROUP BY artist HAVING count(*) > 1";
    connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].artist);
      }
      runStore();
    });
  }

  runStore()