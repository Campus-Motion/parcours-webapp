'use client';

import Link from 'next/link';
import MapComponent from '@/components/MapComponent';

export default function TransitPage({ params }) {
  const targetStationId = params.id;

  // Single marker for the target station
  // In a real app, you would fetch the exact coordinates for targetStationId from the DB
  const marker = [{
    latitude: 46.5191 + (Math.sin(targetStationId) * 0.005),
    longitude: 6.5668 + (Math.cos(targetStationId) * 0.005),
    title: `Station ${targetStationId}`,
    color: '#ff3366' // Distinct color for the destination marker
  }];

  return (
    <div className="glass-card" style={{ maxWidth: '800px', width: '100%' }}>
      <h1 className="title" style={{ fontSize: '2rem' }}>Transit</h1>
      <p className="subtitle">
        Follow the route below to reach <strong>Station {targetStationId}</strong>.
      </p>

      {/* Mapbox Map UI */}
      <div 
        style={{ 
          width: '100%', 
          height: '350px', 
          margin: '1.5rem 0',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <MapComponent markers={marker} initialViewState={{
          latitude: marker[0].latitude,
          longitude: marker[0].longitude,
          zoom: 15
        }} />
      </div>

      <p className="subtitle" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        Take your time. Once you physically arrive at the station, you can scan the QR code there or tap the button below.
      </p>

      <Link href={`/station/${targetStationId}`} className="btn" style={{ padding: '1.2rem', width: '100%', textAlign: 'center', display: 'block' }}>
        I've Arrived at Station {targetStationId}
      </Link>
    </div>
  );
}
