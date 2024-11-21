import React from 'react';
import Track from '../Track/Track';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Tracklist( props ){
    return (
        <div>
            <Row>
                <Col>
                    {props.tracks.map((track) => {
                        return <Track key={track.id} name={track.name} artist={track.artist} album={track.album} />
                    })}
                </Col>
            </Row>
        </div>
    );
}

export default Tracklist;