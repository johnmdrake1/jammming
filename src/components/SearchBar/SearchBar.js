import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';


function SearchBar(){
    return (
        <div>
            <Row className='bg-warning'>
                <Col md={8}>
                    <input placeholder="Search for a Song" />
                </Col>
                <Col md={4}>
                    <Button variant="success">Search songs</Button>
                </Col>
            </Row>
        </div>
    );
}

export default SearchBar;