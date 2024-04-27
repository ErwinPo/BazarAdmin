CREATE DATABASE IF NOT EXISTS bazar;


-- DATE RANGE & USER BY AMOUNT

DELIMITER $$

DROP PROCEDURE IF EXISTS SalesDateRangeSellerAmount$$

CREATE PROCEDURE SalesDateRangeSellerAmount(IN start_date DATE, IN end_date DATE, IN user_id INT)
BEGIN
	SELECT SUM(amount) as day_amount, DATE(date) AS day
	FROM apirest_sale
	WHERE date BETWEEN start_date AND end_date
	AND user_id_id = user_id
	AND is_active = 1
	GROUP BY DATE(date);
END$$

DELIMITER ;

-- DATE RANGE & USER BY QUANTITY

DELIMITER $$

DROP PROCEDURE IF EXISTS SalesDateRangeSellerQuantity$$

CREATE PROCEDURE SalesDateRangeSellerQuantity(IN start_date DATE, IN end_date DATE, IN user_id INT)
BEGIN
	SELECT SUM(quantity) as day_quantity, DATE(date) AS day
	FROM apirest_sale
	WHERE date BETWEEN start_date AND end_date
	AND user_id_id = user_id
	AND is_active = 1
	GROUP BY DATE(date);
END$$

DELIMITER ;

-- DATE RANGE BY AMOUNT

DELIMITER $$

DROP PROCEDURE IF EXISTS SalesDateRangeAmount$$

CREATE PROCEDURE SalesDateRangeAmount(IN start_date DATE, IN end_date DATE)
BEGIN
	SELECT SUM(amount) as day_amount, DATE(date) AS day
	FROM apirest_sale
	WHERE date BETWEEN start_date AND end_date
	AND is_active = 1
	GROUP BY DATE(date);
END$$

DELIMITER ;

-- DATE RANGE BY QUANTITY

DELIMITER $$

DROP PROCEDURE IF EXISTS SalesDateRangeQuantity$$

CREATE PROCEDURE SalesDateRangeQuantity(IN start_date DATE, IN end_date DATE)
BEGIN
	SELECT SUM(quantity) as day_quantity, DATE(date) AS day
	FROM apirest_sale
	WHERE date BETWEEN start_date AND end_date
	AND is_active = 1
	GROUP BY DATE(date);
END$$

DELIMITER ;


-- RANKING

DELIMITER $$

DROP PROCEDURE IF EXISTS Ranking$$

CREATE PROCEDURE Ranking()

BEGIN

	SELECT user_id_id AS user, SUM(amount) as amount 
	FROM `apirest_sale` 
	WHERE date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) 
	GROUP BY user_id_id; 

END$$

DELIMITER ;