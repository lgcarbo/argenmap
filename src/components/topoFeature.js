import React from 'react';

const provinceStyle = {
    "fill": "#ddc",
    "cursor": "pointer"
}

const provinceHoverStyle = {
    "fill": "#8a8a5c",
    "cursor": "pointer"
}

const TopoFeature = (props) => {
    const { projection, feature, selected, onMouseEnter, onMouseLeave } = props;
    return (
        <path d={projection(feature)} style={selected ? provinceHoverStyle : provinceStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
    );
}

export default TopoFeature;