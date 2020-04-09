CREATE DATABASE PDM;
USE PDM;
CREATE TABLE OnlineRetail(
    StockCode TEXT,
    ItemDes TEXT,
    Quantity INTEGER,
    UnitPrice FLOAT
);

DELETE FROM OnlineRetail WHERE (StockCode IS NULL OR ItemDes IS NULL OR Quantity IS NULL OR UnitPrice IS NULL);

CREATE TABLE OnlineRetail2(
    StockCode TEXT,
    ItemDes TEXT,
    Quantity INTEGER,
    UnitPrice FLOAT
);
-- Create new Table with all item's quantity
CREATE TABLE NewOnlineRetail AS(
SELECT StockCode, ItemDes, UnitPrice, SUM(Quantity) as QUANTITY
FROM OnlineRetail
GROUP BY ItemDes);

DELETE FROM NewOnlineRetail WHERE QUANTITY <0;

