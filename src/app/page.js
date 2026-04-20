import Link from 'next/link';

export default function Home() {
  return (
    <div className="glass-card">
      <h1 className="title">Campus Motion</h1>
      <p className="subtitle">
        Welcome to the connected sport course. Scan a QR code at any station to begin your session.
      </p>
      
      <Link href="/station/1" className="btn">
        Simulate Scan (Station 1)
      </Link>
    </div>
  );
}
