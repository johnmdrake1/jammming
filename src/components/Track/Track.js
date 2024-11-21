import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Track( props ){
    return (
        <div>
            <Row>
                <Col>
                    <h2>{props.name}</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>{props.artist}</h4>
                </Col>
                <Col>
                    <h4>{props.album}</h4>
                </Col>
                <Col>
                    <h4>Genre</h4>
                </Col>
            </Row>
        </div>
    );
}

export default Track;