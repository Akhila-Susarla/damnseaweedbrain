import Shell from "@/components/layout/Shell";
import HeroSection from "@/components/sections/HeroSection";
import WhatIDoSection from "@/components/sections/WhatIDoSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EducationSection from "@/components/sections/EducationSection";
import SocialSection from "@/components/sections/SocialSection";
import ArtSection from "@/components/sections/ArtSection";
import InkWashTransition from "@/components/transitions/InkWashTransition";
import { socialLinks } from "@/data/social";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Akhila Susarla",
  jobTitle: "AI/ML Engineer",
  url: "https://damnseaweedbrain.com",
  sameAs: socialLinks
    .filter((link) => link.platform !== "Email")
    .map((link) => link.url),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Akhila Susarla — Portfolio",
  url: "https://damnseaweedbrain.com",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Shell>
        <HeroSection />
        <InkWashTransition triggerSelector="#what-i-do" />
        <WhatIDoSection />
        <InkWashTransition triggerSelector="#skills" />
        <SkillsSection />
        <InkWashTransition triggerSelector="#experience" />
        <ExperienceSection />
        <InkWashTransition triggerSelector="#projects" />
        <ProjectsSection />
        <InkWashTransition triggerSelector="#education" />
        <EducationSection />
        <InkWashTransition triggerSelector="#social" />
        <SocialSection />
        <InkWashTransition triggerSelector="#art" />
        <ArtSection />
      </Shell>
    </>
  );
}
