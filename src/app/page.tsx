import Shell from "@/components/layout/Shell";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import AbilitiesSection from "@/components/sections/AbilitiesSection";
import CaseFilesSection from "@/components/sections/CaseFilesSection";
import IntelSection from "@/components/sections/IntelSection";
import SocialSection from "@/components/sections/SocialSection";
import SectionDialogueSlot from "@/components/vn/SectionDialogueSlot";
import InkWashTransition from "@/components/transitions/InkWashTransition";

export default function Home() {
  return (
    <Shell>
      <HeroSection />
      <InkWashTransition triggerSelector="#about" />
      <SectionDialogueSlot sectionId="about" />
      <AboutSection />
      <InkWashTransition triggerSelector="#abilities" />
      <SectionDialogueSlot sectionId="abilities" />
      <AbilitiesSection />
      <InkWashTransition triggerSelector="#case-files" />
      <SectionDialogueSlot sectionId="case-files" />
      <CaseFilesSection />
      <InkWashTransition triggerSelector="#intel" />
      <SectionDialogueSlot sectionId="intel" />
      <IntelSection />
      <InkWashTransition triggerSelector="#social" />
      <SectionDialogueSlot sectionId="social" />
      <SocialSection />
    </Shell>
  );
}
