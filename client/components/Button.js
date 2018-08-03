import React from 'react';

const Button = ({type, style, contents, action, active}) => {

	switch (type) {
		case "primary":
			return (<div className="btn btn-primary frame"
			 			 onPointerDown={action}
			 			 style={style}>{contents}</div>)
		case "outline-primary":
			return (<div className="btn btn-outline-primary frame background-hover color-hover"
			 			 onPointerDown={action}
			 			 style={style}>{contents}</div>)
		case "outline-grey":
			return (<div className="btn btn-outline-grey frame background-hover color-hover"
			 			 onPointerDown={action}
			 			 style={style}>{contents}</div>)
		case "toolbar":
			return (<div className="btn btn-toolbar frame color-hover"
						 onPointerDown={action}
						 style={active ? {color: '#fff'} : {}}>{contents}</div>);
		default:
			return (<div className="btn btn-primary frame"
						 onPointerDown={action}
						 style={style}>{contents}</div>)
	}

};

export default Button;
