import React from 'react';

const TextInput = ({style, placeholder, password, id}) => {
	return (
		<input type={password ? "password" : "text"}
			   id={id} 
			   placeholder={placeholder} 
			   style={style} 
			   className="w-fill box flat-input"/>
	);
};

export default TextInput;