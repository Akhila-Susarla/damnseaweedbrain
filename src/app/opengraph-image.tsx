import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Akhila Susarla - AI/ML Engineer Portfolio';
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
          background: 'linear-gradient(135deg, #0c0c0c 0%, #161616 100%)',
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
            background: '#f3701e',
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
            background: '#f3701e',
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
            borderTop: '2px solid #f3701e',
            borderLeft: '2px solid #f3701e',
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
            borderTop: '2px solid #f3701e',
            borderRight: '2px solid #f3701e',
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
            borderBottom: '2px solid #f3701e',
            borderLeft: '2px solid #f3701e',
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
            borderBottom: '2px solid #f3701e',
            borderRight: '2px solid #f3701e',
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
              color: '#e8d8c9',
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
              background: '#f3701e',
              marginBottom: '24px',
            }}
          />

          <div
            style={{
              display: 'flex',
              fontSize: '32px',
              color: '#f3701e',
              fontFamily: 'Inter',
              letterSpacing: '2px',
            }}
          >
            AI/ML Engineer | Data Scientist
          </div>
        </div>

        {/* Site URL */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '30px',
            fontSize: '18px',
            color: '#e8d8c9',
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
