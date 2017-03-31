import React from 'react';

const CustomText = (props) => {
  const { x, y, size, children } = props;
  return (<text transform={"translate(" + x + "," + y + ")"} fontFamily={"Verdana"} fontSize={size} textAnchor={"middle"}>{children}</text>);
};

export default CustomText;