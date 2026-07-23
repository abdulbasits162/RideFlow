'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ChevronDown, Search } from 'lucide-react'

const faqs = [
  {
    q: 'Can I drive with RideFlow in my city?',
    a: 'Currently RideFlow operates in Rawalpindi and Islamabad. If you are based in either city, you can apply right now. We are expanding to Lahore, Faisalabad, and more cities in 2027.',
  },
  {
    q: 'How do I start driving with RideFlow?',
    a: 'Complete the registration form below, submit your required documents, and our team will verify your identity and vehicle. You will be approved within 24 hours.',
  },
  {
    q: 'What if I do not have a car?',
    a: 'We are working with vehicle rental partners in Rawalpindi and Islamabad. Once you are approved, our team will connect you with affordable rental options.',
  },
  {
    q: 'When do I get my earnings?',
    a: 'Our payment cycle runs Monday to Sunday. You receive your weekly payout every Sunday directly to your JazzCash or EasyPaisa wallet — no waiting until end of month.',
  },
  {
    q: 'What are the smartphone requirements?',
    a: 'Your phone must run Android 9.0 or iOS 14 or higher. If you need help choosing an affordable device, our support team can guide you.',
  },
  {
    q: 'What is the commission rate?',
    a: 'RideFlow charges 15–18% commission — the lowest in the Pakistani market. You keep the rest, paid weekly with a full trip-by-trip breakdown.',
  },
]

const benefits = [
  {
    title: 'Drive and earn when you like',
    desc: 'Earn during evenings and weekends, or make more money by driving more frequently. It\'s completely up to you — no minimum hours, no boss.',
  },
  {
    title: 'A reliable source of earnings',
    desc: 'Receive ride requests from RideFlow\'s growing user base in Rawalpindi and Islamabad the moment you go online.',
  },
  {
    title: 'Transparent weekly payouts',
    desc: 'Get your net earnings every Sunday, with a full breakdown of every trip, every deduction — zero hidden cuts.',
  },
]

const steps = [
  {
    num: '1',
    title: 'Register online',
    desc: 'Tell us your city, vehicle details, and CNIC. We will send you next steps within 24 hours.',
  },
  {
    num: '2',
    title: 'Upload your documents',
    desc: 'Submit your driving licence, vehicle registration, and insurance via the app after approval.',
  },
  {
    num: '3',
    title: 'Start earning',
    desc: 'Go online in the RideFlow Driver app and start receiving ride requests immediately.',
  },
]

const cities = ['Rawalpindi', 'Islamabad', 'Lahore', 'Karachi', 'Faisalabad']

interface FormData {
  email: string
  phone: string
  city: string
  agree: boolean
}

export default function DriverRegisterPage() {
  const [form, setForm] = useState<FormData>({
    email: '',
    phone: '',
    city: '',
    agree: false,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [cityOpen, setCityOpen] = useState(false)
  const [citySearch, setCitySearch] = useState('')

  function update(field: keyof FormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError('')
  }

  async function handleSubmit() {
    setError('')
    if (!form.email || !form.phone || !form.city) {
      setError('Please fill in all required fields.')
      return
    }
    if (!form.agree) {
      setError('Please agree to the Terms of Service and Privacy Policy.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/driver/register', {
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

  // Success screen
  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1.25rem, 5vw, 2rem)',
      }}>

        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{
            width: 'clamp(64px, 12vw, 80px)', height: 'clamp(64px, 12vw, 80px)',
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
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            fontWeight: 800,
            color: '#0A0A0A',
            marginBottom: '0.75rem',
          }}>
            Application Received!
          </h1>
          <p style={{ color: '#666', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
            Our team will review your application and contact you within 24 hours with next steps.
          </p>
          <div style={{
            background: '#F7FFF9',
            border: '1px solid #C5E8D4',
            borderRadius: '12px',
            padding: 'clamp(0.85rem, 3vw, 1rem) clamp(1rem, 4vw, 1.5rem)',
            marginBottom: '2rem',
          }}>
            <div style={{ fontSize: '0.72rem', color: '#888', marginBottom: '0.25rem' }}>Application ID</div>
            <div style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: '#2B8659',
              letterSpacing: '1px',
              wordBreak: 'break-word' as const,
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
        padding: 'clamp(90px, 15vw, 120px) 5vw clamp(50px, 10vw, 80px)',
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
            src="/images/park2.jpg"
            alt="RideFlow driver"
            fill
            priority
            className="hero-driver-img"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          /></div>

        <div
          className="driver-hero-grid"
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 420px',
            gap: 'clamp(2rem, 6vw, 4rem)',
            alignItems: 'center',
          }}
        >
          {/* Left */}
          <div style={{marginBottom:'-0px'}}>
            <h1 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-2px',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
            }}>
              Make money driving<br />
              <span style={{ color: '#2B8659' }}>with RideFlow.</span>
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              color: 'white',
              lineHeight: 1.75,
              maxWidth: '480px',
              marginBottom: '2.5rem',
            }}>
              Become a RideFlow driver partner, set your schedule, and earn money driving</p>


          </div>

          {/* Right: Bolt-style inline registration card */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: 'clamp(1.5rem, 5vw, 2rem)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 'clamp(1.3rem, 3.5vw, 1.6rem)',
              fontWeight: 800,
              color: '#0A0A0A',
              marginBottom: '1.5rem',
              letterSpacing: '-0.5px',
            }}>
              Become a driver
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


              {/* City search/select */}
              <div style={{ position: 'relative' }}>
                <label style={labelStyle}>City</label>
                <div
                  onClick={() => setCityOpen((o) => !o)}
                  style={{
                    ...inputStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
                    <Search size={16} color="#666" style={{ flexShrink: 0 }} />
                    <span style={{ fontWeight: 700, color: form.city ? '#111' : '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>
                      {form.city || 'Select your city'}
                    </span>
                  </span>
                  <ChevronDown
                    size={16}
                    color="#666"
                    style={{ transform: cityOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}
                  />
                </div>

                {cityOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: '0.4rem',
                    background: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    border: '1px solid #EFEFEF',
                    zIndex: 10,
                    overflow: 'hidden',
                  }}>
                    <input
                      autoFocus
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      placeholder="Search city"
                      style={{
                        width: '100%',
                        border: 'none',
                        borderBottom: '1px solid #EFEFEF',
                        padding: '0.75rem 1rem',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                    <div style={{ maxHeight: '160px', overflowY: 'auto' }}>
                      {filteredCities.map((c) => (
                        <div
                          key={c}
                          onClick={() => {
                            update('city', c)
                            setCityOpen(false)
                            setCitySearch('')
                          }}
                          style={{
                            padding: '0.7rem 1rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            color: '#111',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = '#F7FFF9')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                        >
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                {loading ? 'Submitting...' : 'Register as a driver'}
              </button>

              <p style={{ textAlign: 'center' as const, fontSize: '0.85rem', color: '#555' }}>
                Already have an account?{' '}
                <a href="#" style={{ color: '#2B8659', fontWeight: 700, textDecoration: 'none' }}>
                  Log in ↗
                </a>
              </p>

              <p style={{ textAlign: 'center' as const, fontSize: '0.82rem', color: '#777' }}>
                If you have multiple vehicles and drivers,{' '}
                <a href="#" style={{ color: '#2B8659', fontWeight: 700, textDecoration: 'none' }}>
                  register as a Fleet owner.
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY RIDEFLOW ── */}
      <section style={{
        padding: 'clamp(70px, 14vw, 160px) 5vw',
        background: '#fff',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          <h2 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(1.7rem, 5vw, 3rem)',
            fontWeight: 800,
            color: '#0A0A0A',
            letterSpacing: '-1px',
            marginBottom: 'clamp(2.25rem, 6vw, 4rem)',
            maxWidth: '500px',
            lineHeight: 1.1,
          }}>
            Why become a RideFlow driver?
          </h2>

          <div
            className="benefits-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(1.5rem, 4vw, 2rem)',
            }}
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
                  {i === 0 ? '🕐' : i === 1 ? '📱' : '💳' }
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                  fontWeight: 700,
                  color: '#0A0A0A',
                  marginBottom: '0.6rem',
                }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: 'clamp(0.88rem, 2vw, 1rem)', color: '#666', lineHeight: 1.7 }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{
        padding: 'clamp(70px, 13vw, 150px) 5vw',
        background: '#F9F9F9',
        borderTop: '1px solid #EFEFEF',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          <h2 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(1.7rem, 5vw, 3rem)',
            fontWeight: 800,
            color: '#0A0A0A',
            letterSpacing: '-1px',
            marginBottom: '0.75rem',
            lineHeight: 1.1,
          }}>
            Start earning in 3 steps.
          </h2>
          <p style={{ color: '#888', fontSize: 'clamp(0.88rem, 2vw, 1rem)', marginBottom: 'clamp(2.25rem, 6vw, 4rem)', maxWidth: '480px', lineHeight: 1.7 }}>
            Whether you want to drive occasionally or full time, getting started with RideFlow is quick and simple.
          </p>

          <div
            className="steps-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(1.25rem, 4vw, 2rem)',
            }}
          >
            {steps.map((step) => (
              <div
                key={step.num}
                style={{
                  background: '#fff',
                  border: '1px solid #EFEFEF',
                  borderRadius: '20px',
                  padding: 'clamp(1.25rem, 4vw, 2rem)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{
                  width: 'clamp(36px, 6vw, 42px)', height: 'clamp(36px, 6vw, 42px)',
                  background: '#2B8659',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  color: '#fff',
                  marginBottom: '1.25rem',
                }}>
                  {step.num}
                </div>
                <p style={{
                  fontSize: '0.9rem',
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
                  fontSize: 'clamp(1.1rem, 2.8vw, 1.3rem)',
                  fontWeight: 700,
                  color: '#0A0A0A',
                  marginBottom: '0.6rem',
                }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: '#888', lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW THE APP WORKS ── */}
      <section style={{
        padding: 'clamp(80px, 16vw, 180px) 5vw',
        background: '#444',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          <h2 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(1.7rem, 5vw, 3rem)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-1px',
            marginBottom: '0.75rem',
            lineHeight: 1.1,
          }}>
            How the RideFlow Driver app works.
          </h2>
          <p style={{ color: '#999', fontSize: 'clamp(0.95rem, 2.5vw, 1.3rem)', marginBottom: 'clamp(2.25rem, 6vw, 4rem)', maxWidth: '500px', lineHeight: 1.7 }}>
            Reliable and easy to use, with everything you need to drive and earn when you want.
          </p>

          <div
            className="app-steps-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'clamp(1.1rem, 3vw, 1.5rem)',
            }}
          >
            {[
              { num: '01', title: 'Accept a ride request', desc: 'The app automatically finds nearby passengers and sends you ride requests in real time.' },
              { num: '02', title: 'Pick up your passenger', desc: 'Use the in-app navigation to reach the pickup location. Passenger details shown clearly.' },
              { num: '03', title: 'Drive to the destination', desc: 'Follow directions, follow local traffic rules, and deliver a safe, comfortable ride.' },
              { num: '04', title: 'Repeat to earn more', desc: 'The more rides you complete, the more you earn. Weekly bonuses for top drivers.' },
            ].map((item) => (
              <div key={item.num} style={{
                borderTop: '2px solid #2B8659',
                paddingTop: '1.25rem',
              }}>
                <div style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: 800,
                  color: '#2A8256',
                  marginBottom: '0.75rem',
                  opacity: 0.4,
                }}>
                  {item.num}
                </div>
                <h4 style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 'clamp(1.05rem, 2.6vw, 1.3rem)',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '0.5rem',
                }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: '#999', lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── FAQ ── */}
      <section style={{
        padding: 'clamp(70px, 14vw, 160px) 5vw',
        background: '#fff',
        borderTop: '1px solid #EFEFEF',
      }}>
        <div
          className="faq-grid"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem, 6vw, 5rem)',
            alignItems: 'start',
          }}
        >
          <div>

            <h2 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 'clamp(1.5rem, 4.5vw, 2.5rem)',
              fontWeight: 800,
              color: '#0A0A0A',
              letterSpacing: '-0.8px',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}>
              Frequently asked questions from drivers.
            </h2>
            <p style={{ color: '#555', fontSize: '1rem', lineHeight: 1.7 }}>
              Can&apos;t find your answer? Contact our driver support team directly.
            </p>
            <a
              href="mailto:drivers@rideflow.pk"
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
              Contact Driver Support →
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
                    padding: 'clamp(0.85rem, 3vw, 1rem) clamp(1rem, 3vw, 1.25rem)',
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
                    fontSize: 'clamp(0.85rem, 2vw, 1.2rem)',
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
                    padding: '0 clamp(1rem, 3vw, 1.25rem) 1rem',
                    fontSize: 'clamp(0.82rem, 1.8vw, 0.87rem)',
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
        padding: 'clamp(60px, 11vw, 100px) 5vw',
        background: '#0A0A0A',
        textAlign: 'center' as const,
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(1.7rem, 6vw, 3.5rem)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-1px',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            Ready to start earning?
          </h2>
          <p style={{ color: '#999', fontSize: 'clamp(0.88rem, 2vw, 1rem)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Join hundreds of drivers already earning with RideFlow in Rawalpindi and Islamabad.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#2B8659',
              color: '#fff',
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              padding: 'clamp(0.8rem, 2.5vw, 1rem) clamp(1.5rem, 5vw, 2.5rem)',
              borderRadius: '50px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
            Apply to Drive →
          </a>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 900px) {
          .driver-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .benefits-grid {
            grid-template-columns: 1fr !important;
          }
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
          .app-steps-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .faq-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .app-steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}