import type { CampusNode, CampusRoute } from "@/types/domain";

type Edge = {
  to: string;
  weight: number;
};

export function findShortestPath(
  nodes: CampusNode[],
  routes: CampusRoute[],
  startId: string,
  endId: string
) {
  const nodeIds = new Set(nodes.map((node) => node.id));
  if (!nodeIds.has(startId) || !nodeIds.has(endId)) return [];

  const graph = new Map<string, Edge[]>();
  nodes.forEach((node) => graph.set(node.id, []));
  routes.forEach((route) => {
    graph.get(route.from)?.push({ to: route.to, weight: route.distanceMeters });
    graph.get(route.to)?.push({ to: route.from, weight: route.distanceMeters });
  });

  const distances = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const unvisited = new Set<string>();

  nodes.forEach((node) => {
    distances.set(node.id, node.id === startId ? 0 : Number.POSITIVE_INFINITY);
    previous.set(node.id, null);
    unvisited.add(node.id);
  });

  while (unvisited.size > 0) {
    const current = [...unvisited].sort(
      (a, b) => (distances.get(a) ?? Infinity) - (distances.get(b) ?? Infinity)
    )[0];

    if (!current || current === endId) break;
    unvisited.delete(current);

    for (const edge of graph.get(current) ?? []) {
      const alternative = (distances.get(current) ?? Infinity) + edge.weight;
      if (alternative < (distances.get(edge.to) ?? Infinity)) {
        distances.set(edge.to, alternative);
        previous.set(edge.to, current);
      }
    }
  }

  const path: string[] = [];
  let cursor: string | null = endId;
  while (cursor) {
    path.unshift(cursor);
    cursor = previous.get(cursor) ?? null;
  }

  return path[0] === startId ? path : [];
}
