import { Dropdown, Container, Card, Col, Row } from 'react-bootstrap';
import classes from "./StatisticsSalesGraph.module.css";
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { Stack, Box } from '@mui/material';

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

    // console.log(totalAmounts)
    // console.log(...intervalTimes)

    return (
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
    );
};

export default SalesGraph;
