import React from 'react'
import styled from 'react-emotion';

import {Column} from "../elements";

export const DraftCard = (props) => {
    return (
        <Column>
            <h3>{props.title}</h3>
        </Column>
    )
};