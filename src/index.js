import TopoMap from './topomap';
import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

d3.json("./argentina_prov.json", (err, d) => {
  if(err) throw err;

  var names = ['Buenos Aires', 'Córdoba', 'Catamarca', 'Chaco', 'Chubut','Ciudad de Buenos Aires','Corrientes','Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza','Misiones','Neuquén','Río Negro','Salta','San Juan','San Luis','Santa Cruz','Santa Fe','Santiago del Estero','Tierra del Fuego','Tucumán',];

  ReactDOM.render(
    <svg width={800} height={600}>
      <TopoMap topology={d} map={d.objects.map} names={names} width={400} height={600} x={0} y={0} />
    </svg>, 
    document.getElementById("root")
  );
});