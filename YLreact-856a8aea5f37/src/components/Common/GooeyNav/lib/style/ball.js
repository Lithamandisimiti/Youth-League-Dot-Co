'use strict';
let size=3;

module.exports = {
  background: '#ffc107',//this.props.foregroundColor,
  borderRadius: '100%',
  width: size+"rem",
  height: size+"rem",
  //marginLeft: '-40px',
  position: 'absolute',
  // top: (size/4)+'rem',
  color: 'white',
  textAlign: 'center',
  // lineHeight: '80px',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transform: 'translate3d(0,0,0)',
  transition: 'transform ease-out',
  transitionDuration: '200ms',
  cursor:"pointer"
};
