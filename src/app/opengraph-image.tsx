import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Akhila Susarla - Data Scientist Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  const playfairData = await readFile(
    join(process.cwd(), 'assets/fonts/PlayfairDisplay-Bold.ttf')
  );
  const interData = await readFile(
    join(process.cwd(), 'assets/fonts/Inter-Regular.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0a0e1a 0%, #111827 100%)',
          fontFamily: 'Inter',
        }}
      >
        {/* Top gold accent line */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#d4af37',
          }}
        />

        {/* Bottom gold accent line */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#d4af37',
          }}
        />

        {/* Gold corner accents */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: '20px',
            left: '20px',
            width: '60px',
            height: '60px',
            borderTop: '2px solid #d4af37',
            borderLeft: '2px solid #d4af37',
          }}
        />
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderTop: '2px solid #d4af37',
            borderRight: '2px solid #d4af37',
          }}
        />
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            width: '60px',
            height: '60px',
            borderBottom: '2px solid #d4af37',
            borderLeft: '2px solid #d4af37',
          }}
        />
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderBottom: '2px solid #d4af37',
            borderRight: '2px solid #d4af37',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '72px',
              fontFamily: 'Playfair Display',
              color: '#e8e0d4',
              marginBottom: '16px',
              letterSpacing: '-1px',
            }}
          >
            Akhila Susarla
          </div>

          {/* Gold separator */}
          <div
            style={{
              display: 'flex',
              width: '200px',
              height: '2px',
              background: '#d4af37',
              marginBottom: '24px',
            }}
          />

          <div
            style={{
              display: 'flex',
              fontSize: '32px',
              color: '#d4af37',
              fontFamily: 'Inter',
              letterSpacing: '2px',
            }}
          >
            Data Scientist | Armed Detective Agency
          </div>
        </div>

        {/* Site URL */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '30px',
            fontSize: '18px',
            color: '#e8e0d4',
            opacity: 0.6,
            fontFamily: 'Inter',
          }}
        >
          damnseaweedbrain.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Playfair Display',
          data: playfairData,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Inter',
          data: interData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
