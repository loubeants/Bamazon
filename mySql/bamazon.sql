DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    id INTEGER NOT NULL auto_increment,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price NUMERIC NOT NULL,
    stock_quantity INTEGER,
    PRIMARY KEY (id)
);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES 
    ("Basketball Shoes", "Sporting", 150.00, 70),
    ("Running Shoes","Sporting", 119.00, 45),
    ("Tenis Shoes","Sporting", 99.99, 65),
    ("Football Cleats","Sporting",114.99, 55),
    ("Workout Gloves", "Workout",39.95, 35),
    ("Dumbell", "Workout", 29.99, 25),
    ("Wrist Wrap", "Boxing Equipment", 14.99, 25),
    ("Boxing Gloves", "Boxing Equipment", 89.99, 25),
    ("Boxing Shoes", "Boxing Equipment", 149.99, 19),
    ("Mouth Guard", "Safety Equipment", 29.99, 32),
    ("Punching Bag", " Fitness", 189.99, 10),
    ("Speed bag", "Fitness", 49.99, 29),
    ("Jump Rope", "Fitness", 29.99, 52);