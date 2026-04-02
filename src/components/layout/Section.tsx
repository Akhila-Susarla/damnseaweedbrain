import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  depth?: number; // kept for API compat but no longer applies bg
}

export default function Section({
  id,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full py-20 tablet:py-28 desktop:py-36",
        className
      )}
    >
      {children}
    </section>
  );
}
