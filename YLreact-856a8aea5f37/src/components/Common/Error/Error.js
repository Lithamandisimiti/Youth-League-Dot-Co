import React from 'react';

const Error = (props) => (
	<div style={{ height: '70vh', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', width: '100%' }}>
		<div>
			<p style={{textAlign: "center"}}><i class="icon ion-ios-alert" style={{ fontSize: 150, color: 'grey'}}></i></p>
			<h3 className="px-0 py-0" style={{ color: 'grey', margin: 'auto', textAlign: "center" }} >
				{props.message}
			</h3>
		</div>

	</div>

);

export default Error;