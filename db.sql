DROP DATABASE IF EXISTS OnlineRetailDB;
CREATE DATABASE OnlineRetailDB;
USE OnlineRetailDB;

CREATE TABLE Customer
(
  username VARCHAR(15) NOT NULL,
  password VARCHAR(80) NOT NULL,
  user_id VARCHAR(15) NOT NULL,
  first_name VARCHAR(15) NOT NULL,
  last_name VARCHAR(15) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE (username)
);

CREATE TABLE Class
(
  class_id INT NOT NULL,
  class_name VARCHAR(25) NOT NULL,
  PRIMARY KEY (class_id)
);

CREATE TABLE Supplier
(
  supplier_id INT NOT NULL,
  supplier_name VARCHAR(25) NOT NULL,
  PRIMARY KEY (supplier_id)
);

CREATE TABLE BankName
(
  bank_id INT NOT NULL,
  name VARCHAR(25) NOT NULL,
  PRIMARY KEY (bank_id)
);

CREATE TABLE Item
(
  item_id VARCHAR(15) NOT NULL,
  item_name VARCHAR(25) NOT NULL,
  price FLOAT NOT NULL,
  amount INT NOT NULL,
  class_id INT NOT NULL,
  supplier_id INT NOT NULL,
  PRIMARY KEY (item_id),
  FOREIGN KEY (class_id) REFERENCES Class(class_id),
  FOREIGN KEY (supplier_id) REFERENCES Supplier(supplier_id)
);

CREATE TABLE BankAccount
(
  customer_id VARCHAR(15) NOT NULL,
  bank_number VARCHAR(20) NOT NULL,
  user_id VARCHAR(15) NOT NULL,
  bank_id INT NOT NULL,
  PRIMARY KEY (customer_id, user_id, bank_id),
  FOREIGN KEY (user_id) REFERENCES Customer(user_id),
  FOREIGN KEY (bank_id) REFERENCES BankName(bank_id)
);

CREATE TABLE Bill
(
  bill_id VARCHAR(15) NOT NULL,
  discount FLOAT,
  address VARCHAR(50) NOT NULL,
  timestamp VARCHAR(20) NOT NULL,
  customer_id VARCHAR(15) NOT NULL,
  user_id VARCHAR(15) NOT NULL,
  PRIMARY KEY (bill_id, customer_id, user_id),
  FOREIGN KEY (customer_id, user_id) REFERENCES BankAccount(customer_id, user_id)
);

CREATE TABLE BillDetail
(
  amount INT NOT NULL,
  bill_id VARCHAR(15) NOT NULL,
  item_id VARCHAR(15) NOT NULL,
  PRIMARY KEY (bill_id, item_id),
  FOREIGN KEY (bill_id) REFERENCES Bill(bill_id),
  FOREIGN KEY (item_id) REFERENCES Item(item_id)
);

INSERT INTO Class(class_id, class_name) VALUES(1,"Cooking");
INSERT INTO Class(class_id, class_name) VALUES(2,"Sports");

INSERT INTO Supplier(supplier_id, supplier_name) VALUES(1, "Nestle");
INSERT INTO Supplier(supplier_id, supplier_name) VALUES(2, "Addidas");

INSERT INTO Item(item_id, item_name, price, amount, class_id, supplier_id) VALUES(1, "Soy Sauce", 20000, 30, 1, 1);
INSERT INTO Item(item_id, item_name, price, amount, class_id, supplier_id) VALUES(2, "Racket", 100000, 20, 2, 2);

INSERT INTO BankName(bank_id, name) VALUES(1,'American Express');
INSERT INTO BankName(bank_id, name) VALUES(2,'Discover');
INSERT INTO BankName(bank_id, name) VALUES(3,'Mastercard');
INSERT INTO BankName(bank_id, name) VALUES(4,'Visa Retired');
INSERT INTO BankName(bank_id, name) VALUES(5,'Visa');