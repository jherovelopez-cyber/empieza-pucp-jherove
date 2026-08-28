import { getCampusPlaces, getDemoRoute } from "@/services/maps/campus-map.repository";
import { CampusMapView } from "@/features/campus-map/campus-map-view";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";

export default async function CampusMapPage() {
  const places = await getCampusPlaces();
  const route = await getDemoRoute("n-eegg");

  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Explora PUCP" subtitle="Busca una facultad, salon o espacio" />
      <CampusMapView places={places} route={route} />
    </PageContainer>
  );
}
