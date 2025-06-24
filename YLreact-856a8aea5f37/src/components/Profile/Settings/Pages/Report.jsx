import React from 'react';
import PropTypes from 'prop-types';
import { InputComponent } from '../../../Common/Input/index.jsx';
import Form from '../../../Common/Form/index.jsx';
import { generalValidator } from '../../../Common/Validate/validate.jsx';
import Button from '../../../Common/Button/Button.jsx';
import {
  reportAction,
  clearStateReport,
} from '../../../../redux/actions/actions';
import { connect } from 'react-redux';

/**
 * Renders the report page
 *
 * @class Report
 * @extends {React.Component}
 */
class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      message: '',
    };
  }
  render() {
    const { subject, subjectError, message, messageError } = this.state;
    const {
      report: { isSuccess },
    } = this.props;

    if (isSuccess) {
      this.handleClearState();
    }

    return (
      <div className="row">
        <div
          className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6 pb-0 pt-0"
          style={{ margin: '0 auto', float: 'none' }}
        >
          <div className=" m-0 p-0" style={{ width: '100%', maxWidth: '100%' }}>
            <div className="row home-trades">
              <div
                className="col-12 px-0 py-0 p-sm-1 p-md-2 gallery-tile-p"
                style={{ padding: '0.05rem' }}
              >
                <div className="p-2 pt-0">
                  <span>
                    <b>Report a Problem</b>
                  </span>
                  <Form
                    onSubmit={this.validate}
                    classes="col-sm-offset-4 col-lg-11 col-lg-offset-6 mb-3 mt-4 d-flex flex-column"
                  >
                    <InputComponent
                      placeholder="Subject"
                      name="subject"
                      value={subject}
                      handleInputChange={this.handleInputChange}
                      error={subjectError}
                      handleOnFocus={this.handleOnFocus}
                    />
                    <InputComponent
                      placeholder="Message"
                      name="message"
                      value={message}
                      handleInputChange={this.handleInputChange}
                      error={messageError}
                      handleOnFocus={this.handleOnFocus}
                      inputElement="textarea"
                      rows={5}
                    />
                    <div className="col-sm-12 controls pt-3 d-flex justify-content-center">
                      <Button
                        type="submit"
                        text="Send"
                        styles={{ width: '50%' }}
                      />
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Resets the subject and message state and calls the clearStateReport
   *
   * @memberof Report
   */
  handleClearState = () => {
    const { clearStateReport } = this.props;
    this.setState(
      {
        subject: '',
        message: '',
      },
      clearStateReport,
    );
  };

  /**
   * Handles the change in the input values
   *
   * @param {object} e Contains the input element's event
   * @memberof Report
   */
  handleInputChange = e => {
    const name = e.target.name;

    this.setState({
      [name]: e.target.value,
    });
  };

  /**
   * Clears any input errors when input is focused
   *
   * @param {object} e Contains the input element's event
   * @memberof Report
   */
  handleOnFocus = e => {
    const name = `${e.target.name}Error`;
    this.setState({
      [name]: undefined,
    });
  };

  /**
   * Validates the input before submitting. This function is called on submit of form
   *
   * @param {object} e Contains the input element's event
   * @memberof Report
   */
  validate = e => {
    e.preventDefault();
    const { subject, message } = this.state;
    const { reportAction } = this.props;
    const subjectError = generalValidator(subject);
    const messageError = generalValidator(message);

    this.setState(
      {
        subjectError,
        messageError,
      },
      function() {
        if (!subjectError && !messageError) {
          if (reportAction) {
            reportAction(subject, message);
          }
        }
      },
    );
  };
}

const mapStateToProps = state => {
  return {
    report: state.reportReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reportAction: (subject, message) =>
      dispatch(reportAction(subject, message)),
    clearStateReport: () => dispatch(clearStateReport()),
  };
};

Report.propTypes = {
  /** Contains the state for the report action */
  report: {
    isSuccess: PropTypes.bool,
    isPending: PropTypes.bool,
    reportFailure: PropTypes.object,
  },
  /** POST action that sends a subject and a message  */
  reportAction: PropTypes.func,
  /** Action that clears the state of the report action */
  clearStateReport: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Report);
