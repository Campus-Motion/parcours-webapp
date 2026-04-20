import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { recordScan } from '@/lib/db';

export async function POST(request) {
  try {
    const cookieStore = cookies();
    let userId = cookieStore.get('userId')?.value;
    let isNewSession = false;
    
    if (!userId) {
      userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      // Next JS allows setting cookies in Server Actions and Route Handlers
      cookieStore.set('userId', userId, { maxAge: 60 * 60 * 24 }); // 1 day session
      isNewSession = true;
    }

    const { stationId } = await request.json();
    
    if (stationId) {
      recordScan(userId, stationId);
    }
    
    return NextResponse.json({ success: true, userId, isNewSession });
  } catch (error) {
    console.error('Error tracking scan:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
