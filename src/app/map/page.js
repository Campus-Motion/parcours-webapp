'use client';

import Link from 'next/link';
import { exercises } from '@/lib/exercises';

export default function MapPage() {
  const stationIds = Object.keys(exercises);

  return (
    <div className="glass-card" style={{ maxWidth: '800px' }}>
      <h1 className="title" style={{ fontSize: '2rem' }}>Campus Map</h1>
      <p className="subtitle">Choose your next destination on the track.</p>
      
      {/* Placeholder Map UI */}
      <div 
        style={{ 
          width: '100%', 
          height: '250px', 
          background: 'rgba(0,0,0,0.05)', 
          borderRadius: 'var(--radius)', 
          border: '2px dashed var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '1rem 0',
          position: 'relative'
        }}
      >
        <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>[ Interactive Map Placeholder ]</span>
      </div>

      <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1rem' }}>Available Stations</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        {stationIds.map((id) => (
          <Link key={id} href={`/transit/${id}`} className="btn btn-secondary" style={{ padding: '0.8rem', textAlign: 'center' }}>
            Station {id}
          </Link>
        ))}
      </div>

      <Link href="/summary" className="btn btn-secondary" style={{ marginTop: '2rem', background: 'transparent', border: '1px solid var(--text-secondary)' }}>
        Back to Summary
      </Link>
    </div>
  );
}
