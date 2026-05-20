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
        "w-full py-8 mobile:py-10 tablet:py-16 desktop:py-20",
        className
      )}
    >
      {children}
    </section>
  );
}
