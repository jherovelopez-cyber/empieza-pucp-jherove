"use client";

import { useEffect, useMemo, useRef } from "react";
import maplibregl from "maplibre-gl";
import type { CampusPlace, CampusNode } from "@/types/domain";
import { useCampusMapStore } from "@/features/campus-map/campus-map-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/feedback/status-badge";
import "maplibre-gl/dist/maplibre-gl.css";

const filters = ["A", "B", "C", "D", "Servicios"];

export function CampusMapView({
  places,
  route
}: {
  places: CampusPlace[];
  route: { nodes: CampusNode[]; nodeIds: string[] };
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);
  const { selectedPlaceId, setSelectedPlaceId, filter, setFilter } = useCampusMapStore();

  const selectedPlace = useMemo(
    () => places.find((place) => place.id === selectedPlaceId) ?? places[0],
    [places, selectedPlaceId]
  );

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "OpenStreetMap"
          }
        },
        layers: [{ id: "osm", type: "raster", source: "osm" }]
      },
      center: [-77.0803, -12.0694],
      zoom: 17
    });

    mapInstance.current = map;
    new maplibregl.Marker({ color: "#008CFF" })
      .setLngLat([-77.0811, -12.0697])
      .setPopup(new maplibregl.Popup().setText("Posicion actual simulada"))
      .addTo(map);

    places.forEach((place) => {
      new maplibregl.Marker({ color: "#1E2A5A" })
        .setLngLat([place.longitude, place.latitude])
        .setPopup(new maplibregl.Popup().setText(place.name))
        .addTo(map);
    });

    map.on("load", () => {
      map.addSource("demo-route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route.nodes.map((node) => [node.longitude, node.latitude])
          }
        }
      });
      map.addLayer({
        id: "demo-route",
        type: "line",
        source: "demo-route",
        paint: { "line-color": "#008CFF", "line-width": 5, "line-opacity": 0.75 }
      });
    });

    return () => map.remove();
  }, [places, route.nodes]);

  return (
    <div className="space-y-4">
      <Input aria-label="Buscar en campus" placeholder="Busca una facultad, salon o espacio" />
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((item) => (
          <Button
            key={item}
            variant={filter === item ? "primary" : "secondary"}
            onClick={() => setFilter(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="h-[420px] overflow-hidden rounded-xl border bg-pastel-blue" ref={mapRef} />
      <Card className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <StatusBadge tone="blue">Destino seleccionado</StatusBadge>
            <h2 className="mt-2 text-xl font-bold text-navy">{selectedPlace.name}</h2>
            <p className="text-sm text-muted-foreground">{selectedPlace.description ?? "Lugar clave del campus."}</p>
          </div>
          <Button>Llevame ahi</Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {places.map((place) => (
            <Button key={place.id} variant="secondary" onClick={() => setSelectedPlaceId(place.id)}>
              {place.name}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
