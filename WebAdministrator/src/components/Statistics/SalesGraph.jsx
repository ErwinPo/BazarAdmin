import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Stack, Box, Button } from '@mui/material';
import { Row, Col, Card } from 'react-bootstrap';
import classes from "./StatisticsSalesGraph.module.css";

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
      [`& .MuiChartsAxis-axisY .MuiChartsAxis-label`]: {
        transform: 'translateX(-10px)',
      },
    },
  };

  return (
    <>
      <Row className={`${classes.row} justify-content-center`}>
        <Col lg={10} md={12} sm={12} className={classes.col}>
          <Card className={classes.card}>
            <h4 className={classes.text}> Estadísticas - Ganancias a través del tiempo </h4>
            <Stack direction="row" sx={{ width: '100%' }} className={classes.stack}>
              <BarChart
                slotProps={{
                  noDataOverlay: { message: 'Seleccione algún filtro para ver los datos.' },
                }}
                dataset={data.length > 0 ? data : []}
                xAxis={[{ scaleType: 'band', dataKey: 'interval_time' }]}
                grid={{ horizontal: true }}
                {...chartSetting}
                height={400}
              />
            </Stack>
            <Box className="d-flex justify-content-end mt-3">
              <Button variant="contained" color="primary" style={{ textTransform: 'none' }} onClick={handleToggle}>
                {isSales ? 'Objetos' : 'Ventas'}
              </Button>
            </Box>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SalesGraph;
