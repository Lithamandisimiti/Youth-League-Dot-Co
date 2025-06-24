import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Button.css'

const TextButton = (props) => (
	<button
		type={props.type}
		className="btn btn-text"
		style={props.styles}
		disabled={props.disapbled}
		onClick={props.onClick}
	>
		<span className="btn-icon">
			<span className="loader-parent">
				<span className="loader3">{props.text}</span>
			</span>
		</span>
	</button>
);

TextButton.propTypes = {
	type: PropTypes.string,
	name: PropTypes.string,
	styles: PropTypes.object
}

TextButton.defaultProps = {
	styles : {
		minWidth: 70
	}
}

export default TextButton;
