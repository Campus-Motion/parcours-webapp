'use client';

import { useState } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapComponent({ 
  markers = [], 
  initialViewState = {
    longitude: 6.5668, // Default longitude (e.g., EPFL campus)
    latitude: 46.5191, // Default latitude
    zoom: 14
  },
  height = '100%',
  width = '100%'
}) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!mapboxToken) {
    return (
      <div style={{ 
        width, height, display: 'flex', alignItems: 'center', justifyContent: 'center', 
        background: 'rgba(255,50,50,0.1)', color: '#ff4444', borderRadius: 'var(--radius)', 
        padding: '1rem', textAlign: 'center', border: '1px solid #ff4444'
      }}>
        Mapbox Token is missing.<br/>Please add NEXT_PUBLIC_MAPBOX_TOKEN to your .env.local file.
      </div>
    );
  }

  return (
    <div style={{ width, height, borderRadius: 'var(--radius)', overflow: 'hidden', position: 'relative' }}>
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/dark-v11" // Premium dark mode map
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="bottom-right" />
        
        {markers.map((marker, index) => (
          <Marker 
            key={index} 
            longitude={marker.longitude} 
            latitude={marker.latitude} 
            anchor="bottom"
          >
            <div style={{
              background: marker.color || 'var(--accent-green)',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '3px solid white',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              cursor: 'pointer'
            }} title={marker.title} />
          </Marker>
        ))}
      </Map>
    </div>
  );
}
