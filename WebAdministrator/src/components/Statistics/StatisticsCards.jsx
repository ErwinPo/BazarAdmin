import {Dropdown, Container, Card, Col} from 'react-bootstrap'
import { Button} from 'react-bootstrap'
import classes from "./StatisticsCards.module.css";

const StatisticsCards = (props) => {

    return(
        <Col md="2" className={classes.col}>
            <Card className={classes.card} style={{ width: '16rem', height: '8rem' }}> 
                <Card.Body>
                    <Card.Title className={classes.title} >{props.title}</Card.Title>
                    <Card.Text className={classes.text}>
                        {props.data}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )

}

export default StatisticsCards