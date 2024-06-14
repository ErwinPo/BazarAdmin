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
	GROUP BY interval_time;

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
	GROUP BY interval_time;
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
	GROUP BY interval_time;

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
	GROUP BY interval_time;

END$$

DELIMITER ;


-- RANKING

DELIMITER $$

DROP PROCEDURE IF EXISTS Ranking$$

CREATE PROCEDURE Ranking()

BEGIN

	SELECT user_id_id AS user, username, SUM(amount) as amount 
	FROM APIRest_sale 
    INNER JOIN APIRest_user ON APIRest_sale.user_id_id = APIRest_user.id
	WHERE date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) 
	GROUP BY user_id_id
    ORDER BY amount DESC; 
	
END$$

DELIMITER ;

DELIMITER //

DROP PROCEDURE IF EXISTS CalculateSalesChangeAmountUser//

CREATE PROCEDURE CalculateSalesChangeAmountUser(IN start_date_param DATE, IN end_date_param DATE, IN user_id_param INT, IN temporality VARCHAR(20))
BEGIN
    
    DECLARE growth FLOAT(20,10);
    DECLARE initial_sum INT;
    DECLARE final_sum INT;
    DECLARE days_diff INT;

    -- Correcta declaración y asignación de la variable new_start_date
    DECLARE new_start_date DATE;

    -- Correcta declaración y asignación de la variable new_end_date
    DECLARE new_end_date DATE;
    
    SET days_diff = DATEDIFF(start_date_param, end_date_param);
    SET new_end_date = DATE_SUB(end_date_param, INTERVAL days_diff DAY);
    SET new_start_date = DATE_SUB(start_date_param, INTERVAL days_diff DAY);


    
    -- Crear una tabla temporal para almacenar los resultados de la consulta principal
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_sales_data (
        interval_time DATE,
        total_amount INT
    );

    CREATE TEMPORARY TABLE IF NOT EXISTS new_temp_sales_data (
        interval_time DATE,
        total_amount INT
    );

    CREATE TEMPORARY TABLE IF NOT EXISTS dates_comparison (
        timeone DATE,
        timetwo DATE,
        growth_rate FLOAT(20, 10)
    );
    
    -- FECHAS INICIALES
    -- Insertar los resultados de la consulta principal en la tabla temporal
    INSERT INTO temp_sales_data
    SELECT 
        CASE 
            WHEN temporality = 'daily' THEN DATE(date)
            WHEN temporality = 'weekly' THEN DATE_SUB(DATE(date), INTERVAL WEEKDAY(date) DAY)
            WHEN temporality = 'monthly' THEN DATE_FORMAT(date, '%Y-%m-01')
            WHEN temporality = 'annually' THEN DATE_FORMAT(date, '%Y-01-01')
        END AS interval_time,
        SUM(amount) as total_amount
    FROM 
        APIRest_sale
    WHERE 
        DATE(date) BETWEEN start_date_param AND end_date_param
        AND user_id_id = user_id_param
    GROUP BY 
        interval_time;

    
    SELECT SUM(total_amount) INTO final_sum FROM temp_sales_data;
    SET final_sum = IFNULL(final_sum, 1);
    
    -- FECHAS VS

    INSERT INTO new_temp_sales_data
    SELECT 
        CASE 
            WHEN temporality = 'daily' THEN DATE(date)
            WHEN temporality = 'weekly' THEN DATE_SUB(DATE(date), INTERVAL WEEKDAY(date) DAY)
            WHEN temporality = 'monthly' THEN DATE_FORMAT(date, '%Y-%m-01')
            WHEN temporality = 'annually' THEN DATE_FORMAT(date, '%Y-01-01')
        END AS interval_time,
        SUM(amount) as total_amount
    FROM 
        APIRest_sale
    WHERE 
        DATE(date) BETWEEN new_start_date AND new_end_date
        AND user_id_id = user_id_param
    GROUP BY 
        interval_time;
    

    
    
    SELECT SUM(total_amount) INTO initial_sum FROM new_temp_sales_data;

    SET initial_sum = IFNULL(initial_sum, 1);


    SET growth = IFNULL( ((final_sum - initial_sum) / initial_sum * 100 ), 0);
    INSERT INTO dates_comparison(timeone, timetwo, growth_rate) VALUES (new_start_date, start_date_param, growth);

    
    SELECT * FROM dates_comparison;
    
    DROP TEMPORARY TABLE IF EXISTS temp_sales_data;
    DROP TEMPORARY TABLE IF EXISTS new_temp_sales_data;

    DROP TEMPORARY TABLE IF EXISTS dates_comparison;

END //

DELIMITER ;



DELIMITER //

DROP PROCEDURE IF EXISTS CalculateSalesChangeQuantityUser//

CREATE PROCEDURE CalculateSalesChangeQuantityUser(IN start_date_param DATE, IN end_date_param DATE, IN user_id_param INT, IN temporality VARCHAR(20))
BEGIN
    
    DECLARE growth FLOAT(20,10);
    DECLARE initial_sum INT;
    DECLARE final_sum INT;
    DECLARE days_diff INT;

    -- Correcta declaración y asignación de la variable new_start_date
    DECLARE new_start_date DATE;

    -- Correcta declaración y asignación de la variable new_end_date
    DECLARE new_end_date DATE;
    
    SET days_diff = DATEDIFF(start_date_param, end_date_param);
    SET new_end_date = DATE_SUB(end_date_param, INTERVAL days_diff DAY);
    SET new_start_date = DATE_SUB(start_date_param, INTERVAL days_diff DAY);


    
    -- Crear una tabla temporal para almacenar los resultados de la consulta principal
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_sales_data (
        interval_time DATE,
        total_quantity INT
    );

    CREATE TEMPORARY TABLE IF NOT EXISTS new_temp_sales_data (
        interval_time DATE,
        total_quantity INT
    );

    CREATE TEMPORARY TABLE IF NOT EXISTS dates_comparison (
        timeone DATE,
        timetwo DATE,
        growth_rate FLOAT(20, 10)
    );
    
    -- FECHAS INICIALES
    -- Insertar los resultados de la consulta principal en la tabla temporal
    INSERT INTO temp_sales_data
    SELECT 
        CASE 
            WHEN temporality = 'daily' THEN DATE(date)
            WHEN temporality = 'weekly' THEN DATE_SUB(DATE(date), INTERVAL WEEKDAY(date) DAY)
            WHEN temporality = 'monthly' THEN DATE_FORMAT(date, '%Y-%m-01')
            WHEN temporality = 'annually' THEN DATE_FORMAT(date, '%Y-01-01')
        END AS interval_time,
        SUM(quantity) as total_quantity
    FROM 
        APIRest_sale
    WHERE 
        DATE(date) BETWEEN start_date_param AND end_date_param
        AND user_id_id = user_id_param
    GROUP BY 
        interval_time;

    
    SELECT SUM(total_quantity) INTO final_sum FROM temp_sales_data;
    SET final_sum = IFNULL(final_sum, 1);
    
    -- FECHAS VS

    INSERT INTO new_temp_sales_data
    SELECT 
        CASE 
            WHEN temporality = 'daily' THEN DATE(date)
            WHEN temporality = 'weekly' THEN DATE_SUB(DATE(date), INTERVAL WEEKDAY(date) DAY)
            WHEN temporality = 'monthly' THEN DATE_FORMAT(date, '%Y-%m-01')
            WHEN temporality = 'annually' THEN DATE_FORMAT(date, '%Y-01-01')
        END AS interval_time,
        SUM(quantity) as total_quantity
    FROM 
        APIRest_sale
    WHERE 
        DATE(date) BETWEEN new_start_date AND new_end_date
        AND user_id_id = user_id_param
    GROUP BY 
        interval_time;
    

    
    
    SELECT SUM(total_quantity) INTO initial_sum FROM new_temp_sales_data;
    SET initial_sum = IFNULL(initial_sum, 1);


    SET growth = IFNULL( ((final_sum - initial_sum) / initial_sum * 100 ), 0);
    INSERT INTO dates_comparison(timeone, timetwo, growth_rate) VALUES (new_start_date, start_date_param, growth);

    
    SELECT * FROM dates_comparison;
    
    DROP TEMPORARY TABLE IF EXISTS temp_sales_data;
    DROP TEMPORARY TABLE IF EXISTS new_temp_sales_data;

    DROP TEMPORARY TABLE IF EXISTS dates_comparison;
END //

DELIMITER ;




DELIMITER //

DROP PROCEDURE IF EXISTS CalculateSalesChangeAmount//

CREATE PROCEDURE CalculateSalesChangeAmount(IN start_date_param DATE, IN end_date_param DATE, IN temporality VARCHAR(20))
BEGIN
    
    DECLARE growth FLOAT(20,10);
    DECLARE initial_sum INT;
    DECLARE final_sum INT;
    DECLARE days_diff INT;

    -- Correcta declaración y asignación de la variable new_start_date
    DECLARE new_start_date DATE;

    -- Correcta declaración y asignación de la variable new_end_date
    DECLARE new_end_date DATE;
    
    SET days_diff = DATEDIFF(start_date_param, end_date_param);
    SET new_end_date = DATE_SUB(end_date_param, INTERVAL days_diff DAY);
    SET new_start_date = DATE_SUB(start_date_param, INTERVAL days_diff DAY);


    
    -- Crear una tabla temporal para almacenar los resultados de la consulta principal
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_sales_data (
        interval_time DATE,
        total_amount INT
    );

    CREATE TEMPORARY TABLE IF NOT EXISTS new_temp_sales_data (
        interval_time DATE,
        total_amount INT
    );

    CREATE TEMPORARY TABLE IF NOT EXISTS dates_comparison (
        timeone DATE,
        timetwo DATE,
        growth_rate FLOAT(20, 10)
    );
    
    -- FECHAS INICIALES
    -- Insertar los resultados de la consulta principal en la tabla temporal
    INSERT INTO temp_sales_data
    SELECT 
        CASE 
            WHEN temporality = 'daily' THEN DATE(date)
            WHEN temporality = 'weekly' THEN DATE_SUB(DATE(date), INTERVAL WEEKDAY(date) DAY)
            WHEN temporality = 'monthly' THEN DATE_FORMAT(date, '%Y-%m-01')
            WHEN temporality = 'annually' THEN DATE_FORMAT(date, '%Y-01-01')
        END AS interval_time,
        SUM(amount) as total_amount
    FROM 
        APIRest_sale
    WHERE 
        DATE(date) BETWEEN start_date_param AND end_date_param
    GROUP BY 
        interval_time;

    
    SELECT SUM(total_amount) INTO final_sum FROM temp_sales_data;
    SET final_sum = IFNULL(final_sum, 1);
    
    -- FECHAS VS

    INSERT INTO new_temp_sales_data
    SELECT 
        CASE 
            WHEN temporality = 'daily' THEN DATE(date)
            WHEN temporality = 'weekly' THEN DATE_SUB(DATE(date), INTERVAL WEEKDAY(date) DAY)
            WHEN temporality = 'monthly' THEN DATE_FORMAT(date, '%Y-%m-01')
            WHEN temporality = 'annually' THEN DATE_FORMAT(date, '%Y-01-01')
        END AS interval_time,
        SUM(amount) as total_amount
    FROM 
        APIRest_sale
    WHERE 
        DATE(date) BETWEEN new_start_date AND new_end_date
    GROUP BY 
        interval_time;
    

    
    
    SELECT SUM(total_amount) INTO initial_sum FROM new_temp_sales_data;
    SET initial_sum = IFNULL(initial_sum, 1);


    SET growth = IFNULL( ((final_sum - initial_sum) / initial_sum * 100 ), 0);
    INSERT INTO dates_comparison(timeone, timetwo, growth_rate) VALUES (new_start_date, start_date_param, growth);

    
    SELECT * FROM dates_comparison;
    
    DROP TEMPORARY TABLE IF EXISTS temp_sales_data;
    DROP TEMPORARY TABLE IF EXISTS new_temp_sales_data;

    DROP TEMPORARY TABLE IF EXISTS dates_comparison;
END //

DELIMITER ;



DELIMITER //

DROP PROCEDURE IF EXISTS CalculateSalesChangeQuantity//

CREATE PROCEDURE CalculateSalesChangeQuantity(IN start_date_param DATE, IN end_date_param DATE, IN temporality VARCHAR(20))
BEGIN
    
    DECLARE growth FLOAT(20,10);
    DECLARE initial_sum INT;
    DECLARE final_sum INT;
    DECLARE days_diff INT;

    -- Correcta declaración y asignación de la variable new_start_date
    DECLARE new_start_date DATE;

    -- Correcta declaración y asignación de la variable new_end_date
    DECLARE new_end_date DATE;
    
    SET days_diff = DATEDIFF(start_date_param, end_date_param);
    SET new_end_date = DATE_SUB(end_date_param, INTERVAL days_diff DAY);
    SET new_start_date = DATE_SUB(start_date_param, INTERVAL days_diff DAY);


    
    -- Crear una tabla temporal para almacenar los resultados de la consulta principal
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_sales_data (
        interval_time DATE,
        total_quantity INT
    );

    CREATE TEMPORARY TABLE IF NOT EXISTS new_temp_sales_data (
        interval_time DATE,
        total_quantity INT
    );

    CREATE TEMPORARY TABLE IF NOT EXISTS dates_comparison (
        timeone DATE,
        timetwo DATE,
        growth_rate FLOAT(20, 10)
    );
    
    -- FECHAS INICIALES
    -- Insertar los resultados de la consulta principal en la tabla temporal
    INSERT INTO temp_sales_data
    SELECT 
        CASE 
            WHEN temporality = 'daily' THEN DATE(date)
            WHEN temporality = 'weekly' THEN DATE_SUB(DATE(date), INTERVAL WEEKDAY(date) DAY)
            WHEN temporality = 'monthly' THEN DATE_FORMAT(date, '%Y-%m-01')
            WHEN temporality = 'annually' THEN DATE_FORMAT(date, '%Y-01-01')
        END AS interval_time,
        SUM(quantity) as total_quantity
    FROM 
        APIRest_sale
    WHERE 
        DATE(date) BETWEEN start_date_param AND end_date_param
    GROUP BY 
        interval_time;

    
    SELECT SUM(total_quantity) INTO final_sum FROM temp_sales_data;
    SET final_sum = IFNULL(final_sum, 1);
    
    -- FECHAS VS

    INSERT INTO new_temp_sales_data
    SELECT 
        CASE 
            WHEN temporality = 'daily' THEN DATE(date)
            WHEN temporality = 'weekly' THEN DATE_SUB(DATE(date), INTERVAL WEEKDAY(date) DAY)
            WHEN temporality = 'monthly' THEN DATE_FORMAT(date, '%Y-%m-01')
            WHEN temporality = 'annually' THEN DATE_FORMAT(date, '%Y-01-01')
        END AS interval_time,
        SUM(quantity) as total_quantity
    FROM 
        APIRest_sale
    WHERE 
        DATE(date) BETWEEN new_start_date AND new_end_date
    GROUP BY 
        interval_time;
    

    
    
    SELECT SUM(total_quantity) INTO initial_sum FROM new_temp_sales_data;

    SET initial_sum = IFNULL(initial_sum, 1);


    SET growth = IFNULL( ((final_sum - initial_sum) / initial_sum * 100 ), 0);
    INSERT INTO dates_comparison(timeone, timetwo, growth_rate) VALUES (new_start_date, start_date_param, growth);

    
    SELECT * FROM dates_comparison;
    
    DROP TEMPORARY TABLE IF EXISTS temp_sales_data;
    DROP TEMPORARY TABLE IF EXISTS new_temp_sales_data;

    DROP TEMPORARY TABLE IF EXISTS dates_comparison;
END //

DELIMITER ;