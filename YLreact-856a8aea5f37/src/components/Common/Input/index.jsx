import React from 'react';
import PropTypes from 'prop-types';
import DisplayError from '..//Error/DisplayError';

/**
 * Shared component that renders either an input or textarea
 *
 * @class Input
 * @extends {React.Component}
 */
class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      type,
      handleInputChange,
      error,
      handleOnFocus,
      inputElement,
      containerStyle,
    } = this.props;

    const elementType = inputElement ? inputElement : 'input';
    const inputType = type ? type : 'text';

    const element = React.createElement(elementType, {
      className: 'form-control',
      type: inputType,
      autoComplete: 'off',
      onChange: handleInputChange,
      onFocus: handleOnFocus,
      fontSize: 'inherit',
      ...this.props,
    });
    return (
      <div
        className="col-sm-12"
        style={containerStyle ? containerStyle : undefined}
      >
        <div className="form-group mb-sm-2 mb-2">
          {element}
          {error && <DisplayError message={error.msg} />}
        </div>
      </div>
    );
  }
}

Input.propTypes = {
  /** Contains the type of input */
  type: PropTypes.string,
  /** Contains the onChange action for the input  */
  handleInputChange: PropTypes.func,
  /** Contains error messages for the input */
  error: {
    msg: PropTypes.string,
  },
  /** Contains the onFocus action for the input */
  handleOnFocus: PropTypes.func,
  /** Contains the type of element to render. Input or Textarea */
  inputElement: PropTypes.string,
  containerStyle: PropTypes.object,
};

export const InputComponent = Input;
