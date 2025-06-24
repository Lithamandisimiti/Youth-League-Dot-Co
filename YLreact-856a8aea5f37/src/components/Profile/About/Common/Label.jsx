import React, { Component } from 'react';

const Label = (props) => (
	<div className="col-sm-6">
		<label style={{color: 'rgba(0,0,0,.5)'}}><b>{props.label}</b></label>
		{ !props.editMode && <p>{props.data || `<${props.name}>`}</p>}
		{props.editMode && <div className="bottom-space">
			<input
				type="text"
				name={props.name}
				className="form-control"
				autoComplete="off"
				placeholder={props.name}
				style={{fontSize: 'inherit'}}
				value={props.data}
				onChange={props.onChange}
			/>
		</div>}
	</div>
);

export default Label;
