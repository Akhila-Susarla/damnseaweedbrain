import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// Read layout.tsx source directly to test metadata configuration
// (importing layout.tsx triggers PostCSS/Tailwind processing of globals.css which fails in vitest)
const layoutSource = fs.readFileSync(
  path.resolve(__dirname, '../app/layout.tsx'),
  'utf-8'
);

describe('Layout metadata', () => {
  it('has metadataBase with damnseaweedbrain.com URL', () => {
    expect(layoutSource).toContain('metadataBase');
    expect(layoutSource).toContain('damnseaweedbrain.com');
  });

  it('has title containing Akhila Susarla and Data Scientist', () => {
    // Match the title field value
    expect(layoutSource).toMatch(/title.*Akhila Susarla/);
    expect(layoutSource).toMatch(/title.*Data Scientist/);
  });

  it('has description mentioning Data Scientist', () => {
    expect(layoutSource).toMatch(/description[\s\S]*?Data Scientist/);
  });

  it('has openGraph with type website and url', () => {
    expect(layoutSource).toContain('openGraph');
    expect(layoutSource).toMatch(/type.*website/);
    expect(layoutSource).toMatch(/url.*['"]\//);
  });

  it('has twitter card summary_large_image', () => {
    expect(layoutSource).toContain('twitter');
    expect(layoutSource).toContain('summary_large_image');
  });

  it('has canonical alternates', () => {
    expect(layoutSource).toContain('alternates');
    expect(layoutSource).toMatch(/canonical.*['"]\//);
  });

  it('has keywords array', () => {
    expect(layoutSource).toContain('keywords');
    expect(layoutSource).toContain('Data Scientist');
  });

  it('has authors with Akhila Susarla', () => {
    expect(layoutSource).toContain('authors');
    expect(layoutSource).toContain('Akhila Susarla');
  });
});
