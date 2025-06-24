import React from 'react';
import '../Navigation/navigation.css';

/**
 * Renders the footer
 *
 * @class Footer
 * @extends {React.Component}
 */
class Footer extends React.Component {
  render() {
    return (
      <footer className="text-center mb-4 mt-4">
        <div className="container">
          <hr />
        </div>

        <span
          className="mk-footer-copyright mb-2"
          style={{ fontSize: '0.85rem', color: '#969696' }}
        >
          Youth League &copy; All Rights Reserved 2018.
        </span>
      </footer>
    );
  }
}

export const FooterComponent = Footer;
