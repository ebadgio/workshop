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


const Dot = styled('div')`
    height: 10px;
    width: 10px;
    background: #8c9eff;
    border-radius: 50%;
`;

const Tab = ({children, active}) => {
    if (active) {
        return (
            <TabWrapper>
                <ColumnCenter>
                    <TabText active className="color-hover">
                        {children}
                    </TabText>
                    <Dot />
                </ColumnCenter>
            </TabWrapper>
        )
    }
    return (
        <TabWrapper>
            <TabText className="color-hover">
                {children}
            </TabText>
        </TabWrapper>
    )
};

export default Tab;