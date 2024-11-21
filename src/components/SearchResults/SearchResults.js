import React from 'react';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults( props ){
    return (
        <div>
            <Row>
                <Col>
                    <h2>Search Results</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tracklist tracks={props.tracks} />
                </Col>
            </Row>
        </div>
    );
}

export default SearchResults;