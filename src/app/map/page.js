'use client';

import Link from 'next/link';
import { exercises } from '@/lib/exercises';
import MapComponent from '@/components/MapComponent';

export default function MapPage() {
  const stationIds = Object.keys(exercises);
  
  // Create some dummy markers for the stations. 
  // In a real app, these coordinates would come from the database.
  // For now, we spread them slightly around a central point (EPFL).
  const baseLat = 46.5191;
  const baseLng = 6.5668;
  const markers = stationIds.map((id, index) => ({
    latitude: baseLat + (Math.sin(index) * 0.005),
    longitude: baseLng + (Math.cos(index) * 0.005),
    title: `Station ${id}`,
    id
  }));

  return (
    <div className="glass-card" style={{ maxWidth: '800px', width: '100%' }}>
      <h1 className="title" style={{ fontSize: '2rem' }}>Campus Map</h1>
      <p className="subtitle">Choose your next destination on the track.</p>
      
      {/* Mapbox Map UI */}
      <div 
        style={{ 
          width: '100%', 
          height: '400px', 
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <MapComponent markers={markers} />
      </div>

      <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1rem', color: 'var(--text-primary)' }}>Available Stations</h2>
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
