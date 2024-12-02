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
                {/* Button that saves the playlist with the current name and tracks to spotify */}
                <Col>
                    <Button variant="danger" onClick={props.savePlaylist}>Save to Spotify</Button>
                </Col>
            </Row>
            <Row>
                {/* Render a tracklist with the current tracks from the playlist */}
                <Col>
                    <Tracklist tracks={props.tracks} action={props.action} actionLabel={props.actionLabel} />
                </Col>
            </Row>
        </div>
    );
}

export default Playlist;