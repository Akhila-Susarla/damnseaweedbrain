import { cn } from "@/lib/utils";

type DepthVariant = 1 | 2 | 3 | 4;

interface SectionProps {
  id: string;
  className?: string;
  depth?: DepthVariant;
  children: React.ReactNode;
}

const depthStyles: Record<DepthVariant, string> = {
  1: "bg-[var(--section-depth-1)]",
  2: "bg-[var(--section-depth-2)]",
  3: "bg-[var(--section-depth-3)]",
  4: "bg-[var(--section-depth-4)]",
};

export default function Section({
  id,
  className,
  depth,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full py-20 tablet:py-28 desktop:py-36",
        depth && depthStyles[depth],
        className
      )}
    >
      {children}
    </section>
  );
}
