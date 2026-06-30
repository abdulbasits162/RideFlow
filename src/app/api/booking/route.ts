import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  const body = await req.json()
  // TODO: persist to PostgreSQL once backend is ready
  // For now, return a mock booking confirmation
  const booking = {
    id: randomUUID(),
    ...body,
    status: 'pending',
    createdAt: new Date().toISOString(),
    estimatedMatchTime: '90 seconds',
  }
  return NextResponse.json({ success: true, booking })
}