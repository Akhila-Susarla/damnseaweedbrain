/**
 * One-time dev script: Parse resume .docx and output raw text.
 * Usage: npx tsx scripts/parse-resume.ts
 */
import mammoth from 'mammoth';
import { readFileSync } from 'fs';
import { join } from 'path';

async function main() {
  const resumePath = join(process.cwd(), 'resources', 'AkhilaSusarlaResume DS GHC.docx');
  const buffer = readFileSync(resumePath);
  const result = await mammoth.extractRawText({ buffer });
  console.log(result.value);
}

main().catch(console.error);
