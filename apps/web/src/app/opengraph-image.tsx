import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';
export const alt = 'Marco Rye S. Dela Serna | Portfolio';

const PILLS = ['Next.js', 'Supabase', 'ESP32', 'Onshape', 'Flashforge Creator 3'] as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#09090b',
          color: '#fafafa',
          padding: '44px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid #27272a',
            backgroundColor: '#111113',
            padding: '52px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                border: '1px solid #27272a',
                backgroundColor: '#09090b',
                padding: '10px 18px',
                fontSize: '18px',
                letterSpacing: '0.16em',
                color: '#38bdf8',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              }}
            >
              <span>MARCO // DEV · PALAWAN STATE UNIVERSITY</span>
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: '16px',
                letterSpacing: '0.18em',
                color: '#a1a1aa',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              }}
            >
              <span>PORTFOLIO 2026</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: '68px',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                color: '#fafafa',
              }}
            >
              <span>Marco Rye S. Dela Serna</span>
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: '28px',
                lineHeight: 1.4,
                color: '#a1a1aa',
              }}
            >
              <span>Full-Stack Web Systems · ESP32 IoT Hardware · Onshape 3D CAD</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              paddingTop: '12px',
              borderTop: '1px solid #27272a',
            }}
          >
            {PILLS.map((pill) => (
              <div
                key={pill}
                style={{
                  display: 'flex',
                  border: '1px solid #27272a',
                  backgroundColor: '#09090b',
                  padding: '10px 18px',
                  fontSize: '18px',
                  color: '#d4d4d8',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                }}
              >
                <span>{pill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
