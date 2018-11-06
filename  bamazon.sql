DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cheese", "Single Topping", 10.50, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pepperoni", "Single Topping", 13.50, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sausage", "Single Topping", 13.50, 350);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Canadian Bacon", "Single Topping", 14.50, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("2 Vegtable", "Double Topping", 12.50, 350);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("3 Vegtable", "Triple Topping", 13.50, 350);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("White Pie", "Speciality", 15.50, 125);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Grandma", "Speciality", 14.50, 125);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("BBQ Chicken", "Speciality", 15.50, 125);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bufflo Chicken", "Speciality", 15.50, 125);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Supreme", "Speciality", 5.10, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bake Ziti", "Speciality", 15.25, 100);
