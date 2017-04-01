import React from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import TopoFeatureContainer from "../containers/topoFeatureContainer";
import ProvinceResultsContainer from "../containers/provinceResultsContainer";

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
    // Function extracted from http://stackoverflow.com/questions/14492284/center-a-map-in-d3-given-a-geojson-object
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

const TopoMap = (props) => {
    const { topology, topoMap, width, height, names, votes, x, y, onChartChanged } = props;
    const country = topojson.feature(topology, topoMap);
    const countryBoundaries = topojson.mesh(topology, topoMap, (a,b) => { return a === b});
    const provinceBoundaries = topojson.mesh(topology, topoMap, (a,b) => { return a !== b});
    const projection = getProjection(country, width, height);
    
    return (
        <g width={width} height={height} transform={"translate(" + x + ", " + y + ")"}>
            {
                country.features.map((f,i) => { 
                    return ( 
                        <TopoFeatureContainer key={i} index={i} projection={projection} feature={f} />
                    )
                })
            }
            {
                country.features.map((f,i) => { 
                    var centroid = projection.centroid(f);
                    return ( 
                        <ProvinceResultsContainer key={i} index={i} x={centroid[0]} y={centroid[1]} province={names[i]} votes={votes[i]} />
                    )
                })
            }
            <path d={projection(countryBoundaries)} style={countryBoundaryStyle} />
            <path d={projection(provinceBoundaries)} style={provinceBoundaryStyle} />
        </g>
    );
};

export default TopoMap;