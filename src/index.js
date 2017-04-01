import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import TopoMap from './components/topoMap';
import CustomText from './components/customText';
import { provinceNames, votesByProvince } from './electiondata';

let store = createStore(reducer);

const App = (props) => {
    const topology = props.topology;
    const width = 800, height = 600;

    return (
      <svg width={width} height={height}>
        <CustomText x={width/2} y={50} size={35}>Argentina - Presidential Election 2015</CustomText>
        <TopoMap topology={topology} topoMap={topology.objects.map} names={provinceNames} votes={votesByProvince} x={width/2-150} y={80} width={300} height={500} />
      </svg>
    );
}

d3.json("./argentina_prov.json", (err, d) => {
  if(err) throw err;

  ReactDOM.render(
    <Provider store={store}>
      <App topology={d} />
    </Provider>,
    document.getElementById("root")
  );
});




