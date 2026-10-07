import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();
  let userId = cookieStore.get('userId')?.value;
  
  if (!userId) {
    userId = crypto.randomUUID();
    cookieStore.set('userId', userId, {
      maxAge: 60 * 60 * 24, // 1 day session
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }

  return NextResponse.json({ success: true });
}
