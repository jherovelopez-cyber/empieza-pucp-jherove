"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SourceBadge } from "@/components/feedback/source-badge";
import { StatusBadge } from "@/components/feedback/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { queryKeys } from "@/lib/query-keys";
import {
  getStudentOnboarding,
  toggleOnboardingStep
} from "@/features/onboarding/onboarding.repository";
import { isStepCompleted } from "@/features/onboarding/onboarding-utils";

type OnboardingData = Awaited<ReturnType<typeof getStudentOnboarding>>;

export function OnboardingList({
  initialData,
  studentId
}: {
  initialData: OnboardingData;
  studentId: string;
}) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: queryKeys.onboarding.student(studentId),
    queryFn: () => getStudentOnboarding(studentId),
    initialData
  });

  const mutation = useMutation({
    mutationFn: ({ stepId, completed }: { stepId: string; completed: boolean }) =>
      toggleOnboardingStep(studentId, stepId, completed),
    onSuccess: (data) => queryClient.setQueryData(queryKeys.onboarding.student(studentId), data)
  });

  return (
    <div className="space-y-3">
      {query.data.steps.map((step) => {
        const completed = isStepCompleted(step.id, query.data.records);
        return (
          <Card key={step.id} className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <SourceBadge source={step.sourceType} />
                  <StatusBadge tone={completed ? "green" : "yellow"}>
                    {completed ? "Completado" : "Pendiente"}
                  </StatusBadge>
                </div>
                <div>
                  <h2 className="font-bold text-navy">{step.title}</h2>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
              <Button
                variant={completed ? "secondary" : "primary"}
                onClick={() => mutation.mutate({ stepId: step.id, completed: !completed })}
              >
                {completed ? "Desmarcar" : "Completar"}
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
