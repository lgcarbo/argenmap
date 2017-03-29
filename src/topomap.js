import React from "react";
import * as d3 from "d3";
import * as topojson from "topojson";

const countryBoundaryStyle = {
    "fill": "none",
    "stroke": "black"
}

const provinceBoundaryStyle = {
    "fill": "none",
    "stroke": "#777",
    "strokeDasharray": "2,2",
    "strokeLinejoin": "round"
}

const getProjection = (features, width, height) => {
    // Unit projection and path
    var uprojection = d3.geoMercator()
        .scale(1)
        .translate([0, 0]);
    var upath = d3.geoPath()
        .projection(uprojection);

    // Compute the bounds of a feature of interest, then derive scale & translate.
    var b = upath.bounds(features),
        s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
        t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

    // Update the projection to use computed scale & translate.
    uprojection
        .scale(s)
        .translate(t);
    
    return d3.geoPath().projection(uprojection);
}

class TopoMap extends React.Component {
    constructor(props) {
        super(props);
        this._handleOnMouseOver = this._handleOnMouseOver.bind(this);
        this._handleOnMouseOut = this._handleOnMouseOut.bind(this);
        this.state = { mouseOverIndex: -1 };
    }
    
    _handleOnMouseOver = (i) => {
        this.setState({ mouseOverIndex: i });
    };

    _handleOnMouseOut = () => {
        this.setState({ mouseOverIndex: -1 });
    };

    render() {
        const width = this.props.width;
        const height = this.props.height;
        const topology = this.props.topology;
        const topoMap = this.props.map;
        const names = this.props.names;
        const x = this.props.x;
        const y = this.props.y;

        const country = topojson.feature(topology, topoMap);
        const countryBoundaries = topojson.mesh(topology, topoMap, (a,b) => { return a === b});
        const provinceBoundaries = topojson.mesh(topology, topoMap, (a,b) => { return a !== b});

        const projection = getProjection(country, width, height);

        return (
            <g width={width} height={height} transform={"translate(" + x + ", " + y + ")"}>
                {
                    country.features.map((f,i) => { 
                        return ( 
                            <TopoFeature key={i} index={i} projection={projection} feature={f} name={names[i]} onMouseOver={this._handleOnMouseOver} onMouseOut={this._handleOnMouseOut}/> 
                        )
                    })
                }
                {
                    country.features.map((f,i) => { 
                        return ( 
                            <text key={i} transform={"translate(" + projection.centroid(f) + ")"} style={provinceLabelStyle} visibility={this.state.mouseOverIndex == i ? "visible" : "hidden"}>{names[i]}</text>
                        )
                    })
                }
                <path d={projection(countryBoundaries)} style={countryBoundaryStyle} />
                <path d={projection(provinceBoundaries)} style={provinceBoundaryStyle} />
            </g>
        );
    }
};

const provinceStyle = {
    "fill": "#ddc",
    "cursor": "pointer"
}

const provinceHoverStyle = {
    "fill": "orange",
    "cursor": "pointer"
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
        this.state = { isMouseOver: false };
    }

    _handleOnMouseOver = () => {
        this.setState({ isMouseOver: true });
        this.props.onMouseOver(this.props.index);
    };

    _handleOnMouseOut = () => {
        this.setState({ isMouseOver: false });
        this.props.onMouseOut(this.props.index);
    };

    render() {
        const projection = this.props.projection;
        const feature = this.props.feature;
        const isMouseOver = this.state.isMouseOver;
        return (
            <path d={projection(feature)} style={isMouseOver ? provinceHoverStyle : provinceStyle} onMouseOver={this._handleOnMouseOver} onMouseOut={this._handleOnMouseOut} />
        );
    }
}

export default TopoMap;