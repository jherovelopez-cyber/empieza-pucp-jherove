import type { SourceType } from "@/types/domain";
import { StatusBadge } from "@/components/feedback/status-badge";

const sourceLabels: Record<SourceType, string> = {
  official: "Informacion oficial",
  cf: "Centro Federado",
  jh: "Consejo de tu JH"
};

const sourceTones: Record<SourceType, "blue" | "green" | "violet"> = {
  official: "blue",
  cf: "green",
  jh: "violet"
};

export function SourceBadge({ source }: { source: SourceType }) {
  return <StatusBadge tone={sourceTones[source]}>{sourceLabels[source]}</StatusBadge>;
}
