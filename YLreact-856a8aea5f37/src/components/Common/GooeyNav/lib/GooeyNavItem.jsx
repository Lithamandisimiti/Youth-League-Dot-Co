import PropTypes from 'prop-types';
import React from 'react';
import assign from 'object-assign';
import css from './style/index';

export default class GooeyNavItem extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      isHover: false,
    };
  }
  static propTypes = {
    position: PropTypes.number.isRequired,
  };
  static defaultProps = {
    orientation: 'bottom',
  };
  styleProps() {
    return {
      index: this.props.position,
      orientation: this.props.orientation,
    };
  }
  style() {
    let style = assign({}, css.menuItem.std);

    if (this.state.isHover) style = assign(style, css.menuItem.hover);
    if (this.props.revealed)
      style = assign(style, css.menuItem.revealed(this.styleProps()));

    return style;
  }
  onHoverIn() {
    this.setState({ isHover: true });
  }
  onHoverOut() {
    this.setState({ isHover: false });
  }
  render() {
    return (
      <a
        title={this.props.title}
        onClick={() => this.props.onClick()}
        onMouseEnter={this.onHoverIn.bind(this)}
        onMouseLeave={this.onHoverOut.bind(this)}
        style={this.style()}
      >
        <i className={this.props.className} />
      </a>
    );
  }
}
