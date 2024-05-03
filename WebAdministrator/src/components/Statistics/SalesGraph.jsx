import { Dropdown, Container, Card, Col, Row } from 'react-bootstrap';
import classes from "./StatisticsSalesGraph.module.css";
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { Stack, Box } from '@mui/material';

const SalesGraph = ({salesData}) => {
    // console.log("Sales Graph Sales: ", ...salesData)

    const intervalTimes = salesData?.map(item => new Date(item.interval_time)); // Assuming interval_time is in ISO format
    const totalAmounts = salesData?.map(item => item.total_amount);

    // console.log("Interval Times: ",intervalTimes)
    // console.log("totalAmounts: ",totalAmounts)

    return (
        <Row className={classes.row}>
            <Col md="10" className={classes.col}>
                <Card className={classes.card}>
                    <h4 className={classes.text}> Estadísticas - Ganancias a través del tiempo </h4>

                    <Stack direction="row" sx={{ width: '75%' }} className={classes.stack}>
                        {
                            salesData ? (
                                <SparkLineChart
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
                            ) : (
                                <div>
                                    <h3>No available data for now</h3>
                                </div>
                            )
                        }
                    </Stack>
                </Card>
            </Col>
        </Row>
    );
};

export default SalesGraph;