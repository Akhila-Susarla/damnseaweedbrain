import Shell from "@/components/layout/Shell";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import AbilitiesSection from "@/components/sections/AbilitiesSection";
import CaseFilesSection from "@/components/sections/CaseFilesSection";
import IntelSection from "@/components/sections/IntelSection";
import SocialSection from "@/components/sections/SocialSection";
import DialogueOverlay from "@/components/vn/DialogueOverlay";
import InkWashTransition from "@/components/transitions/InkWashTransition";

export default function Home() {
  return (
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
      {/* Single fixed VN overlay — scroll triggers activate dialogues */}
      <DialogueOverlay />
    </Shell>
  );
}
