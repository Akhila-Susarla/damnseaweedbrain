import Shell from "@/components/layout/Shell";
import Section from "@/components/layout/Section";

export default function Home() {
  return (
    <Shell>
      <Section id="hero" depth={1}>
        <h1 className="font-heading text-4xl tablet:text-5xl desktop:text-6xl text-gold mb-6">
          DamnSeaweedBrain
        </h1>
        <p className="font-body text-lg tablet:text-xl text-parchment max-w-2xl mb-4">
          Armed Detective Agency -- Data Science Division. A portfolio where
          case files meet machine learning, and every project is a mystery
          worth solving.
        </p>
        <p className="font-mono text-sm text-teal">
          STATUS: ACTIVE &middot; CLEARANCE: S-RANK &middot; AGENT: OPERATIONAL
        </p>
      </Section>
    </Shell>
  );
}
