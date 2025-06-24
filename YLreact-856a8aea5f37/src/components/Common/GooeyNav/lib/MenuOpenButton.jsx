import React from 'react';
import assign from 'object-assign';
import css from './style/index';

export default class MenuOpenButton extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      isOpen: false,
      isHover: false,
    };
    this.generateHamburgerCss = this.generateHamburgerCss.bind(this);
    this.generateStyle = this.generateStyle.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.onHoverIn = this.onHoverIn.bind(this);
    this.onHoverOut = this.onHoverOut.bind(this);
  }
  generateHamburgerCss(i) {
    return css.menuOpenButton.hamburger(this.state.isOpen, i);
  }

  generateStyle() {
    let style = assign({}, css.ball, {
      zIndex: 2,
      transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
      transitionDuration: '400ms',
      transform: 'scale(1.1,1.1) translate3d(0,0,0)',
      cursor: 'pointer',
      backgroundColor: 'rgb(133, 133, 133)',
    });

    if (this.state.isHover) {
      style = assign({}, style, {
        transform: 'scale(1.2,1.2) translate3d(0,0,0)',
      });
    }

    if (this.state.isOpen) {
      style = assign({}, style, {
        transitionTimingFunction: 'linear',
        transitionDuration: '200ms',
        transform: 'scale(0.8,0.8) translate3d(0,0,0)',
      });
    }

    return style;
  }
  componentWillUnmount() {
    this.props.onOpenChanged && this.props.onOpenChanged(false);
  }

  onToggle() {
    const isOpen = !this.state.isOpen;
    this.props.onOpenChanged && this.props.onOpenChanged(isOpen);
    this.setState({ isOpen: isOpen });
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
        onClick={this.onToggle}
        onMouseEnter={this.onHoverIn}
        onMouseLeave={this.onHoverOut}
        style={this.generateStyle()}
      >
        {/* { [0,1,2].map(i => { return (<span key={ i } style={ this.generateHamburgerCss(i) }></span>) }) } */}
        <i className="ion-upload"></i>
      </a>
    );
  }
}
