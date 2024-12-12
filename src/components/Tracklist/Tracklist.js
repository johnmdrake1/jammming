import React from 'react';
import Track from '../Track/Track';
import { Row, Col } from 'react-bootstrap';

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