create database bamazon;

use bamazon;

create table products(
    item_id integer(11) not null auto_increment,
    product_name varchar(30),
    department_name varchar(30),
    price decimal(11, 2),
    stock_quantity integer(11),
    primary key (item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
Values ("Backwards Cap", "Headgear", 7.00, 40);

insert into products(product_name, department_name, price, stock_quantity)
Values ("Double Egg Shades", "Headgear", 22.00, 15),
("Full Moon Glasses", "Headgear", 6.50, 37),
("Berry Ski Jacket", "Clothing", 39.00, 11),
("Hothouse Hoodie", "Clothing", 38.50, 66),
("Inkfall Shirt", "Clothing", 49.75, 54),
("Pink Hoodie", "Clothing", 34.00, 28),
("Banana Basics", "Shoes", 15.75, 89),
("Gold Hi-Horses", "Shoes", 70.00, 36),
("Suede Marine Lace-Ups", "Shoes", 12.25, 90);

