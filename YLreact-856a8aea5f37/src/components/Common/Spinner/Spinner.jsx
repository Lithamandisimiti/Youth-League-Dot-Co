import React from 'react';
import './loader.css';


const Spinner = (props) => (
    <div style={props.containerStyle} className="spinner-holder text-center">
        <svg className="spinner" style={props.style} viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="1.5"></circle>
        </svg>                    
    </div>
);

export default Spinner;
