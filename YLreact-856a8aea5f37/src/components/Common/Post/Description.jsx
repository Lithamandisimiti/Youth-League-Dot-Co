import React from 'react';
import PropTypes from 'prop-types';
import { decode } from 'he';
import Linkify from 'react-linkify';

export default class Description extends React.Component {
  static defaultProps = {
    description: 'hi',
    className: 'px-2', //"px-2 text-justify"
  };
  static propTypes = {
    description: PropTypes.string,
    className: PropTypes.string,
  };
  constructor(p) {
    super(p);
  }
  render() {
    const { className, description } = this.props;
    return (
      <p className={className}>
        <Linkify>{decode(description)}</Linkify>
      </p>
    );
  }
}
