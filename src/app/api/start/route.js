import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();
  let userId = cookieStore.get('userId')?.value;
  
  if (!userId) {
    userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    cookieStore.set('userId', userId, { maxAge: 60 * 60 * 24 }); // 1 day session
  }

  return NextResponse.json({ success: true });
}
