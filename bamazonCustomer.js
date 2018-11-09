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

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

function runStore() {
  inquirer
    .prompt({
      name: "orderorLeave",
      type: "rawlist",
      message: "Would you like to [ORDER] pizza or [CREATE] your own pie?",
      choices: [
        "ORDER",
        "CREATE",
      ]
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      switch (answer.action) {
        case "ORDER":
          buyPizza();
          break;

        case "CREATE":
          // howmanyPizza();
          createPie()
          break;
      }
    });
}
// fuction to buy Pizza 
function buyPizza() {
  // we need to query all the pizza types available to buy
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    // we should have the items and prompt the customer for the type of pizza they want to buy
    inquirer
      .prompt([{
          name: "Choose",
          type: "rawlist",
          choice: function () {
            var pizzaArray = [];
            for (var i = 0; i < results.length; i++) {
              pizzaArray.push(results[i].pizza);
            }
            return pizzaArray;
          },
          message: "What do you want to order my lil Piasan, I don't got all day"
        },
        {
          name: "cash",
          type: "input",
          message: "Do you have enough cash or do I have to have my two friends talk to you out back?"
        }
      ])
      .then(function (answer) {
        // this gets the info of the pie that is choosen
        var chosenPie;
        for (var i = 0; i < results.length; i++) {
          if (results[i].pizza === answer.choice) {
            chosenPie === results[i];
          }
        }
        // does this Paisan have enough cash for their pizza??
        if (chosenPie.price < parseInt(answer.cash)) {
          // if the paisan got the cash...update the database, let the them know whats up and grab the next customer
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [{
                price: answer.cash
              },
              {
                id: chosenPie.id
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("Your money is good here...Here is your pie");
              runStore();
            }
          );
        } else {
          // you didn't have enough cash, beat the customer up for wasteing your time
          console.log("Listen you don't have enough money for the Pizza, get out of here before I introduce you to my cousins")
          runStore();
        }
      });
  });
}


function createPie() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([{
        name: "Pizza",
        type: "input",
        message: "What type of Pizza do you want?"
      },
      {
        name: "Topping",
        type: "input",
        message: "What toppings do you want on your pizza?"
      },
      {
        name: "Quanity",
        type: "input",
        message: "How many pies do you want?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?", {
          pizza: answer.Pizza,
          topping: answer.Topping,
          price: "18.00",
          pizza_quantity: answer.Quantity,
        },
        function (err) {
          if (err) throw err;
          console.log("Your Pizza masterpiece was made with love Piasan!!");
          // re-prompt the user for if they want to bid or post
          runStore();
        }
      );
    });
}
