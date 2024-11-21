import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Track( props ){
    return (
        <div>
            {/* Song Name on its own line */}
            <Row>
                <Col>
                    <h2>{props.track.name}</h2>
                </Col>
                <Col>
                    {/* Add/remove button */}
                    <Button onClick={() => props.action(props.track)}>{props.actionLabel}</Button>
                </Col>
            </Row>
            {/* Artist, album, song name, and genre */}
            <Row>
                <Col>
                    <h4>{props.track.artist}</h4>
                </Col>
                <Col>
                    <h4>{props.track.album}</h4>
                </Col>
                <Col>
                    <h4>Genre</h4>
                </Col>
            </Row>
        </div>
    );
}

export default Track;