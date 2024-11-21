import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Playlist( props ) {
    const handleNameChange = (event) => {
        props.setPlaylistName(event.target.value);
    }
    return (
        <div>
            <Row>
                {/* Dynamically updated playlist name */}
                <Col>
                    <h2>{props.playlistname}</h2>
                </Col>
                {/* Input field to change playlist name that updates in real time */}
                <Col>
                    <input placeholder="Change playlist name..." type="text" value={props.playlistname} onChange={handleNameChange} />
                </Col>
            </Row>
            <Row>
                {/* Render a tracklist with the current tracks from the playlist */}
                <Col>
                    <Tracklist tracks={props.tracks} />
                </Col>
            </Row>
        </div>
    );
}

export default Playlist;