import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      ownerName,
      phone,
      cnic,
      companyName,
      fleetSize,
      vehicleTypes,
      city,
      payoutNumber,
    } = body

    if (!ownerName || !phone || !cnic || !fleetSize || !city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const application = {
      id: `RF-FLEET-${randomUUID().slice(0, 8).toUpperCase()}`,
      ownerName,
      phone,
      cnic,
      companyName: companyName || null,
      fleetSize: parseInt(fleetSize),
      vehicleTypes,
      city,
      payoutNumber,
      status: 'pending_review',
      submittedAt: new Date().toISOString(),
    }

    // TODO: persist to database
    console.log('Fleet application received:', application)

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      message: `Fleet application received. Our team will contact you within 24 hours.`,
      estimatedOnboarding: '3–5 business days',
    })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}