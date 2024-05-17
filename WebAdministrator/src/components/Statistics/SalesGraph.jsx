import { Dropdown, Container, Card, Col, Row } from 'react-bootstrap';
import classes from "./StatisticsSalesGraph.module.css";
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { Stack, Box } from '@mui/material';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const SalesGraph = ({salesData}) => {
    if (!salesData || salesData.length === 0) {
        return (
            <Row className={classes.row}>
                <Col md="10" className={classes.col}>
                    <Card className={classes.card}>
                        <h4 className={classes.text}> Estadísticas - Ganancias a través del tiempo </h4>
                        <div>
                            <h4>Seleccione alguno de los filtros para empezar a visualizar datos.</h4>
                        </div>
                    </Card>
                </Col>
            </Row>
        );
    }

    // console.log("Sales Data from Sales Graph: ",salesData)


    const salesDataQtyArray = salesData.qty

    
    

    const intervalTimes = salesDataQtyArray.map(item => new Date(item.interval_time)); // Assuming interval_time is in ISO format
    const totalAmounts = salesDataQtyArray.map(item => item.total_amount);

    intervalTimes.sort((a, b) => a - b);

    const dataset = [
        {
          london: 59,
          paris: 57,
          newYork: 86,
          seoul: 21,
          month: 'Jan',
        },
        {
          london: 50,
          paris: 52,
          newYork: 78,
          seoul: 28,
          month: 'Fev',
        },
        {
          london: 47,
          paris: 53,
          newYork: 106,
          seoul: 41,
          month: 'Mar',
        },
        {
          london: 54,
          paris: 56,
          newYork: 92,
          seoul: 73,
          month: 'Apr',
        },
        {
          london: 57,
          paris: 69,
          newYork: 92,
          seoul: 99,
          month: 'May',
        },
        {
          london: 60,
          paris: 63,
          newYork: 103,
          seoul: 144,
          month: 'June',
        },
        {
          london: 59,
          paris: 60,
          newYork: 105,
          seoul: 319,
          month: 'July',
        },
        {
          london: 65,
          paris: 60,
          newYork: 106,
          seoul: 249,
          month: 'Aug',
        },
        {
          london: 51,
          paris: 51,
          newYork: 95,
          seoul: 131,
          month: 'Sept',
        },
        {
          london: 60,
          paris: 65,
          newYork: 97,
          seoul: 55,
          month: 'Oct',
        },
        {
          london: 67,
          paris: 64,
          newYork: 76,
          seoul: 48,
          month: 'Nov',
        },
        {
          london: 61,
          paris: 70,
          newYork: 103,
          seoul: 25,
          month: 'Dec',
        },
      ];

      /* 
        {
            comp: [
                growth_rate: 500,
                timeone: 2024-05-17
                timetwo: 2024-05-18
            ],
            qty: [
                interval_time: "2024-05-11"
                total_amount: 500
            ],
            [
                interval_time: "2025-07-11",
                total_amount: 800
            ]
        }
      */

      const valueFormatter = (value) => `${value.toFixed(2)}`;

      const data = intervalTimes.map((time, index) => ({
        interval_time: time.toISOString().slice(0, 10), // Convert date to string with only the first 10 characters
        total_amount: totalAmounts[index]
    }));
    
    



      const chartSetting = {
        yAxis: [
          {
            label: 'ventas ($)',
          },
        ],
        series: [{ dataKey: 'total_amount', label: 'Ventas del Bazar', valueFormatter }],
        height: 300,
        sx: {
          [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: 'translateX(-10px)',
          },
        },
      };

    console.log(salesData)
    console.log(totalAmounts)
    console.log(intervalTimes)
    // console.log(...intervalTimes)

    return (
        <>
            <Row className={classes.row}>
                <Col md="10" className={classes.col}>
                    <Card className={classes.card}>
                        <h4 className={classes.text}> Estadísticas - Ganancias a través del tiempo </h4>
                        <Stack direction="row" sx={{ width: '80%' }} className={classes.stack}>
                            <SparkLineChart
                                // plotType="bar"
                                data={totalAmounts}
                                xAxis={{
                                    scaleType: 'time',
                                    data: intervalTimes,
                                    valueFormatter: (value) => value.toISOString().slice(0, 10),
                                }}
                            
                                colors={['#222222']}
                                height={150}
                                showTooltip
                                showHighlight
                            />
                        </Stack>

                    </Card>
                </Col>
            </Row>

            <Row className={classes.row}>
                <Col md="10" className={classes.col}>
                    <Card className={classes.card}>
                        <Stack  direction="row" sx={{ width: '80%' }} className={classes.stack}>

                            <BarChart
                                dataset={data}
                                xAxis={[
                                { scaleType: 'band', dataKey: 'interval_time' },
                                ]}
                                {...chartSetting}
                            />

                        </Stack>   
                    </Card>
                </Col>
            </Row>
        </>
        
    );
};

export default SalesGraph;
