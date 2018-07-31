import React from 'react';

const Button = ({type, style, contents, action}) => {

	switch (type) {
		case "primary":
			return (<div className="btn btn-primary frame"
			 			 onClick={() => action()}
			 			 style={style}>{contents}</div>)
		default:
			return (<div className="btn btn-primary frame"
						 onClick={() => action()}
						 style={style}>{contents}</div>)
	}

};

export default Button;
