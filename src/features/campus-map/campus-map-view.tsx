"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCampusMapStore } from "@/features/campus-map/campus-map-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/feedback/status-badge";
import type { CampusPlace, CampusNode } from "@/types/domain";

const filters = ["Todos", "Aulas", "Laboratorios", "Servicios"];

type PlaceFeature = {
  type: string;
  properties: {
    id: string;
    name: string;
    category?: string;
    description?: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
};

export function CampusMapView({
  places,
}: {
  places: CampusPlace[];
  route?: { nodes: CampusNode[]; nodeIds: string[] };
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [geojsonFeatures, setGeojsonFeatures] = useState<PlaceFeature[]>([]);
  const { selectedPlaceId, setSelectedPlaceId, filter, setFilter } = useCampusMapStore();

  const selectedPlace = useMemo(
    () => places.find((place) => place.id === selectedPlaceId) ?? places[0],
    [places, selectedPlaceId]
  );

  const filteredFeatures = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return geojsonFeatures.filter((feature) => {
      const { name, category } = feature.properties;
      const matchesSearch = !query || name.toLowerCase().includes(query);
      const matchesCategory = filter === "Todos" || category === filter;
      return matchesSearch && matchesCategory;
    });
  }, [geojsonFeatures, filter, searchQuery]);

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
            attribution: "OpenStreetMap",
          },
        },
        layers: [{ id: "osm", type: "raster", source: "osm" }],
      },
      center: [-77.0803, -12.0694],
      zoom: 17,
    });

    mapInstance.current = map;

    map.on("load", async () => {
      try {
        // Agregamos un query string dinámico para burlar el caché
        const response = await fetch(`/campus/places.geojson?v=${new Date().getTime()}`);
        const geojsonData = await response.json();
        setGeojsonFeatures(geojsonData.features ?? []);
      } catch (error) {
        console.error("Error cargando el GeoJSON:", error);
      }
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    filteredFeatures.forEach((feature) => {
      const [lng, lat] = feature.geometry.coordinates;
      const { id } = feature.properties;

      const marker = new maplibregl.Marker({ color: "#1E2A5A" })
        .setLngLat([lng, lat])
        .addTo(map);

      marker.getElement().addEventListener("click", () => {
        setSelectedPlaceId(id);
      });

      markersRef.current.push(marker);
    });
  }, [filteredFeatures, setSelectedPlaceId]);

  return (
    <div className="space-y-4">
      <Input
        aria-label="Buscar en campus"
        placeholder="Busca una facultad, salón o espacio..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
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

      <div className="h-[420px] overflow-hidden rounded-xl border bg-slate-100" ref={mapRef} />

      <Card className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <StatusBadge tone="blue">Destino seleccionado</StatusBadge>
            <h2 className="mt-2 text-xl font-bold text-navy">
              {selectedPlace?.name || "Selecciona un lugar en el mapa"}
            </h2>
            <p className="text-sm text-gray-500">
              {selectedPlace?.description ?? "Punto de referencia en el campus."}
            </p>
          </div>
          <Button>Llévame ahí</Button>
        </div>
      </Card>
    </div>
  );
}
