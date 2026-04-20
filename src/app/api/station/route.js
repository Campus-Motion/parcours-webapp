import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { recordScan } from '@/lib/db';

export async function POST(request) {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('userId')?.value;
    
    if (!userId) {
      return NextResponse.json({ success: false, error: 'No active session' }, { status: 401 });
    }

    const { stationId } = await request.json();
    
    if (stationId) {
      recordScan(userId, stationId);
    }
    
    return NextResponse.json({ success: true, userId });
  } catch (error) {
    console.error('Error tracking scan:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
