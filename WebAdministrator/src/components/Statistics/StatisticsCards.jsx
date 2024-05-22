import { Card, Col } from 'react-bootstrap';
import classes from "./StatisticsCards.module.css";
import increaseArrow from '../../assets/images/icon_arrow.png';
import decreaseArrow from '../../assets/images/down_arrow.png';

const StatisticsCards = (props) => {
    return (
        <Col md={4} className={classes.col}>
            <Card className={classes.card}>
                <Card.Body>
                    <Card.Title className={classes.title}>{props.title}</Card.Title>
                    <Card.Text className={classes.text}>
                        {props.data}
                        {props.increasePercentage && (
                            <div className={classes.img}>
                                <img className={classes.arrowImg} src={props.increasePercentage >= 0 ? increaseArrow : decreaseArrow} alt="arrow" />
                                {props.increasePercentage}
                            </div>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default StatisticsCards;
