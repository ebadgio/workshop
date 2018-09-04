import React from 'react';

const Icon = ({name, id, style, className, onClick}) => {
	return (<i data-feather={name} onClick={onClick} className={className} id={id} style={style} />);
};

export default Icon;