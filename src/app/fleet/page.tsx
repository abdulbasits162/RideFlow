'use client'

import { useState } from 'react'
import { Car, TrendingUp, Shield, Clock, ChevronDown } from 'lucide-react'

const benefits = [
  {
    icon: <TrendingUp size={22} color="#1DB954" />,
    title: 'Maximise Fleet Revenue',
    desc: 'Keep your vehicles earning around the clock. Our dispatch system fills idle time automatically.',
  },
  {
    icon: <Car size={22} color="#1DB954" />,
    title: 'Manage All Vehicles in One Place',
    desc: 'Track every vehicle in real time, view trip history, and monitor driver performance from a single dashboard.',
  },
  {
    icon: <TrendingUp size={22} color="#1DB954" />,
    title: 'Weekly Payouts Per Vehicle',
    desc: 'Earnings for every vehicle land in your account weekly — broken down trip by trip, driver by driver.',
  },
  {
    icon: <Shield size={22} color="#1DB954" />,
    title: 'Verified Drivers Only',
    desc: 'Every driver assigned to your fleet is NADRA-verified. You approve drivers before they touch your vehicles.',
  },
  {
    icon: <Clock size={22} color="#1DB954" />,
    title: 'Onboarding in 3–5 Days',
    desc: 'Submit your fleet documents, get verified, and go live. Our team handles the setup end to end.',
  },
  {
    icon: <Car size={22} color="#1DB954" />,
    title: 'Lowest Commission on Fleet',
    desc: 'Fleet owners get preferential commission rates. The more vehicles, the better your rate.',
  },
]

const faqs = [
  {
    q: 'What is the minimum fleet size?',
    a: 'You can register as few as 2 vehicles. There is no upper limit — we work with fleets of 2 to 200+.',
  },
  {
    q: 'Can I use my own drivers?',
    a: 'Yes. You can bring your existing drivers — they just need to pass our NADRA verification and a short onboarding process.',
  },
  {
    q: 'How are payouts calculated?',
    a: 'Each vehicle\'s earnings are tracked separately. After platform commission, your net earnings are transferred to your account every Sunday.',
  },
  {
    q: 'What vehicle types are accepted?',
    a: 'Sedans, SUVs, and vans are accepted. All vehicles must be 2015 or newer and pass a roadworthiness check.',
  },
]

type VehicleType = 'sedan' | 'suv' | 'van'

interface FormState {
  ownerName: string
  phone: string
  cnic: string
  companyName: string
  fleetSize: string
  vehicleTypes: VehicleType[]
  city: string
  payoutNumber: string
}

export default function FleetSection() {
  const [form, setForm] = useState<FormState>({
    ownerName: '',
    phone: '',
    cnic: '',
    companyName: '',
    fleetSize: '',
    vehicleTypes: [],
    city: 'Rawalpindi',
    payoutNumber: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function toggleVehicleType(type: VehicleType) {
    setForm((prev) => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.includes(type)
        ? prev.vehicleTypes.filter((t) => t !== type)
        : [...prev.vehicleTypes, type],
    }))
  }

  async function handleSubmit() {
    setError('')
    if (!form.ownerName || !form.phone || !form.cnic || !form.fleetSize) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/fleet/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setSuccess(data.applicationId)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: '#333',
    border: '1px solid #262626',
    borderRadius: '10px',
    padding: '0.75rem 1rem',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'var(--font-inter), sans-serif',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
    color: '#6B6B6B',
    marginBottom: '0.4rem',
  }

  return (
    <section
      id="fleet"
      style={{
        background: '#ffffff',
        padding: 'clamp(60px, 12vw, 100px) 5vw',
        borderTop: '1px solid #EFEFEF',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(2.5rem, 6vw, 4rem)' }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase' as const,
            color: '#1DB954',
            display: 'block',
            marginBottom: '1rem',
          }}>
            For Fleet Owners
          </span>
          <h2 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(1.7rem, 5vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-1px',
            lineHeight: 1.1,
            color: '#0A0A0A',
            marginBottom: '1rem',
            maxWidth: '600px',
          }}>
            Put your entire fleet to work with RideFlow.
          </h2>
          <p style={{
            fontSize: 'clamp(0.88rem, 2vw, 1rem)',
            color: '#777',
            lineHeight: 1.75,
            maxWidth: '520px',
          }}>
            Whether you own 2 vehicles or 200 — register your fleet, assign verified drivers, and start earning. One dashboard. Weekly payouts. Zero headache.
          </p>
        </div>

        {/* Benefits grid */}
        <div
          className="fleet-benefits-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(1rem, 3vw, 1.5rem)',
            marginBottom: 'clamp(3rem, 8vw, 5rem)',
          }}
        >
          {benefits.map((b) => (
            <div
              key={b.title}
              style={{
                background: '#F9F9F9',
                border: '1px solid #EFEFEF',
                borderRadius: '16px',
                padding: 'clamp(1.25rem, 4vw, 1.75rem)',
                transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1DB954'
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(29,185,84,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#EFEFEF'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                width: 'clamp(38px, 6vw, 44px)',
                height: 'clamp(38px, 6vw, 44px)',
                background: 'rgba(29,185,84,0.08)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                {b.icon}
              </div>
              <h4 style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 'clamp(0.95rem, 2vw, 1rem)',
                fontWeight: 700,
                color: '#0A0A0A',
                marginBottom: '0.5rem',
              }}>
                {b.title}
              </h4>
              <p style={{ fontSize: 'clamp(0.8rem, 1.8vw, 0.85rem)', color: '#888', lineHeight: 1.65 }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>



        {/* Form + FAQ grid */}
        <div
          className="fleet-form-faq-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem, 6vw, 4rem)',
            alignItems: 'start',
          }}
        >
          {/* Registration form */}
          <div style={{
            background: '#444',
            borderRadius: '20px',
            padding: 'clamp(1.5rem, 5vw, 2.5rem)',
            border: '1px solid #1a1a1a',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '0.5rem',
            }}>
              Register Your Fleet
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '2rem' }}>
              Takes less than 5 minutes. Our team reviews within 24 hours.
            </p>

            {success ? (
              <div style={{
                background: 'rgba(29,185,84,0.08)',
                border: '1px solid rgba(29,185,84,0.3)',
                borderRadius: '12px',
                padding: 'clamp(1.25rem, 4vw, 2rem)',
                textAlign: 'center' as const,
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
                <h4 style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 700,
                  color: '#1DB954',
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem',
                }}>
                  Application Submitted!
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#777', marginBottom: '0.75rem' }}>
                  Your application ID is:
                </p>
                <div style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: '#1DB954',
                  letterSpacing: '1px',
                  marginBottom: '1rem',
                  wordBreak: 'break-word' as const,
                }}>
                  {success}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#555' }}>
                  Our fleet team will call you within 24 hours.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {/* Row 1 */}
                <div className="fleet-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      value={form.ownerName}
                      onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                      placeholder="Muhammad Ahmed"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#1DB954')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#262626')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="03XX-XXXXXXX"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#1DB954')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#262626')}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="fleet-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={labelStyle}>CNIC *</label>
                    <input
                      type="text"
                      value={form.cnic}
                      onChange={(e) => setForm({ ...form, cnic: e.target.value })}
                      placeholder="XXXXX-XXXXXXX-X"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#1DB954')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#262626')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Company Name</label>
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      placeholder="Optional"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#1DB954')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#262626')}
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="fleet-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={labelStyle}>Number of Vehicles *</label>
                    <input
                      type="number"
                      value={form.fleetSize}
                      onChange={(e) => setForm({ ...form, fleetSize: e.target.value })}
                      placeholder="e.g. 5"
                      min="2"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#1DB954')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#262626')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>City *</label>
                    <select
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Islamabad">Islamabad</option>
                    </select>
                  </div>
                </div>

                {/* Vehicle types */}
                <div>
                  <label style={labelStyle}>Vehicle Types</label>
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' as const }}>
                    {(['sedan', 'suv', 'van'] as VehicleType[]).map((type) => {
                      const active = form.vehicleTypes.includes(type)
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleVehicleType(type)}
                          style={{
                            padding: 'clamp(0.4rem, 1.5vw, 0.5rem) clamp(0.8rem, 2.5vw, 1.1rem)',
                            borderRadius: '50px',
                            border: `1px solid ${active ? '#1DB954' : '#262626'}`,
                            background: active ? 'rgba(29,185,84,0.1)' : 'transparent',
                            color: active ? '#1DB954' : '#666',
                            fontSize: 'clamp(0.75rem, 1.8vw, 0.82rem)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontFamily: 'var(--font-inter), sans-serif',
                            textTransform: 'capitalize' as const,
                          }}
                        >
                          {type === 'sedan' ? '🚗' : type === 'suv' ? '🚙' : '🚐'} {type}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Payout */}
                <div>
                  <label style={labelStyle}>Payout Number (JazzCash / EasyPaisa)</label>
                  <input
                    type="tel"
                    value={form.payoutNumber}
                    onChange={(e) => setForm({ ...form, payoutNumber: e.target.value })}
                    placeholder="03XX-XXXXXXX"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#1DB954')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#262626')}
                  />
                </div>

                {error && (
                  <p style={{ fontSize: '0.82rem', color: '#ff4444' }}>{error}</p>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: loading ? '#1a1a1a' : '#1DB954',
                    color: loading ? '#444' : '#000',
                    border: 'none',
                    borderRadius: '50px',
                    padding: 'clamp(0.85rem, 2.5vw, 1rem)',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    marginTop: '0.5rem',
                  }}
                >
                  {loading ? 'Submitting...' : 'Submit Fleet Application →'}
                </button>

                <p style={{ textAlign: 'center' as const, fontSize: '0.72rem', color: '#444' }}>
                  Your CNIC is verified securely. We never share your data.
                </p>
              </div>
            )}
          </div>

          {/* FAQ */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
              fontWeight: 700,
              color: '#0A0A0A',
              marginBottom: '0.5rem',
            }}>
              Common Questions
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '2rem' }}>
              Everything you need to know about running a fleet on RideFlow.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    border: `1px solid ${openFaq === i ? '#1DB954' : '#EFEFEF'}`,
                    borderRadius: '14px',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%',
                      background: openFaq === i ? '#F9FFF9' : '#fff',
                      border: 'none',
                      padding: 'clamp(0.9rem, 3vw, 1.1rem) clamp(1rem, 3vw, 1.25rem)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      textAlign: 'left' as const,
                      transition: 'background 0.2s',
                      gap: '0.75rem',
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontWeight: 600,
                      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                      color: '#0A0A0A',
                    }}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      color="#1DB954"
                      style={{
                        transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                        flexShrink: 0,
                        marginLeft: '1rem',
                      }}
                    />
                  </button>
                  {openFaq === i && (
                    <div style={{
                      padding: '0 clamp(1rem, 3vw, 1.25rem) 1.1rem',
                      fontSize: 'clamp(0.82rem, 1.8vw, 0.88rem)',
                      color: '#666',
                      lineHeight: 1.7,
                      background: '#F9FFF9',
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div style={{
              marginTop: '2.5rem',
              background: '#444',
              borderRadius: '16px',
              padding: 'clamp(1.25rem, 4vw, 1.75rem)',
            }}>
              <h4 style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#fff',
                marginBottom: '0.5rem',
              }}>
                Have a large fleet?
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1.25rem' }}>
                For fleets of 20+ vehicles, contact our enterprise team for custom rates and a dedicated account manager.
              </p>
              <a
                href="mailto:fleet@rideflow.pk"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#1DB954',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  padding: '0.7rem 1.5rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                }}
              >
                Contact Fleet Team →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .fleet-benefits-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .fleet-form-faq-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .fleet-benefits-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .fleet-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}