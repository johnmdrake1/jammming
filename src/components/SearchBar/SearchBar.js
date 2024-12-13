import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';


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
            <Row className='mb-4'>
                <Col md={8}>
                    <input 
                        type="text"
                        className="form-control form-control-lg" //Large input for better visual alignment
                        placeholder="Search for a Song" 
                        value={term} 
                        onChange={handleTermChange}
                    />
                </Col>
                <Col md={4}>
                    <Button variant="outline-light" size="lg" onClick={handleSearch}>Search Spotify</Button>
                </Col>
            </Row>
        </div>
    );
}

export default SearchBar;