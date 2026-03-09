import Shell from "@/components/layout/Shell";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import AbilitiesSection from "@/components/sections/AbilitiesSection";
import CaseFilesSection from "@/components/sections/CaseFilesSection";
import IntelSection from "@/components/sections/IntelSection";
import SocialSection from "@/components/sections/SocialSection";
import DialogueOverlay from "@/components/vn/DialogueOverlay";
import InkWashTransition from "@/components/transitions/InkWashTransition";
import { socialLinks } from "@/data/social";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Akhila Susarla",
  jobTitle: "Data Scientist",
  url: "https://damnseaweedbrain.com",
  sameAs: socialLinks
    .filter((link) => link.platform !== "Email")
    .map((link) => link.url),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DamnSeaweedBrain",
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
        <InkWashTransition triggerSelector="#about" />
        <AboutSection />
        <InkWashTransition triggerSelector="#abilities" />
        <AbilitiesSection />
        <InkWashTransition triggerSelector="#case-files" />
        <CaseFilesSection />
        <InkWashTransition triggerSelector="#intel" />
        <IntelSection />
        <InkWashTransition triggerSelector="#social" />
        <SocialSection />
        {/* Single fixed VN overlay -- scroll triggers activate dialogues */}
        <DialogueOverlay />
      </Shell>
    </>
  );
}
