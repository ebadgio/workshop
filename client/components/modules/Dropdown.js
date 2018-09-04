import React from 'react';
import styled from 'react-emotion';
import {MenuWrapper} from "./Menu";


export const Dropdown = styled(MenuWrapper)`
    min-width: 150px;
    display: none;
    max-height: 200px;
    overflow-y: auto;
    width: fit-content;
`;

export const Option = styled('div')`
    height: 40px;
    box-sizing: border-box;
    padding: 10px 20px;
    cursor: pointer;
    width: 100%;
    color: #757575;
    font-size: 16px;
    display: flex;
    align-items: center;
    &:hover {
        background: rgba(0,0,0,.1)
    }
`;

