import React from 'react';

import Button from '../Common/Button/Button';
import Form from '../Common/Form/index.jsx';

/**
 * Abstract class used for the layout of authentication
 *
 * @class AuthenticationComponent
 * @extends {React.Component}
 */
class AuthenticationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      heading: '',
      buttonText: '',
      subHeading: '',
      disabled: false,
      isLoading: false,
    };
  }

  render() {
    return (
      <div
        className="login d-flex align-items-center"
        style={{ height: '78vh' }}
      >
        {this.renderForm()}
      </div>
    );
  }

  /**
   * Renders the input fields for form
   *
   * @memberof AuthenticationComponent
   */
  renderInputFields = () => null;

  /**
   * Renders a text link
   * @memberof AuthenticationComponent
   */
  renderTextButton = () => null;

  /**
   * Validates input fields before submission
   * @memberof AuthenticationComponent
   */
  validate = () => null;

  /**
   * Displays any errors that occurred during authentication
   * @memberof AuthenticationComponent
   */
  renderDisplayError = () => null;

  /**
   * Handles the change in value of inputs
   *
   * @memberof AuthenticationComponent
   */
  handleInputChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value.trim(),
    });
  };

  /**
   * Renders a form for authentication
   *
   * @memberof AuthenticationComponent
   */
  renderForm = () => {
    const { heading, subHeading } = this.state;
    return (
      <Form
        heading={heading}
        subHeading={subHeading}
        onSubmit={this.submitForm}
      >
        {this.renderInputFields()}
        {this.renderDisplayError()}
        {this.renderTextButton()}
        {this.renderSubmitButton()}
      </Form>
    );
  };

  /**
   * Renders the submit button for  form
   *
   * @memberof AuthenticationComponent
   */
  renderSubmitButton = () => {
    const { buttonText, disabled, isLoading } = this.state;

    return (
      <div className="col-sm-12 controls pt-3 d-flex justify-content-center">
        <Button
          type="submit"
          text={buttonText}
          styles={{ width: '50%' }}
          disabled={disabled}
          loading={isLoading}
        />
      </div>
    );
  };

  /**
   * Handles the submission of form
   *
   * @memberof AuthenticationComponent
   */
  submitForm = e => {
    e.preventDefault();
    this.validate();
  };
}

export default AuthenticationComponent;
