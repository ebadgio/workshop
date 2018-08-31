import React from 'react';
import styled from 'react-emotion';

export const Row = styled('div')`
    display: flex;
	align-items: center;
	width: 100%;
	max-width: 100%;
`;

export const RowWrap = styled(Row)`
    flex-wrap: wrap;
`;

export const RowApart = styled(Row)`
    justify-content: apart;
`;

export const Column = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const ColumnCenter = styled(Column)`
    align-items: center;
`;

export const PageWrapper = styled('div')`
        width: 100%;
        padding-top: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
`;

