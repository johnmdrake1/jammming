import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Playlist( props ) {
    return (
        <div>
            <Row>
                <Col>
                    <h2>My Playlist</h2>
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

export default Playlist;