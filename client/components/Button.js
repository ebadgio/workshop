import React from 'react';

const Button = ({type, style, contents, action}) => {

	switch (type) {
		case "primary":
			return (<div className="btn btn-primary frame"
			 			 onClick={() => action()}
			 			 style={style}>{contents}</div>)
		case "outline-primary":
			return (<div className="btn btn-outline-primary frame background-hover color-hover"
			 			 onClick={() => action()}
			 			 style={style}>{contents}</div>)
		case "outline-grey":
			return (<div className="btn btn-outline-grey frame background-hover color-hover"
			 			 onClick={() => action()}
			 			 style={style}>{contents}</div>)
		default:
			return (<div className="btn btn-primary frame"
						 onClick={() => action()}
						 style={style}>{contents}</div>)
	}

};

export default Button;
