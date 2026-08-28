import { describe, expect, it } from "vitest";
import { findShortestPath } from "@/services/maps/pathfinding";

describe("campus pathfinding", () => {
  it("finds the shortest demo path", () => {
    const nodes = [
      { id: "a", latitude: 0, longitude: 0 },
      { id: "b", latitude: 0, longitude: 1 },
      { id: "c", latitude: 0, longitude: 2 }
    ];
    const routes = [
      { id: "ab", from: "a", to: "b", nodeIds: ["a", "b"], distanceMeters: 2 },
      { id: "bc", from: "b", to: "c", nodeIds: ["b", "c"], distanceMeters: 2 },
      { id: "ac", from: "a", to: "c", nodeIds: ["a", "c"], distanceMeters: 10 }
    ];

    expect(findShortestPath(nodes, routes, "a", "c")).toEqual(["a", "b", "c"]);
  });
});
