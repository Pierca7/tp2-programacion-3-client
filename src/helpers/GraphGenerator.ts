import { DataSet, Network, Options, Data, IdType } from "vis";
import { Agent } from "../models/Agent";
import { ConnectedEdge } from "../models/ConnectedEdge";
import PriorityQueue from "./PriorityQueue";

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
            width: 50,
            scaling: {
                min: 2,
                max: 2
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
    private _edges: ConnectedEdge[] = [];
    private _network: Network;
    
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
        this._network = new Network(container, data, this._options);
    }

    public generateMinimumSpanningTree() {
        const mstEdges = new Set<IdType>();
        const explored = new Set<IdType>();
        const queue = new PriorityQueue<ConnectedEdge>();

        let initialNode: IdType = 0;

        const initialEdges = this._getNodeEdges(initialNode);
        initialEdges.forEach(edge => {
            queue.enqueue(edge, edge.value);
        });

        let currentMinEdge = queue.dequeue();
        mstEdges.add(currentMinEdge.id);
        explored.add(initialNode);

        while (explored.size < this.nodeAmount) {
            initialNode = (initialNode === currentMinEdge.to) ? currentMinEdge.from : currentMinEdge.to;
            explored.add(initialNode);
            const edges = this._getNodeEdges(initialNode);
            edges.forEach(edge => {
                queue.enqueue(edge, edge.value);
            });
            let nextNode;
            while (!queue.isEmpty()){
                const edge = queue.dequeue();
                nextNode = (initialNode === edge.to) ? edge.from : edge.to;
                if (!explored.has(nextNode) && !mstEdges.has(edge.id)){
                    currentMinEdge = edge;                    
                    mstEdges.add(edge.id);
                    break;
                }
            }
            explored.add(nextNode);
        }
    }

    private _getNodeEdges(nodeId: IdType): ConnectedEdge[] {
        const edgeIds = this._network && this._network.getConnectedEdges(nodeId);
        const edges: ConnectedEdge[] = [];
        
        edgeIds.forEach(id => {
            const edge = this._edges.find(edge => edge.id === id);
            edges.push(edge);
        })

        return edges;
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
            node.label = `${node.name} \n Age: ${node.age} \n Color: ${node.color}`;
        }
    }

    private _createEdges(): void {
        this._edges.push(...[
            {
                id: "e0",
                from: 0,
                to: 1,
                value: this._generateRandomInteger()
            },
            {
                id: "e1",
                from: 1,
                to: 2,
                value: this._generateRandomInteger()
            },
            {
                id: "e2",
                from: 2,
                to: 3,
                value: this._generateRandomInteger()
            },
            {
                id: "e3",
                from: 3,
                to: 4,
                value: this._generateRandomInteger()
            },
            {
                id: "e4",
                from: 4,
                to: 5,
                value: this._generateRandomInteger()
            },
            {
                id: "e5",
                from: 5,
                to: 6,
                value: this._generateRandomInteger()
            },
            {
                id: "e6",
                from: 6,
                to: 7,
                value: this._generateRandomInteger()
            },
            {
                id: "e7",
                from: 7,
                to: 0,
                value: this._generateRandomInteger()
            },
            {
                id: "e8",
                from: 1,
                to: 7,
                value: this._generateRandomInteger()
            },
            {
                id: "e9",
                from: 2,
                to: 8,
                value: this._generateRandomInteger()
            },
            {
                id: "e10",
                from: 8,
                to: 6,
                value: this._generateRandomInteger()
            },
            {
                id: "e11",
                from: 3,
                to: 5,
                value: this._generateRandomInteger()
            },
            {
                id: "e12",
                from: 7,
                to: 8,
                value: this._generateRandomInteger()
            },
            {
                id: "e13",
                from: 2,
                to: 5,
                value: this._generateRandomInteger()
            },
        ])
        this._edges.forEach(edge => {
            edge.label = `${edge.id}\n${edge.value.toString()}`;
            edge.connectedNodes = [edge.from, edge.to];
        });
    }

    private _generateRandomInteger(): number {
        return Math.floor(Math.random() * 100) + 1
    }
}

export default GraphGenerator;