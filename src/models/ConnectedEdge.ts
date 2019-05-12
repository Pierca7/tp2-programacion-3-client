import { Edge, IdType } from "vis";

export interface ConnectedEdge extends Edge{
    connectedNodes?: IdType[];
}