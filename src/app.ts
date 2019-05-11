import { DataSet, Network, Options } from "vis";
import 'vis/dist/vis-network.min.css';

// create an array with nodes
var nodes = new DataSet([
  {id: 1, label: 'Node 1'},
  {id: 2, label: 'Node 2'},
  {id: 3, label: 'Node 3'},
  {id: 4, label: 'Node 4'},
  {id: 5, label: 'Node 5'}
]);

// create an array with edges
var edges = new DataSet([
  {from: 1, to: 3, length: 500},
  {from: 1, to: 2, length: 300},
  {from: 2, to: 4, length: 100},
  {from: 2, to: 5, length: 200},
]);

// create a network
var container = document.getElementById('mynetwork');
var data = {
  nodes: nodes,
  edges: edges
};
var options = <Options>{
  interaction: {
    navigationButtons: false,
    dragNodes: false,
    dragView: false,
    tooltipDelay: 200,
    hideEdgesOnDrag: true
  },
  nodes: {
    shape: 'dot',
    font: {
        size: 12,
        face: 'Tahoma'
    }
  },
  edges: {
      width: 0.15,
      color: {inherit: 'from'},
      smooth: {
          type: 'continuous'
      },
  },
  physics: {
      repulsion: {
          springLength: 1000,
          nodeDistance: 1000,
      },
      stabilization: true
  },
  layout:{
    randomSeed: 1
  }
};
var network = new Network(container, data, options);
