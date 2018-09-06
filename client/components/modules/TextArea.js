import React from 'react';
import styled from 'react-emotion';

export const TextArea = styled('textarea')`
    width: -webkit-fill-available;
    overflow-y: auto;
    border-radius: 6px;
    font: inherit;
    padding: 10px;
    resize: none;
    -webkit-appearance: none;
    border: none;
    font-size: 16px;
    line-height: 20px;
`;

export const FlatTextArea = styled(TextArea)`
    background: rgba(0,0,0,.05);
    color: #424242;
`;