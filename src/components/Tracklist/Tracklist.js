import React from 'react';
import Track from '../Track/Track';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Tracklist( props ){
    return (
        <div>
            <Row>
                <Col>
                    {/* Map over passed in list of search result/playlist and create a track element for each */}
                    {props.tracks.map((track) => {
                        return <Track key={track.id} track={track} action={props.action} actionLabel={props.actionLabel} />
                    })}
                </Col>
            </Row>
        </div>
    );
}

export default Tracklist;