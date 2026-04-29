'use client';

import Link from 'next/link';

export default function TransitPage({ params }) {
  const targetStationId = params.id;

  return (
    <div className="glass-card">
      <h1 className="title" style={{ fontSize: '2rem' }}>Transit</h1>
      <p className="subtitle">
        Follow the route below to reach <strong>Station {targetStationId}</strong>.
      </p>

      {/* Transit Map Placeholder UI */}
      <div 
        style={{ 
          width: '100%', 
          height: '300px', 
          background: 'rgba(34, 197, 94, 0.1)', 
          borderRadius: 'var(--radius)', 
          border: '2px dashed var(--accent-green)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '1.5rem 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          width: '100%', height: '4px', background: 'var(--accent-green)', position: 'absolute', opacity: 0.3, top: '50%', transform: 'rotate(25deg)'
        }} />
        <span style={{ color: 'var(--accent-green)', fontWeight: 600, zIndex: 1, backgroundColor: 'rgba(255,255,255,0.8)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
          [ GPS Route Placeholder ]
        </span>
      </div>

      <p className="subtitle" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        Take your time. Once you physically arrive at the station, you can scan the QR code there or tap the button below.
      </p>

      <Link href={`/station/${targetStationId}`} className="btn" style={{ padding: '1.2rem' }}>
        I am at the station
      </Link>

      <Link href="/map" className="btn btn-secondary" style={{ marginTop: '0.5rem' }}>
        Cancel / Choose Different Station
      </Link>
    </div>
  );
}
