import { Dropdown, Container, Card, Col, Row } from 'react-bootstrap';
import classes from "./StatisticsSalesGraph.module.css";
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { Stack, Box } from '@mui/material';

const SalesGraph = () => {
    return (
        <Row className={classes.row}>
            <Col md="10" className={classes.col}>
                <Card className={classes.card}>
                    <h4 className={classes.text}> Estadísticas - Ganancias a través del tiempo </h4>

                    <Stack direction="row" sx={{ width: '85%' }} className={classes.stack}>
                        
                        
                        <SparkLineChart
                            data={[1000, 1500, 2000, 2500, 1760, 1800, 2100, 3000]}
                            xAxis={{
                                scaleType: 'time',
                                data: [
                                    new Date(2022, 5, 1),
                                    new Date(2022, 5, 2),
                                    new Date(2022, 5, 5),
                                    new Date(2022, 5, 6),
                                    new Date(2022, 5, 7),
                                    new Date(2022, 5, 8),
                                    new Date(2022, 5, 11),
                                    new Date(2022, 5, 12),
                                    new Date(2022, 5, 13),
                                ],
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
