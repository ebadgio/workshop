import React from 'react';
import styled from 'react-emotion';

const Button = styled('div')`
    height: 40px;
	width: fit-content;
	border-radius: 6px;
	margin: 10px 0;
	cursor: pointer;
	padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-transition: color .35s ease, background .35s ease;
	transition: color .35s ease, background .35s ease;
	font-size: 16px;
	font-family: sans-serif;
`;

const ButtonOutline = styled(Button)`
    border: 1px solid;
`;

export const ButtonOutlinePrimary = styled(ButtonOutline)`
    color: #8c9eff;
    &:hover {
        color: #5870cb
    }
`;

export const ButtonPrimary = styled(Button)`
    background: #8c9eff;
    color: #fff;
    &:hover {
        background: #5870cb
    }
`;

export const ButtonToolbar = styled(Button)`
    border-radius: 0;
	margin: 0;
	color: ${props => props.active ? "#fff" : "#757575"};
	height: 100%;
    padding: 0 7px;
    display: inline-block;
    &:hover {
        color: #fff;
    }
`;

export const ButtonIcon = styled(Button)`
    border-radius: 50%;
    box-sizing: border-box;
    padding: 10px;
    color: #757575;
    &:hover {
        color: #424242;
        background: rgba(0,0,0,.2);
    }  
`;

// const Button = ({type, style, contents, action, active}) => {
//
// 	switch (type) {
// 		case "primary":
// 			return (<div className="btn btn-primary frame"
// 			 			 onPointerDown={action}
// 			 			 style={style}>{contents}</div>)
// 		case "outline-primary":
// 			return (<div className="btn btn-outline-primary frame background-hover color-hover"
// 			 			 onPointerDown={action}
// 			 			 style={style}>{contents}</div>)
// 		case "outline-grey":
// 			return (<div className="btn btn-outline-grey frame background-hover color-hover"
// 			 			 onPointerDown={action}
// 			 			 style={style}>{contents}</div>)
// 		case "toolbar":
// 			return (<div className="btn btn-toolbar frame color-hover"
// 						 onPointerDown={action}
// 						 style={active ? {color: '#fff'} : {}}>{contents}</div>);
// 		default:
// 			return (<div className="btn btn-primary frame"
// 						 onPointerDown={action}
// 						 style={style}>{contents}</div>)
// 	}
//
// };

//export default Button;
