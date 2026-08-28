import {
  campusNodes,
  campusPlaces,
  campusRoutes
} from "@/features/demo/demo-data";
import { findShortestPath } from "@/services/maps/pathfinding";

export async function getCampusPlaces() {
  return campusPlaces;
}

export async function getDemoRoute(destinationNodeId = "n-eegg") {
  const path = findShortestPath(campusNodes, campusRoutes, "n-start", destinationNodeId);
  return {
    nodes: campusNodes.filter((node) => path.includes(node.id)),
    nodeIds: path
  };
}
