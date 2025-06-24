'use strict';

var assign = require('object-assign');

var ball = require('./ball');

var stdColor="rgb(242, 242, 242)"
var altColor="#0c0c17"

module.exports = {
  std: assign({}, ball, {
    color: altColor,
    background: stdColor,
    transform: 'translate3d(0,0,0) rotate(-180deg)',
    visibility: 'hidden',
    zIndex: "1040"
  }),
  hover: {
    color: stdColor,
    background: altColor
  },
  revealed(opts) {
    var index = opts.index || 1;
    var orientation = opts.orientation || "right";
    
    var xOrient = 0;
    var yOrient = 0;
    var orientFactor=50

    if (orientation === "right" || orientation === "left") {
      xOrient = orientFactor * index;
      if (orientation === "left") xOrient = xOrient * (-1);
    } else {
      yOrient = orientFactor * index;
      if (orientation === "top") yOrient = yOrient * (-1);
    }

    return {
      visibility: 'visible',
      transitionTimingFunction: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
      transitionDuration: `${ 90 + (80 * index) }ms`,
      transform: `translate3d(${ xOrient }px, ${ yOrient }px, 0) rotate(0)`
    };
  }
};
