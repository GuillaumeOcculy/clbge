import { draftMode } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  ;(await draftMode()).disable()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const redirectTo = request.headers.get('referer') || baseUrl
  return NextResponse.redirect(new URL(redirectTo))
}
