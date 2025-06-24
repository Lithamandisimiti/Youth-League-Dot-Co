import React from 'react';

const NoData = (props) => (
	<div style={{height: '70vh', alignItems: 'center', justifyContent: 'center', display:'flex', width:'100%'}}>
		<h2  className="" style={{margin: 'auto', fontWeight: "normal", textAlign: "center", color:'grey'}} >
		{props.message || "No Data to display"}
	</h2>
	</div>
);

export default NoData;
