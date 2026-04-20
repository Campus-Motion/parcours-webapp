'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const station = searchParams.get('station');
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    await fetch('/api/start', { method: 'POST' });
    if (station) {
      router.push(`/station/${station}`);
    } else {
      router.push('/station/1'); // Default starting point or just stay
    }
  };

  return (
    <div className="glass-card">
      <h1 className="title">Campus Motion</h1>
      
      {station ? (
        <>
          <p className="subtitle">
            You scanned Station {station}. Are you ready to begin your sport course session?
          </p>
          <button onClick={handleStart} disabled={loading} className="btn">
            {loading ? 'Starting...' : `Start Track & Check in to Station ${station}`}
          </button>
        </>
      ) : (
        <>
          <p className="subtitle">
            Welcome to the connected sport course. Start your session below to track your progress.
          </p>
          <button onClick={handleStart} disabled={loading} className="btn">
            {loading ? 'Starting...' : 'Start New Session'}
          </button>
        </>
      )}

      {/* For Dev purposes */}
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p className="stat-label" style={{ textAlign: 'center', fontSize: '0.8rem' }}>Simulation Links (Assumes session active):</p>
        <Link href="/station/1" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Scan Station 1</Link>
        <Link href="/station/2" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Scan Station 2</Link>
        <Link href="/summary" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>View Summary</Link>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="glass-card"><p className="subtitle">Loading...</p></div>}>
      <HomeContent />
    </Suspense>
  );
}
