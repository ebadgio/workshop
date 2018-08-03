import React from 'react';

const Icon = ({name, id, style}) => {
	return (<i data-feather={name} id={id} style={style} />);
};

export default Icon;