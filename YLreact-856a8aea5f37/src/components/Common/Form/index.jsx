import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from '../../../helpers/constants';

/**
 * Shared component that renders a form
 *
 * @class FormComponent
 * @extends {React.Component}
 */
class FormComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { heading, subHeading, children, onSubmit, classes } = this.props;
    return (
      <form
        className={
          classes
            ? classes
            : 'col-12 col-sm-8 col-md-6 col-sm-offset-4 col-lg-4 col-lg-offset-6 mb-3 d-flex flex-column'
        }
        style={{
          margin: '0 auto',
          float: 'none',
        }}
        onSubmit={onSubmit}
      >
        {heading && (
          <h1 style={{ fontWeight: 300, fontSize: '2em', paddingBottom: 30 }}>
            {heading}
          </h1>
        )}
        {subHeading && (
          <h3
            style={{
              fontWeight: 300,
              fontSize: '1em',
              paddingBottom: 10,
              color: Colors.boulder,
            }}
          >
            {subHeading}
          </h3>
        )}
        <div className="form-row">{children}</div>
      </form>
    );
  }
}

FormComponent.propTypes = {
  /** Contains the heading for the form */
  heading: PropTypes.string,
  /** Contains the sub heading for the form */
  subHeading: PropTypes.string,
  /** Contains react components to render in form */
  children: PropTypes.elementType,
  /** Contains the onSubmit action to emit in form */
  onSubmit: PropTypes.func,
  /** Bootstrap classes for form */
  classes: PropTypes.string,
};

export default FormComponent;
