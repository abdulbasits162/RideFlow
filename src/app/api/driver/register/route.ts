import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  // TODO: call NADRA API + send to PostgreSQL
  console.log('Driver application received:', body.fullName, body.cnic)
  return NextResponse.json({
    success: true,
    message: 'Application received. We will review your documents within 24 hours.',
    applicationId: `RF-${Date.now()}`,
  })
}