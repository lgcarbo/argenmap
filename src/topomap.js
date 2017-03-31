import React from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import TopoFeature from "./topoFeature";

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

    render() {
        const width = this.props.width;
        const height = this.props.height;
        const topology = this.props.topology;
        const topoMap = this.props.map;
        const names = this.props.names;
        const votes = this.props.votes;
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
                            <TopoFeature key={i} index={i} projection={projection} feature={f} name={names[i]} votes={votes[i]} isSelected={false} />
                        )
                    })
                }
                <path d={projection(countryBoundaries)} style={countryBoundaryStyle} />
                <path d={projection(provinceBoundaries)} style={provinceBoundaryStyle} />
            </g>
        );
    }
};

export default TopoMap;