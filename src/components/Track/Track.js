import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

function Track( props ){
    return (
        <div className="border p-3 mb-2 bg-white rounded">
            {/* Song Name on its own line */}
            <Row>
                <Col>
                    <h5>{props.track.name}</h5>
                </Col>
                <Col>
                    {/* Add/remove button */}
                    <Button variant={props.actionLabel==="Add" ? "success": "danger"} onClick={() => props.action(props.track)}>{props.actionLabel}</Button>
                </Col>
            </Row>
            {/* Artist, album, song name, and genre */}
            <Row>
                <Col>
                    <p>{props.track.artist}</p>
                </Col>
                <Col>
                    <p>{props.track.album}</p>
                </Col>
                {/* Album art */}
                <Col>
                    <img src={props.track.art} alt='Album art for this track' />
                </Col>
                {/* End Album art section */}
            </Row>
        </div>
    );
}

export default Track;

// function Track( props ){
//     return (
//         <div>
//             {/* Song Name on its own line */}
//             <Row>
//                 <Col>
//                     <h2>{props.track.name}</h2>
//                 </Col>
//                 <Col>
//                     {/* Add/remove button */}
//                     <Button onClick={() => props.action(props.track)}>{props.actionLabel}</Button>
//                 </Col>
//             </Row>
//             {/* Artist, album, song name, and genre */}
//             <Row>
//                 <Col>
//                     <h4>{props.track.artist}</h4>
//                 </Col>
//                 <Col>
//                     <h4>{props.track.album}</h4>
//                 </Col>
//                 <Col>
//                     <h4>No genre</h4>
//                 </Col>
//             </Row>
//         </div>
//     );
// }