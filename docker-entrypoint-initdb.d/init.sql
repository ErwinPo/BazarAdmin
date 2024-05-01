CREATE DATABASE IF NOT EXISTS bazar;

USE bazar;

-- DATE RANGE & USER BY AMOUNT

DELIMITER $$

DROP PROCEDURE IF EXISTS SalesDateRangeSellerAmount$$

CREATE PROCEDURE SalesDateRangeSellerAmount(IN start_date VARCHAR(20), IN end_date VARCHAR(20), IN user_id INT, IN temporality VARCHAR(20))
BEGIN

	SELECT 

		CASE 

			WHEN temporality = 'daily' THEN DATE(date)
			WHEN temporality = 'weekly' THEN DATE_SUB(DATE(date), INTERVAL WEEKDAY(date) DAY)
			WHEN temporality = 'monthly' THEN DATE_FORMAT(date, '%Y-%m-01')
			WHEN temporality = 'annually' THEN DATE_FORMAT(date, '%Y-01-01')

		END AS interval_time,
		SUM(amount) as total_amount

	FROM APIRest_sale
	WHERE DATE(date) BETWEEN STR_TO_DATE(start_date, '%Y-%m-%d') AND STR_TO_DATE(end_date, '%Y-%m-%d')
	AND user_id_id = user_id
	GROUP BY 
		CASE 
			WHEN temporality = 'daily' THEN DATE(date)
			WHEN temporality = 'weekly' THEN DATE_SUB(DATE(date), INTERVAL WEEKDAY(date) DAY)
			WHEN temporality = 'monthly' THEN DATE_FORMAT(date, '%Y-%m-01')
			WHEN temporality = 'annually' THEN DATE_FORMAT(date, '%Y-01-01')
    	END;

END$$

DELIMITER ;

-- DATE RANGE & USER BY QUANTITY

DELIMITER $$

DROP PROCEDURE IF EXISTS SalesDateRangeSellerQuantity$$

CREATE PROCEDURE SalesDateRangeSellerQuantity(IN start_date VARCHAR(20), IN end_date VARCHAR(20), IN user_id INT, IN temporality VARCHAR(20))
BEGIN

	SELECT 

		CASE 

			WHEN temporality = 'daily' THEN DATE(date)
			WHEN temporality = 'weekly' THEN DATE_SUB(DATE(date), INTERVAL WEEKDAY(date) DAY)
			WHEN temporality = 'monthly' THEN DATE_FORMAT(date, '%Y-%m-01')
			WHEN temporality = 'annually' THEN DATE_FORMAT(date, '%Y-01-01')

		END AS interval_time,
		SUM(quantity) as total_quantity
		
	FROM APIRest_sale
	WHERE DATE(date) BETWEEN STR_TO_DATE(start_date, '%Y-%m-%d') AND STR_TO_DATE(end_date, '%Y-%m-%d')
	AND user_id_id = user_id
	GROUP BY  
		CASE 
			WHEN temporality = 'daily' THEN DATE(date)
			WHEN temporality = 'weekly' THEN DATE_SUB(DATE(date), INTERVAL WEEKDAY(date) DAY)
			WHEN temporality = 'monthly' THEN DATE_FORMAT(date, '%Y-%m-01')
			WHEN temporality = 'annually' THEN DATE_FORMAT(date, '%Y-01-01')
    	END;
END$$

DELIMITER ;

-- DATE RANGE BY AMOUNT

DELIMITER $$

DROP PROCEDURE IF EXISTS SalesDateRangeAmount$$

CREATE PROCEDURE SalesDateRangeAmount(IN start_date VARCHAR(20), IN end_date VARCHAR(20), IN temporality VARCHAR(20))
BEGIN
	SELECT 

		CASE 

			WHEN temporality = 'daily' THEN DATE(date)
			WHEN temporality = 'weekly' THEN DATE_SUB(DATE(date), INTERVAL WEEKDAY(date) DAY)
			WHEN temporality = 'monthly' THEN DATE_FORMAT(date, '%Y-%m-01')
			WHEN temporality = 'annually' THEN DATE_FORMAT(date, '%Y-01-01')

		END AS interval_time,
		SUM(amount) as total_amount
	FROM APIRest_sale
	WHERE DATE(date) BETWEEN STR_TO_DATE(start_date, '%Y-%m-%d') AND STR_TO_DATE(end_date, '%Y-%m-%d')
	GROUP BY 
		CASE 
			WHEN temporality = 'daily' THEN DATE(date)
			WHEN temporality = 'weekly' THEN DATE_SUB(DATE(date), INTERVAL WEEKDAY(date) DAY)
			WHEN temporality = 'monthly' THEN DATE_FORMAT(date, '%Y-%m-01')
			WHEN temporality = 'annually' THEN DATE_FORMAT(date, '%Y-01-01')
    	END;
END$$

DELIMITER ;

-- DATE RANGE BY QUANTITY

DELIMITER $$

DROP PROCEDURE IF EXISTS SalesDateRangeQuantity$$

CREATE PROCEDURE SalesDateRangeQuantity(IN start_date VARCHAR(20), IN end_date VARCHAR(20), IN temporality VARCHAR(20))
BEGIN
	SELECT 

		CASE 

			WHEN temporality = 'daily' THEN DATE(date)
			WHEN temporality = 'weekly' THEN DATE_SUB(DATE(date), INTERVAL WEEKDAY(date) DAY)
			WHEN temporality = 'monthly' THEN DATE_FORMAT(date, '%Y-%m-01')
			WHEN temporality = 'annually' THEN DATE_FORMAT(date, '%Y-01-01')

		END AS interval_time,
		SUM(quantity) as total_quantity

	FROM APIRest_sale
	WHERE DATE(date) BETWEEN STR_TO_DATE(start_date, '%Y-%m-%d') AND STR_TO_DATE(end_date, '%Y-%m-%d')
	GROUP BY 
		CASE 
			WHEN temporality = 'daily' THEN DATE(date)
			WHEN temporality = 'weekly' THEN DATE_SUB(DATE(date), INTERVAL WEEKDAY(date) DAY)
			WHEN temporality = 'monthly' THEN DATE_FORMAT(date, '%Y-%m-01')
			WHEN temporality = 'annually' THEN DATE_FORMAT(date, '%Y-01-01')
    	END;

END$$

DELIMITER ;


-- RANKING

DELIMITER $$

DROP PROCEDURE IF EXISTS Ranking$$

CREATE PROCEDURE Ranking()

BEGIN

	SELECT user_id_id AS user, SUM(amount) as amount 
	FROM APIRest_sale 
	WHERE date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) 
	GROUP BY user_id_id; 

END$$

DELIMITER ;