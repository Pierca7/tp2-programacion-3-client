import { DataSet, Network, Options, Node, Edge, Data } from "vis";
import { Agent } from "../models/Agent";

class GraphGenerator {
    private readonly _colors: string[] = ["#FF0000", "#FFFF00", "#00FF00", "#FFAA00", "#00FFFF", "#0000FF", "#FF00FF"];
    private readonly _options: Options = {
        interaction: {
          navigationButtons: false,
          dragNodes: false,
          dragView: false,
          tooltipDelay: 200,
          hideEdgesOnDrag: true
        },
        nodes: {
          shape: "circle",
          font: {
              size: 10,
              face: "Tahoma"
          }
        },
        edges: {
            width: 0.5,
            scaling: {
                min: 1,
                max: 1
            },
            color:{
                color: "#000000"
            }
        },
        physics: {
            repulsion: {
                springLength: 1000,
                nodeDistance: 1000,
            },
            stabilization: true
        },
        layout:{
          randomSeed: 446003
        }
    };
    private readonly nodeAmount = 9;
    private _agents: Agent[] = [];
    private _edges: Edge[] = [];
    
    constructor() {
        this._createNodes();
        this._createEdges();
    }

    public createGraph(): void {
        const container = document.getElementById("mynetwork");
        const data: Data = {
            nodes: new DataSet(this._agents),
            edges: new DataSet(this._edges)
        };
        const network = new Network(container, data, this._options);
    }

    private _createNodes(): void {
        for (let i = 0; i < this.nodeAmount; i++) {
            const colorsLength = this._colors.length;
            const colorIndex = (i < colorsLength) ? i : i - (colorsLength * Math.floor(i / colorsLength));

            this._agents.push({
                id: i,
                color: this._colors[colorIndex],
                name: `Agent ${i}`,
                age: this._generateRandomInteger()
            });
            const node = this._agents[i];
            node.label = `${node.name} \n Age: ${node.age} \n Color: ${node.color}`
        }
    }

    private _createEdges(): void {
        this._edges.push(...[
            {
                from: 0,
                to: 1,
                value: this._generateRandomInteger()
            },
            {
                from: 1,
                to: 2,
                value: this._generateRandomInteger()
            },
            {
                from: 2,
                to: 3,
                value: this._generateRandomInteger()
            },
            {
                from: 3,
                to: 4,
                value: this._generateRandomInteger()
            },
            {
                from: 4,
                to: 5,
                value: this._generateRandomInteger()
            },
            {
                from: 5,
                to: 6,
                value: this._generateRandomInteger()
            },
            {
                from: 6,
                to: 7,
                value: this._generateRandomInteger()
            },
            {
                from: 7,
                to: 0,
                value: this._generateRandomInteger()
            },
            {
                from: 1,
                to: 7,
                value: this._generateRandomInteger()
            },
            {
                from: 2,
                to: 8,
                value: this._generateRandomInteger()
            },
            {
                from: 8,
                to: 6,
                value: this._generateRandomInteger()
            },
            {
                from: 3,
                to: 5,
                value: this._generateRandomInteger()
            },
            {
                from: 7,
                to: 8,
                value: this._generateRandomInteger()
            },
            {
                from: 2,
                to: 5,
                value: this._generateRandomInteger()
            },
        ])
        this._edges.forEach(edge => edge.label = edge.value.toString());
    }

    private _generateRandomInteger(): number {
        return Math.floor(Math.random() * 100) + 1
    }
}

export default GraphGenerator;