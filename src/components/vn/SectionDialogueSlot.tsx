'use client';

import SectionDialogue from './SectionDialogue';
import aboutTransition from '@/data/dialogue/about-transition.json';
import abilitiesTransition from '@/data/dialogue/abilities-transition.json';
import casefilesTransition from '@/data/dialogue/casefiles-transition.json';
import intelTransition from '@/data/dialogue/intel-transition.json';
import socialTransition from '@/data/dialogue/social-transition.json';
import type { DialogueSequence } from '@/data/types';

const dialogueMap: Record<string, DialogueSequence> = {
  about: aboutTransition as DialogueSequence,
  abilities: abilitiesTransition as DialogueSequence,
  'case-files': casefilesTransition as DialogueSequence,
  intel: intelTransition as DialogueSequence,
  social: socialTransition as DialogueSequence,
};

interface SectionDialogueSlotProps {
  sectionId: string;
}

export default function SectionDialogueSlot({ sectionId }: SectionDialogueSlotProps) {
  const data = dialogueMap[sectionId];
  if (!data) return null;

  return (
    <SectionDialogue
      sectionId={sectionId}
      dialogueData={data}
    />
  );
}
