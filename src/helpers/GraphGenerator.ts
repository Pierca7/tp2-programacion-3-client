import { DataSet, Network, Options, Node, Edge, Data } from "vis";

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
          shape: 'dot',
          font: {
              size: 12,
              face: 'Tahoma'
          }
        },
        edges: {
            width: 0.15,
            color: {inherit: 'from'}
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
    private _nodes: Node[] = [];
    private _edges: Edge[] = [];
    
    constructor(nodeAmount: number){
        this._createNodes(nodeAmount);
        this._createEdges();
    }

    private _createNodes(nodeAmount: number): void {
        for (let i = 0; i < nodeAmount; i++) {
            const colorsLength = this._colors.length;
            const colorIndex = (i < colorsLength) ? i : i - (colorsLength * Math.floor(i / colorsLength));

            this._nodes.push({
                id: i,
                color: this._colors[colorIndex],
                label: `Agente ${i}`,
            })
        }
    }

    private _createEdges(): void {
        this._edges.push(...[
            {
                from: 0,
                to: 1,
                value: Math.floor(Math.random() * 100) + 1
            },
            {
                from: 1,
                to: 2,
                value: Math.floor(Math.random() * 100) + 1
            },
            {
                from: 2,
                to: 3,
                value: Math.floor(Math.random() * 100) + 1
            },
            {
                from: 3,
                to: 4,
                value: Math.floor(Math.random() * 100) + 1
            },
            {
                from: 4,
                to: 5,
                value: Math.floor(Math.random() * 100) + 1
            },
            {
                from: 5,
                to: 6,
                value: Math.floor(Math.random() * 100) + 1
            },
            {
                from: 6,
                to: 7,
                value: Math.floor(Math.random() * 100) + 1
            },
            {
                from: 7,
                to: 0,
                value: Math.floor(Math.random() * 100) + 1
            },
            {
                from: 1,
                to: 7,
                value: Math.floor(Math.random() * 100) + 1
            },
            {
                from: 2,
                to: 8,
                value: Math.floor(Math.random() * 100) + 1
            },
            {
                from: 8,
                to: 6,
                value: Math.floor(Math.random() * 100) + 1
            },
            {
                from: 3,
                to: 5,
                value: Math.floor(Math.random() * 100) + 1
            },
            {
                from: 7,
                to: 8,
                value: Math.floor(Math.random() * 100) + 1
            },
            {
                from: 2,
                to: 5,
                value: Math.floor(Math.random() * 100)
            },
        ])
        this._edges.forEach(edge => edge.label = edge.value.toString());
    }

    public createGraph() {
        const container = document.getElementById("mynetwork");
        const data: Data = {
            nodes: new DataSet(this._nodes),
            edges: new DataSet(this._edges)
        };
        const network = new Network(container, data, this._options);
    }
}

export default GraphGenerator;