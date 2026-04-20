import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getScansByUser, clearUserSession } from '@/lib/db';

export async function GET() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value;
  
  if (!userId) {
    return NextResponse.json({ scans: [] });
  }

  const scans = getScansByUser(userId);
  return NextResponse.json({ scans });
}

export async function DELETE() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value;
  
  if (userId) {
    clearUserSession(userId);
    cookieStore.delete('userId');
  }
  
  return NextResponse.json({ success: true });
}
