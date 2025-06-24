import React from 'react';

const DisplayError = (props) => (
	<small  className="px-0 py-0" style={{color: '#ed1c24', margin: 'auto', textAlign: "center"}} >
		{props.message}
	</small>
);

export default DisplayError;
