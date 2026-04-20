'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { getExerciseForStation } from '@/lib/exercises';

export default function StationPage({ params }) {
  const stationId = params.id;
  const [status, setStatus] = useState('loading');
  const [exercise, setExercise] = useState('');
  const nextStationId = `${(Number(stationId) + 1)% 7}`;
  const hasFetched = useRef(false);
  
  useEffect(() => {
    setExercise(getExerciseForStation(stationId));

    if (hasFetched.current) return;
    hasFetched.current = true;

    // Submit scan to backend
    fetch('/api/station', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stationId }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      })
      .catch((err) => {
        console.error(err);
        setStatus('error');
      });
  }, [stationId]);

  if (status === 'loading') {
    return (
      <div className="glass-card" style={{ alignItems: 'center' }}>
        <p className="subtitle">Connecting to station...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="glass-card" style={{ alignItems: 'center' }}>
        <p className="subtitle" style={{ color: '#ef4444' }}>Failed to record scan. Please try again.</p>
        <button onClick={() => window.location.reload()} className="btn">Retry Scan</button>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <h1 className="title">Station {stationId}</h1>
      <div className="stat-row" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <span className="stat-label">Exercise</span>
        <span className="stat-value">{exercise}</span>
      </div>
      <p className="subtitle" style={{ color: 'var(--accent-green)' }}>
        Check-in recorded! Good luck with the exercise.
      </p>
      
      <Link href="/summary" className="btn btn-secondary" style={{ marginTop: '1rem' }}>
        View Summary & End Session
      </Link>
      <Link href={nextStationId} className="btn" style={{ marginTop: '0.5rem' }}>
        Go to the Next Station
      </Link>
    </div>
  );
}
