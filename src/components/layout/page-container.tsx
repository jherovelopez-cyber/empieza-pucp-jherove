import { cn } from "@/lib/utils";

export function PageContainer({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("mx-auto min-h-dvh w-full max-w-3xl px-4 pb-24 pt-4 md:px-6", className)}>
      {children}
    </main>
  );
}
