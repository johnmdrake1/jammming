import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import { Row, Col } from 'react-bootstrap';

function SearchResults( props ){
    return (
        <div className='p-3 shadow bg-white rounded'>
            <Row>
                <Col>
                    <h2>Search Results</h2>
                </Col>
            </Row>
            <Row>
                {/* Render a Tracklist component with the search result tracks list */}
                <Col>
                    <Tracklist tracks={props.tracks} action={props.action} actionLabel={props.actionLabel} />
                </Col>
            </Row>
        </div>
    );
}

export default SearchResults;