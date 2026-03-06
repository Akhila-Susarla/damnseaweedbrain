import Shell from "@/components/layout/Shell";
import Section from "@/components/layout/Section";
import { skills } from "@/data/skills";

export default function Home() {
  const sSkills = skills.filter((s) => s.tier === "S");
  const aSkills = skills.filter((s) => s.tier === "A");

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

      {/* Texture Showcase */}
      <Section id="textures" depth={2}>
        <h2 className="font-heading text-2xl tablet:text-3xl text-gold mb-8">
          Visual Motifs
        </h2>

        {/* Paper texture card */}
        <div className="texture-paper bg-midnight-light rounded-lg p-6 mb-6">
          <h3 className="font-heading text-xl text-gold-muted mb-2">
            Paper Texture
          </h3>
          <p className="text-parchment-dim text-sm">
            Subtle fractal noise overlay simulating aged parchment. Every
            detective agency needs well-worn case files.
          </p>
        </div>

        {/* Bandage stripe divider */}
        <div className="texture-bandage h-8 rounded mb-6" />

        {/* Classified stamp */}
        <div className="flex items-center gap-4 mb-6">
          <span className="stamp-classified">Classified</span>
          <span className="stamp-classified" style={{ transform: "rotate(-2deg)" }}>
            Top Secret
          </span>
          <span className="stamp-classified" style={{ transform: "rotate(-8deg)" }}>
            Redacted
          </span>
        </div>

        {/* Aged edge card */}
        <div className="texture-aged-edge bg-midnight-light rounded-lg p-6 mb-6">
          <h3 className="font-heading text-xl text-gold-muted mb-2">
            Aged Edges
          </h3>
          <p className="text-parchment-dim text-sm">
            Inset shadows create the appearance of worn, weathered document
            edges. Case files that have seen some action.
          </p>
        </div>

        {/* Ability glow */}
        <div className="glow-ability bg-midnight-light rounded-lg p-6 mb-6 border border-teal/20">
          <h3 className="font-heading text-xl text-teal mb-2">
            Ability Glow
          </h3>
          <p className="text-parchment-dim text-sm">
            Teal supernatural glow with pulse animation. Every member of the
            Armed Detective Agency has a special ability.
          </p>
        </div>

        {/* Ink splatter */}
        <div className="texture-ink bg-midnight-light rounded-lg p-6 mb-6">
          <h3 className="font-heading text-xl text-gold-muted mb-2">
            Ink Splatter
          </h3>
          <p className="text-parchment-dim text-sm">
            Layered radial gradients simulating calligraphy brush strokes. The
            literary spirit of the agency.
          </p>
        </div>
      </Section>

      {/* Skills Data Integration */}
      <Section id="skills-preview" depth={3}>
        <h2 className="font-heading text-2xl tablet:text-3xl text-gold mb-6">
          Ability Rankings
        </h2>

        <div className="mb-6">
          <h3 className="font-mono text-sm text-classified-red uppercase tracking-widest mb-3">
            S-Rank Abilities
          </h3>
          <div className="flex flex-wrap gap-3">
            {sSkills.map((skill) => (
              <div
                key={skill.name}
                className="glow-ability bg-midnight-light border border-teal/30 rounded px-4 py-2"
              >
                <span className="font-body text-parchment text-sm">
                  {skill.name}
                </span>
                {skill.kanjiName && (
                  <span className="block font-mono text-xs text-teal-muted mt-0.5">
                    {skill.kanjiName}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-sm text-gold-muted uppercase tracking-widest mb-3">
            A-Rank Abilities
          </h3>
          <div className="flex flex-wrap gap-3">
            {aSkills.map((skill) => (
              <div
                key={skill.name}
                className="texture-aged-edge bg-midnight-light border border-gold-muted/20 rounded px-4 py-2"
              >
                <span className="font-body text-parchment-dim text-sm">
                  {skill.name}
                </span>
                {skill.kanjiName && (
                  <span className="block font-mono text-xs text-gold-muted mt-0.5">
                    {skill.kanjiName}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </Shell>
  );
}
