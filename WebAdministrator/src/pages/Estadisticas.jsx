import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar/Navbar";
import { Button, Col, Image, Row, Container } from 'react-bootstrap';
import DatesDropdown from "../components/Statistics/DatesDropdown";
import UsersDropdown from "../components/Statistics/UsersDropdown";
import classes from "../components/Statistics/StatisticsDropdowns.module.css";
import StatisticsCards from "../components/Statistics/StatisticsCards";
import SalesGraph from "../components/Statistics/SalesGraph";


const Estadisticas = () => {
    const [salesData, setSalesData] = useState([]); // State to hold sales data
    const [rangeOfDates, setRangeOfDates] = useState([]); // State to hold sales data
    const [bestSeller, setBestSeller] = useState()
    const [loading, setLoading] = useState(true);
    const [totalSales, setTotalSales] = useState(0);
    const [itemsData, setItemsData] = useState(0);
    const [salesDataPercentage, setSalesDataPercentage] = useState()
    const [totalItems, setTotalItems] = useState(0)
    const [itemsDataPercentage, setItemsPercentage] = useState()
    const [userData, setUserData] = useState()

    // const access_token = localStorage.getItem('access_token');

    // Function to handle data update from DatesDropdown component
    const handleSalesDataUpdate = (data) => {
        setSalesData(data);
    };

    // Function to handle data update from DatesDropdown component
    const handleRangeOfDates = (data) => {
        setRangeOfDates(data);
    };

    // Function to handle data update from DatesDropdown component
    const handleItemsDataUpdate = (data) => {
        setItemsData(data);
    };



    const handleUserDataUpdate = (data) => {
        setUserData(data);
    };

    useEffect(() => {
        // Calculate total sales amount

        // console.log(salesData)

        const sales = salesData.qty
        const salesPercentage = salesData.comp

        const items = itemsData.qty
        const itemsPercentage = itemsData.comp

        if(items){
            let total = 0
            items.forEach(item => {
                total += item.total_quantity
            })
            // console.log("Total items: ",total)
            setTotalItems(total)
        }
        
        if(sales){
            let total = 0
            sales.forEach(sale => {
                total += sale.total_amount
            });
            // total = total.toFixed(2)
            setTotalSales(total.toFixed(2))
        } 

        if(salesPercentage){
            
            setSalesDataPercentage(Math.round(salesPercentage[0].growth_rate) + '%')
            console.log(Math.round(salesPercentage[0].growth_rate) + '%')
        }

        if(itemsPercentage){
            
            setItemsPercentage(Math.round(itemsPercentage[0].growth_rate) + '%')
            console.log(Math.round(itemsPercentage[0].growth_rate) + '%')
        }
        

        
    }, [salesData, itemsData]);
    


    useEffect(() => {
        fetch('http://3.146.65.111:8000/bazar/ranking/', {
            method: 'GET'
            // headers: {
            //'Authorization': `BEARER ${access_token}`
            // }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos del servidor');
            }
            return response.json();
        })
        .then(data => {
            setBestSeller(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);
        
    // if (bestSeller) {
    //     console.log(true);
    // } 
    

    return (
        <div>
            <Navbar />
            <Container fluid>
                <Row className={classes.row}>
                    <Col md={{ span: 2, offset: 2 }} sm={4} xs={12}>Filtros:</Col>
                    <Col md={2} sm={4} xs={12}>
                        <DatesDropdown 
                            onSalesDataUpdate={handleSalesDataUpdate} 
                            onRangeOfDatesUpdate={handleRangeOfDates} 
                            onItemsDataUpdate={handleItemsDataUpdate}
                            currentUserData={userData}
                            start
                        />
                    </Col>
                    <Col md={2} sm={4} xs={12}>
                        <UsersDropdown onUserDataUpdate={handleUserDataUpdate} />
                    </Col>
                </Row>

                <Row className={`${classes.statisticsCardsRow} justify-content-center`} noGutters>
                    <StatisticsCards title="Ingresos" data={totalSales} increasePercentage={salesDataPercentage} />
                    <StatisticsCards title="Ventas Totales" data={totalItems} increasePercentage={itemsDataPercentage} />
                    <StatisticsCards
                        title="Mejor Vendedor"
                        data={loading ? "NA" : bestSeller ? bestSeller[0].username : "NA"}
                    />
                </Row>
            </Container>
            {/* Pass salesData state to SalesGraph component */}
            <SalesGraph salesData={salesData} itemsData={itemsData} />
        </div>
    );
};

export default Estadisticas;
