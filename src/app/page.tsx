import Shell from "@/components/layout/Shell";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import AbilitiesSection from "@/components/sections/AbilitiesSection";
import CaseFilesSection from "@/components/sections/CaseFilesSection";
import IntelSection from "@/components/sections/IntelSection";
import SocialSection from "@/components/sections/SocialSection";

export default function Home() {
  return (
    <Shell>
      <HeroSection />
      <AboutSection />
      <AbilitiesSection />
      <CaseFilesSection />
      <IntelSection />
      <SocialSection />
    </Shell>
  );
}
