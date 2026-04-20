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
    <div className="main-page"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '2rem' }}>
      <img src="/assets/images/logo_rouge.png" width="75%" alt="Logo" />

    <div className="glass-card">
    
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
            Welcome to Campus Motion's connected sport course. Our goal is to make you move and have fun while doing it !
            <br /> <br />
            This website is designed to guide you through our physical track, where you can check in at each station to get a personalized exercise.
            <br /><br />
            To begin the course, start a session.
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
