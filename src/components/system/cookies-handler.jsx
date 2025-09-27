'use server'
 
import { cookies } from 'next/headers'
 
export async function CookiesHandler({ token }) {
  // Get cookie
  const cookieStore = await cookies();
 
  // Set cookie
  cookieStore.set('token', token, { path: '/' }, { httpOnly: true, secure: process.env.NODE_ENV !== 'development', sameSite: 'strict', maxAge: 60 * 60 * 24 });
}