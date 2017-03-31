import React from 'react';
import Pie from './pie';
import CustomText from './customText'

const Annotation = (props) => {
  const { left, up } = props;
  const h = left ? -1 : 1;
  const v = up ? -1 : 1;
  return(<path d={"M0,0H" + (100*h) + "L" + [150*h,50*v] } fill={"none"} stroke={"black"} strokeWidth={1}/>  );
};

const ProvinceResults = (props) => {
  const { x, y, province, votes, visible } = props;
  const left = x < 130;
  const up = y > 200;
  const h = left ? -200 : 200;
  const v = up ? -200 : 0;
  return(<g transform={"translate(" + x + "," + y + ")"} visibility={visible ? "visible" : "hidden"}>
          <Annotation left={left} up={up}/>
          <g transform={"translate(" + (h) + "," + (v) + ")"}>
            <Pie data={votes} labels={["PRO","FPV"]} x={0} y={100} width={200} height={300} colors={["#d9d926", "#4646b9"]} />
            <CustomText x={0} y={0} size={20}>{province}</CustomText>
          </g>
        </g>);
};

export default ProvinceResults;