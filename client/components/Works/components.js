import React from 'react'
import styled from 'react-emotion';

import {Column} from "../elements";

const DraftCardFrame = styled(Column)`
    height: 120px;
    width: 300px;
    box-sizing: border-box;
    background: #fff;
    margin: 10px;
    cursor: pointer;
    border-left: 1px solid;
    color: #e9e9e9;
    padding-left: 20px;
    &:hover {
        color: #8c9eff;
    }
`;



export const DraftCard = (props) => {
    return (
        <DraftCardFrame onClick={props.onClick} className="color-hover">
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