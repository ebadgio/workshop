import React from 'react';
import styled from 'react-emotion';

import {Frame, ColumnCenter, Text} from "../elements";

const TabWrapper = styled(Frame)`
    padding: 10px;
    height: 40px;
    box-sizing: border-box;
    align-items: flex-start;
`;

const TabText = styled('span')`
    font-size: 16px;
    color: ${props => props.active ? '#424242' : '#bdbdbd'};
    cursor: pointer;
    margin-bottom: 10px;
    &:hover {
        color: #424242;
    }
`;


const Line = styled('div')`
    height: 1px;
    width: 100%;
    background: #8c9eff;
`;

const Tab = ({children, active, onClick}) => {
    if (active) {
        return (
            <TabWrapper onClick={onClick}>
                <ColumnCenter>
                    <TabText active className="color-hover">
                        {children}
                    </TabText>
                    <Line />
                </ColumnCenter>
            </TabWrapper>
        )
    }
    return (
        <TabWrapper onClick={onClick}>
            <TabText className="color-hover">
                {children}
            </TabText>
        </TabWrapper>
    )
};

export default Tab;