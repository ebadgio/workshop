import React from 'react';
import styled from 'react-emotion';

export const Input = styled('input')`
    height: 40px;
    padding-left: 10px;
    color: #424242;
    font: inherit;
    border: none;
    background: none;
    margin: 15px 0;
    box-sizing: border-box;
`;

export const FlatInput = styled(Input)`
    background: rgba(0,0,0,.05);
    width: 100%;
`;

// export const FlatInput = ({style, placeholder, password, id}) => {
// 	return (
// 		<Input type={password ? "password" : "text"}
// 			   id={id}
// 			   placeholder={placeholder}
// 			   style={style}
// 			   className="w-fill"/>
// 	);
// };
