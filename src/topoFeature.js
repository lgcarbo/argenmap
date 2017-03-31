import React from 'react';
import ProvinceResults from "./provinceResults";

const provinceStyle = {
    "fill": "#ddc",
    "cursor": "pointer"
}

const provinceHoverStyle = {
    "fill": "#8a8a5c",
    "cursor": "pointer"
}

const provinceSelectedStyle = {
    "fill": "orange"
}

const provinceLabelStyle = {
    "fill": "black",
    "fillOpacity": ".5",
    "fontSize": "20px",
    "fontWeight": "300",
    "textAnchor": "middle",
    "cursor": "pointer",
}

class TopoFeature extends React.Component {
    constructor(props) {
        super(props);
        this._handleOnMouseOver = this._handleOnMouseOver.bind(this);
        this._handleOnMouseOut = this._handleOnMouseOut.bind(this);
        this.state = { isMouseOver: false, isSelected: props.isSelected };
    }

    _handleOnMouseOver = () => {
        if(!this.state.isMouseOver) {
            this.setState({ isMouseOver: true, resultVisible: true });
        }
    };

    _handleOnMouseOut = () => {
        if(this.state.isMouseOver) {
            this.setState({ isMouseOver: false, resultVisible: false });
        }
    };

    render() {
        const projection = this.props.projection;
        const feature = this.props.feature;
        const isMouseOver = this.state.isMouseOver;
        const isSelected = this.state.isSelected;
        const centroid = this.props.projection.centroid(this.props.feature);
        const name = this.props.name;
        const votes = this.props.votes;

        return (
            <g>
                <path d={projection(feature)} style={isSelected ? provinceSelectedStyle : (isMouseOver ? provinceHoverStyle : provinceStyle)} onMouseOver={this._handleOnMouseOver} onMouseOut={this._handleOnMouseOut} />
                <ProvinceResults x={centroid[0]} y={centroid[1]} province={name} votes={votes} visible={this.state.resultVisible} />
            </g>
        );
    }
}

export default TopoFeature;