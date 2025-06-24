import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = props => (
  <button
    type={props.type}
    className="btn btn-black btn-animated ripple"
    style={props.styles}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    <span className="btn-icon">
      <span className="loader-parent">
        <span className="loader3">
          {props.loading ? (
            <i className="fa fa-spinner fa-spin"></i>
          ) : (
            props.text
          )}
        </span>
      </span>
    </span>
  </button>
);

Button.propTypes = {
  /** Type of button to be rendered */
  type: PropTypes.string,
  /** Styles of the button */
  styles: PropTypes.object,
  /** Controls the disabled state of button */
  disabled: PropTypes.bool,
  /** Text to render for button */
  text: PropTypes.string,
  /** Controls the loading state of button*/
  loading: PropTypes.bool,
  /** Action to be called when the button is pressed */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  styles: {
    minWidth: 70,
  },
};

export default Button;
