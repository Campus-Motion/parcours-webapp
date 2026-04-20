'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SummaryPage() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/session')
      .then((res) => res.json())
      .then((data) => {
        setScans(data.scans || []);
        setLoading(false);
      });
  }, []);

  const handleEndSession = async () => {
    await fetch('/api/session', { method: 'DELETE' });
    window.location.href = '/'; // Reset and redirect
  };

  if (loading) {
    return (
      <div className="glass-card">
        <p className="subtitle">Loading your session history...</p>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <h1 className="title">Session Summary</h1>
      <p className="subtitle">
        Here are the stations you have completed:
      </p>

      {scans.length === 0 ? (
        <p className="subtitle" style={{ fontStyle: 'italic', margin: '1rem 0' }}>No stations scanned yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
          {scans.map((scan, i) => (
            <div key={i} className="stat-row">
              <span className="stat-label">Station {scan.stationId}</span>
              <span className="stat-value" style={{ fontSize: '0.9rem' }}>
                {new Date(scan.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={handleEndSession} className="btn" style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}>
          End Session
        </button>
        <Link href="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
