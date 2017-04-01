import React from "react";
import * as d3 from "d3";
import CustomText from './customText';

const Pie = (props) => {
    const { data, labels, x, y, width, height, colors} = props;
    const radius = Math.min(width, height) / 2;
    const colorScale = d3.scaleOrdinal(colors);
    const pie = d3.pie().sort(null).value(d => d);
    const path = d3.arc().outerRadius(radius - 10).innerRadius(0);
    const label = d3.arc().outerRadius(radius - 10).innerRadius(0);
    const pieData = pie(data);
    const total = data.reduce((a,b) => a + b);
    
    return (
        <g width={width} height={height} transform={"translate(" + x + "," + y + ")"}>
            {pieData.map((d,i) => 
            {
                const coord = label.centroid(d);
                return(<g key={i}>
                    <path d={path(d)} fill={colorScale(i)}/>
                    <CustomText x={coord[0]} y={coord[1]} >
                        {labels[i]}
                    </CustomText>
                    <CustomText x={coord[0]} y={coord[1]+20}>
                        {(d.data / total * 100).toFixed(2) + "%"}
                    </CustomText>
                </g>)
                }
                )}
        </g>
    );
}

export default Pie;