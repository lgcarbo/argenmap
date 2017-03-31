import TopoMap from './topomap';
import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import CustomText from './customText';

const names = ['Buenos Aires', 'Córdoba', 'Catamarca', 'Chaco', 'Chubut','Ciudad de Buenos Aires','Corrientes','Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza','Misiones','Neuquén','Río Negro','Salta','San Juan','San Luis','Santa Cruz','Santa Fe','Santiago del Estero','Tierra del Fuego','Tucumán',];

const votes = [
    [4662935, 4882082],
    [1546831, 616002],
    [102440, 116158],
    [278001, 403280],
    [130163, 186155],
    [1258151, 683545],
    [286345, 355119],
    [453149, 388219],
    [116725, 206762],
    [214429, 190959],
    [108543, 104169],
    [114963, 88502],
    [625983, 462186],
    [280762, 388910],
    [177935, 199425],
    [148087, 250621],
    [323818, 399518],
    [175377, 260937],
    [178156, 99667],
    [72876, 102003],
    [1141121, 906826],
    [154955, 400331],
    [38407, 54503],
    [398197, 563696]
    ];

class App extends React.Component {

  render() {

    const { topology  } = this.props;
    const width = 800, height = 600;

    return (
      <svg width={width} height={height}>
        <CustomText x={width/2} y={50} size={35}>Argentina - Presidential Election 2015</CustomText>
        <TopoMap topology={topology} map={topology.objects.map} names={names} votes={votes} x={width/2-150} y={80} width={300} height={500} />
      </svg>
    );
  }
}

d3.json("./argentina_prov.json", (err, d) => {
  if(err) throw err;

  ReactDOM.render(
    <App topology={d} />, 
    document.getElementById("root")
  );
});




