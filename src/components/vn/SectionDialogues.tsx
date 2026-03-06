'use client';

import SectionDialogue from './SectionDialogue';
import aboutTransition from '@/data/dialogue/about-transition.json';
import abilitiesTransition from '@/data/dialogue/abilities-transition.json';
import casefilesTransition from '@/data/dialogue/casefiles-transition.json';
import intelTransition from '@/data/dialogue/intel-transition.json';
import socialTransition from '@/data/dialogue/social-transition.json';
import type { DialogueSequence } from '@/data/types';

const dialogues = [
  { sectionId: 'about', data: aboutTransition as DialogueSequence },
  { sectionId: 'abilities', data: abilitiesTransition as DialogueSequence },
  { sectionId: 'case-files', data: casefilesTransition as DialogueSequence },
  { sectionId: 'intel', data: intelTransition as DialogueSequence },
  { sectionId: 'social', data: socialTransition as DialogueSequence },
] as const;

export default function SectionDialogues() {
  return (
    <>
      {dialogues.map(({ sectionId, data }) => (
        <SectionDialogue
          key={sectionId}
          sectionId={sectionId}
          dialogueData={data}
        />
      ))}
    </>
  );
}
