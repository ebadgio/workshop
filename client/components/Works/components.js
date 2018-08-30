import React from 'react'
import styled from 'react-emotion';

import {Column} from "../elements";

const DraftCardFrame = styled(Column)`
    height: 120px;
    width: 100%;
    background: #fff;
    margin: 10px;
    cursor: pointer;
`;



export const DraftCard = (props) => {
    return (
        <DraftCardFrame onClick={props.onClick}>
                <h3 className="mb-20">{props.title}</h3>
                <span className="faint-text">
                    Lasted edited {props.updatedAt} days ago
                </span>
                <span className="faint-text mt-10">
                    Created {props.createdAt}
                </span>
        </DraftCardFrame>
    )
};