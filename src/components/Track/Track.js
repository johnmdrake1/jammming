import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
function Track(){
    return (
        <div>
            <Row>
                <Col>
                    <h2>Song Name</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Artist</h4>
                </Col>
                <Col>
                    <h4>Album</h4>
                </Col>
                <Col>
                    <h4>Genre</h4>
                </Col>
            </Row>
        </div>
    );
}

export default Track;