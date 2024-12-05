import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';


function SearchBar( props ){

    //state to track user input in the search bar
    const [term, setTerm] = useState('');
    //search input field event handler, doing this instead of doing a callback within the onchange field for readability
    function handleTermChange(event){
        //term setter with current value of field
        setTerm(event.target.value);
    }
    //Handler for when user clicks the search button
    function handleSearch(){
        //call the doSearch prop with the search term
        props.doSearch(term);
    }
    return (
        <div>
            <Row>
                <Col md={8}>
                    <input type="text" placeholder="Search for a Song" value={term} onChange={handleTermChange} />
                </Col>
                <Col md={4}>
                    <Button variant="outline-dark" size="lg" onClick={handleSearch}>Search songs</Button>
                </Col>
            </Row>
        </div>
    );
}

export default SearchBar;