import { Dropdown, Container, Card, Col, Row } from 'react-bootstrap';
import classes from "./StatisticsSalesGraph.module.css";
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { Stack, Box, Button } from '@mui/material';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useState, useEffect } from 'react';

const SalesGraph = ({ salesData, itemsData }) => {
    const [isSales, setIsSales] = useState(true);
    const [currentData, setCurrentData] = useState({ dates: [], amounts: [] });

    useEffect(() => {
        updateData();
    }, [isSales, salesData, itemsData]);

    const updateData = () => {
        const dataArray = isSales ? salesData?.qty : itemsData?.qty;

        if (!dataArray) {
            setCurrentData({ dates: [], amounts: [] });
            return;
        }

        const dates = dataArray.map(item => new Date(item.interval_time));
        const amounts = dataArray.map(item => isSales ? item.total_amount : item.total_quantity);
        dates.sort((a, b) => a - b);
        setCurrentData({ dates, amounts });
    };

    const handleToggle = () => {
        setIsSales(!isSales);
    };

    const valueFormatter = (value) => isSales ? `$${value.toFixed(2)}` : `${value} objetos`;

    const data = currentData.dates.map((time, index) => ({
        interval_time: time.toISOString().slice(0, 10),
        total_amount: currentData.amounts[index],
    }));

    const chartSetting = {
        yAxis: [
            {
                label: isSales ? 'Ventas ($)' : 'Objetos vendidos',
            },
        ],
        series: [{ dataKey: 'total_amount', label: isSales ? 'Ventas del Bazar' : 'Objetos del Bazar', valueFormatter: valueFormatter }],
        height: 300,
        sx: {
            [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                transform: 'translateX(-10px)',
            },
        },
    };

    return (
        <>
            <Row className={classes.row}>
                <Col md="10" className={classes.col}>
                    <Card className={classes.card}>
                        <h4 className={classes.text}> Estadísticas - Ganancias a través del tiempo </h4>
                        <Stack direction="row" sx={{ width: '90%' }} className={classes.stack}>
                            <BarChart
                                dataset={data}
                                xAxis={[{ scaleType: 'band', dataKey: 'interval_time' }]}
                                grid={{ horizontal: true }}
                                {...chartSetting}
                                height={400}
                            />
                        </Stack>
                        <Box className="d-flex justify-content-end">
                            <Button variant="contained" color="primary" style={{ textTransform: 'none' }} onClick={handleToggle}>
                                {isSales ? 'Ventas' : 'Objetos'}
                            </Button>
                        </Box>
                    </Card>
                </Col>
            </Row>

            <Row className={classes.row}>
                <Col md="10" className={classes.col}>
                    <Card className={classes.card}>
                        <h4 className={classes.text}> Estadísticas - Ganancias a través del tiempo </h4>
                        <Stack direction="row" sx={{ width: '80%' }} className={classes.stack}>
                            <SparkLineChart
                                data={currentData.amounts}
                                xAxis={{
                                    scaleType: 'time',
                                    data: currentData.dates,
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
        </>
    );
};

export default SalesGraph;