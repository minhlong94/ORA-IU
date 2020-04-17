-- SQL file to create database
CREATE DATABASE PDM;
USE PDM;
CREATE TABLE OnlineRetail(
    StockCode TEXT,
    ItemDes TEXT,
    Quantity INTEGER,
    UnitPrice FLOAT
);
-- Delete all null instances
DELETE FROM OnlineRetail WHERE (StockCode IS NULL OR ItemDes IS NULL OR Quantity IS NULL OR UnitPrice IS NULL);

-- Create new Table with item's quantity
CREATE TABLE NewOnlineRetail AS(
SELECT StockCode, ItemDes, UnitPrice, SUM(Quantity) as QUANTITY
FROM OnlineRetail
GROUP BY ItemDes);

-- Delete instances where quantity is < 0
DELETE FROM NewOnlineRetail WHERE QUANTITY <0;

