'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, ChevronDown, Search, TrendingUp, Car, Shield, Clock } from 'lucide-react'

const benefits = [
  {
    icon: '📈',
    title: 'Maximise fleet revenue',
    desc: 'Keep your vehicles earning around the clock. Our dispatch system fills idle time automatically.',
  },
  {
    icon: '🚗',
    title: 'Manage all vehicles in one place',
    desc: 'Track every vehicle in real time, view trip history, and monitor driver performance from a single dashboard.',
  },
  {
    icon: '💳',
    title: 'Weekly payouts per vehicle',
    desc: 'Earnings for every vehicle land in your account weekly — broken down trip by trip, driver by driver.',
  },
]

const steps = [
  {
    num: '1',
    title: 'Register your fleet',
    desc: 'Tell us your city, fleet size, and CNIC. We will send you next steps within 24 hours.',
  },
  {
    num: '2',
    title: 'Upload documents & verify',
    desc: 'Submit ownership and vehicle documents. Every driver assigned is NADRA-verified before going live.',
  },
  {
    num: '3',
    title: 'Go live and earn',
    desc: 'Assign drivers to your vehicles and start receiving weekly, trip-by-trip payouts.',
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
  {
    q: 'What if I have 20+ vehicles?',
    a: 'Large fleets get access to our enterprise team, custom commission rates, and a dedicated account manager.',
  },
]

const cities = ['Rawalpindi', 'Islamabad', 'Lahore', 'Karachi', 'Faisalabad']

interface FormState {
  email: string
  phone: string

  fleetSize: string
  agree: boolean
}

export default function FleetSection() {
  const [form, setForm] = useState<FormState>({
    email: '',
    phone: '',
    fleetSize: '',
    agree: false,
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [cityOpen, setCityOpen] = useState(false)
  const [citySearch, setCitySearch] = useState('')

  function update(field: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError('')
  }

  async function handleSubmit() {
    setError('')
    if (!form.email || !form.phone || !form.fleetSize ) {
      setError('Please fill in all required fields.')
      return
    }
    if (!form.agree) {
      setError('Please agree to the Terms of Service and Privacy Policy.')
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
    background: '#F0F0F0',
    border: 'none',
    borderRadius: '10px',
    padding: '0.95rem 1rem',
    color: '#111',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'var(--font-inter), sans-serif',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 500,
    color: '#333',
    marginBottom: '0.5rem',
  }

  const filteredCities = cities.filter((c) =>
    c.toLowerCase().includes(citySearch.toLowerCase())
  )

  // ── Success screen ──
  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{
            width: '80px', height: '80px',
            background: 'rgba(43,134,89,0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            <CheckCircle size={40} color="#2B8659" />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '2rem',
            fontWeight: 800,
            color: '#0A0A0A',
            marginBottom: '0.75rem',
          }}>
            Application Received!
          </h1>
          <p style={{ color: '#666', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Our fleet team will review your application and contact you within 24 hours with next steps.
          </p>
          <div style={{
            background: '#F7FFF9',
            border: '1px solid #C5E8D4',
            borderRadius: '12px',
            padding: '1rem 1.5rem',
            marginBottom: '2rem',
          }}>
            <div style={{ fontSize: '0.72rem', color: '#888', marginBottom: '0.25rem' }}>Application ID</div>
            <div style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: '#2B8659',
              letterSpacing: '1px',
            }}>
              {success}
            </div>
          </div>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#0A0A0A',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.92rem',
            padding: '0.85rem 2rem',
            borderRadius: '50px',
            textDecoration: 'none',
          }}>
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font-inter), sans-serif' }}>

      {/* ── HERO ── */}
      <section style={{
        background: '#0A0A0A',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        padding: '120px 5vw 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div
                  className="absolute inset-0 will-change-transform"
                  style={{
                    transform: 'scale(1)',
                    transformOrigin: 'center center',
                  }}
                >
                  <Image
                    src="/images/car-park.jpg"
                    alt="RideFlow driver"
                    fill
                    priority
                    className="hero-driver-img"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  /></div>

        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: '4rem',
          alignItems: 'center',
        }}
          className="fleet-hero-grid"
        >
          {/* Left */}
          <div>
            <h1 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-2px',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
            }}>
              Put your fleet to work<br />
              <span style={{ color: '#2B8659' }}>with RideFlow.</span>
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#fff',
              lineHeight: 1.75,
              maxWidth: '480px',
              marginBottom: '2.5rem',
            }}>
              Own 2 vehicles or 200 — register your fleet, assign verified drivers, and start earning. One dashboard. Weekly payouts. Zero headache.
            </p>

            
          </div>

          {/* Right: Bolt-style inline registration card */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '1.6rem',
              fontWeight: 800,
              color: '#0A0A0A',
              marginBottom: '1.5rem',
              letterSpacing: '-0.5px',
            }}>
              Become a fleet owner
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

              {/* Email */}
              <div>
                <label style={labelStyle}>Email address</label>
                <input
                  type="email" value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="Enter email address"
                  style={inputStyle}
                />
              </div>

             {/* Phone with country code */}
              <div>
                <label style={labelStyle}>Phone number</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#F0F0F0',
                    borderRadius: '10px',
                    padding: '0 0.85rem',
                    minWidth: '92px',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#111', marginBottom: '-3px' }}>+92</span>
                  </div>
                  <input
                    type="tel" value={form.phone}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 11)
                      update('phone', digitsOnly)
                    }}
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
                      ) {
                        e.preventDefault()
                      }
                    }}
                    inputMode="numeric"
                    maxLength={11}
                    placeholder="Enter a phone number"
                    style={{ ...inputStyle, flex: 1, minWidth: 0 }}
                  />
                </div>
              </div>

              {/* Fleet size */}
              <div>
                <label style={labelStyle}>Number of vehicles</label>
                <input
                  type="number" value={form.fleetSize}
                  onChange={(e) => update('fleetSize', e.target.value)}
                  placeholder="e.g. 5"
                  min="2"
                  style={inputStyle}
                />
              </div>

          


              {/* Terms checkbox */}
              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.65rem',
                cursor: 'pointer',
                marginTop: '0.25rem',
              }}>
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => update('agree', e.target.checked)}
                  style={{
                    marginTop: '0.2rem',
                    width: '16px',
                    height: '16px',
                    accentColor: '#2B8659',
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.6 }}>
                  By registering, you agree to our{' '}
                  <a href="#" style={{ color: '#2B8659', fontWeight: 600, textDecoration: 'none' }}>Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" style={{ color: '#2B8659', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</a>,
                  commit to comply with obligations under applicable law, and provide only legal
                  services and content on the RideFlow Platform.
                </span>
              </label>

              {error && (
                <p style={{ fontSize: '0.82rem', color: '#e53e3e', padding: '0.6rem 0.8rem', background: '#FFF5F5', borderRadius: '8px', border: '1px solid #FED7D7' }}>
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading ? '#ccc' : '#2B8659',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginTop: '0.25rem',
                }}
              >
                {loading ? 'Submitting...' : 'Register as a fleet owner'}
              </button>

              <p style={{ textAlign: 'center' as const, fontSize: '0.85rem', color: '#555' }}>
                Already have an account?{' '}
                <a href="#" style={{ color: '#2B8659', fontWeight: 700, textDecoration: 'none' }}>
                  Log in ↗
                </a>
              </p>

              <p style={{ textAlign: 'center' as const, fontSize: '0.82rem', color: '#777' }}>
                Have a single vehicle?{' '}
                <a href="#" style={{ color: '#2B8659', fontWeight: 700, textDecoration: 'none' }}>
                  Register as a driver.
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY RIDEFLOW FOR FLEETS ── */}
      <section style={{
        padding: '100px 5vw',
        background: '#fff',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
          <h2 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#0A0A0A',
            letterSpacing: '-1px',
            marginBottom: '4rem',
            maxWidth: '600px',
            lineHeight: 1.1,
          }}>
            Why run your fleet on RideFlow?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
          }}
            className="fleet-benefits-grid"
          >
            {benefits.map((b, i) => (
              <div key={i}>
                <div style={{
                  width: '100%',
                  aspectRatio: '350 / 240',
                  background: '#EFF3F0',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'clamp(1.5rem, 5vw, 3rem)',
                  fontSize: 'clamp(4rem, 18vw, 9rem)',
                  overflow: 'hidden',
                }}>
                  {b.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#0A0A0A',
                  marginBottom: '0.6rem',
                }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#888', lineHeight: 1.7 }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{
        padding: '130px 5vw',
        background: '#F9F9F9',
        borderTop: '1px solid #EFEFEF',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <h2 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#0A0A0A',
            letterSpacing: '-1px',
            marginBottom: '0.75rem',
            lineHeight: 1.1,
          }}>
            Get your fleet earning in 3 steps.
          </h2>
          <p style={{ color: '#666', fontSize: '1rem', marginBottom: '4rem', maxWidth: '480px', lineHeight: 1.7 }}>
            From 2 vehicles to 200 — registering your fleet with RideFlow is quick and straightforward.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
          }}
            className="fleet-steps-grid"
          >
            {steps.map((step) => (
              <div
                key={step.num}
                style={{
                  background: '#fff',
                  border: '1px solid #EFEFEF',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(43,134,89,0.08)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  width: '42px', height: '42px',
                  background: '#2B8659',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: '#fff',
                  marginBottom: '1.25rem',
                }}>
                  {step.num}
                </div>
                <p style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#2B8659',
                  letterSpacing: '1px',
                  textTransform: 'uppercase' as const,
                  marginBottom: '0.5rem',
                }}>
                  Step {step.num}
                </p>
                <h3 style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: '#0A0A0A',
                  marginBottom: '0.6rem',
                }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

   

      {/* ── FAQ ── */}
      <section style={{
        padding: '190px 5vw',
        background: '#fff',
        borderTop: '1px solid #EFEFEF',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'start',
        }}
          className="fleet-faq-grid"
        >
          <div>
           
            <h2 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              color: '#0A0A0A',
              letterSpacing: '-0.8px',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}>
              Common questions from fleet owners.
            </h2>
            <p style={{ color: '#555', fontSize: '1.2rem', lineHeight: 1.7 }}>
              Can&apos;t find your answer? Contact our fleet support team directly.
            </p>
            <a
              href="mailto:fleet@rideflow.pk"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#0A0A0A',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.88rem',
                padding: '0.8rem 1.75rem',
                borderRadius: '50px',
                textDecoration: 'none',
                marginTop: '1.5rem',
              }}
            >
              Contact Fleet Team →
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  border: `1px solid ${openFaq === i ? '#2B8659' : '#EFEFEF'}`,
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
                    background: openFaq === i ? '#F7FFF9' : '#fff',
                    border: 'none',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left' as const,
                    transition: 'background 0.2s',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontWeight: 600,
                    fontSize: '1.2rem',
                    color: '#0A0A0A',
                    paddingRight: '1rem',
                  }}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={17}
                    color="#2B8659"
                    style={{
                      transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      flexShrink: 0,
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div style={{
                    padding: '0 1.25rem 1rem',
                    fontSize: '0.87rem',
                    color: '#555',
                    lineHeight: 1.75,
                    background: '#F7FFF9',
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{
        padding: '100px 5vw',
        background: '#0A0A0A',
        textAlign: 'center' as const,
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-1px',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            Have a large fleet?
          </h2>
          <p style={{ color: '#999', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem' }}>
            For fleets of 20+ vehicles, contact our enterprise team for custom rates and a dedicated account manager.
          </p>
          <a
            href="mailto:fleet@rideflow.pk"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#2B8659',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
            Contact Fleet Team →
          </a>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 900px) {
          .fleet-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .fleet-benefits-grid {
            grid-template-columns: 1fr !important;
          }
          .fleet-steps-grid {
            grid-template-columns: 1fr !important;
          }
          .fleet-stats-strip {
            grid-template-columns: 1fr 1fr !important;
          }
          .fleet-faq-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .fleet-stats-strip {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}