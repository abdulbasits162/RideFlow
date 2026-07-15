'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react'

const faqs = [
  {
    category: 'Passengers',
    items: [
      {
        q: 'How do I book a ride?',
        a: 'Enter your pickup and drop-off location on the homepage or in the app, choose your ride type, and tap "Get Fare Estimate". Once you see the fare, confirm the booking and a driver will be matched within 90 seconds.',
      },
      {
        q: 'Can I cancel my booking?',
        a: 'Yes. You can cancel before a driver is matched at no charge. If a driver has already accepted and is on the way, a small cancellation fee may apply.',
      },
      {
        q: 'What payment methods are accepted?',
        a: 'We accept cash, JazzCash, and EasyPaisa. You can select your preferred method before confirming the booking.',
      },
      {
        q: 'How is the fare calculated?',
        a: 'Fare is calculated based on a base fare + distance rate (per km) + time rate (per minute). The full breakdown is shown before you confirm. Surge is capped at 2× and always displayed clearly.',
      },
      {
        q: 'What if I left something in the car?',
        a: 'Contact us immediately via the in-app chat or call our support line. We will connect you with the driver to arrange retrieval.',
      },
    ],
  },
  {
    category: 'Drivers',
    items: [
      {
        q: 'How do I register as a driver?',
        a: 'Go to rideflow.pk/driver/register and complete the 3-step form. You will need your CNIC, vehicle details, and a payout wallet number. Our team reviews applications within 24 hours.',
      },
      {
        q: 'When do I get paid?',
        a: 'Earnings are transferred to your JazzCash or EasyPaisa wallet every Sunday. You can see a full breakdown of each trip in the driver app.',
      },
      {
        q: 'What is the commission rate?',
        a: 'RideFlow charges 15–18% commission depending on your city and ride type. This is the lowest in the Pakistani market. Fleet owners get preferential rates.',
      },
      {
        q: 'Can I drive in multiple cities?',
        a: 'Currently you register for one city. Multi-city support is on our roadmap and will be available once we expand to additional markets.',
      },
    ],
  },
  {
    category: 'Fleet Owners',
    items: [
      {
        q: 'How do I register my fleet?',
        a: 'Scroll to the Fleet section on the homepage or go directly to the fleet registration form. You will need your CNIC, company name (optional), number of vehicles, and vehicle types.',
      },
      {
        q: 'What is the minimum fleet size?',
        a: 'You can register with as few as 2 vehicles. There is no upper limit.',
      },
      {
        q: 'Do I need to provide drivers?',
        a: 'You can bring your own drivers (they must pass NADRA verification) or request drivers from our pool. Both options are available.',
      },
    ],
  },
]

const contactOptions = [
  {
    icon: <MessageCircle size={22} color="#2B8659" />,
    title: 'Live Chat',
    desc: 'Chat with our support team in the app. Available 8am – 10pm daily.',
    action: 'Open Chat',
    href: '#',
  },
  {
    icon: <Phone size={22} color="#2B8659" />,
    title: 'Call Us',
    desc: 'Speak directly to our team. Available 9am – 9pm, 7 days a week.',
    action: '0311-RIDEFLOW',
    href: 'tel:+923110000000',
  },
  {
    icon: <Mail size={22} color="#2B8659" />,
    title: 'Email Support',
    desc: 'For non-urgent queries. We respond within 24 hours.',
    action: 'support@rideflow.pk',
    href: 'mailto:support@rideflow.pk',
  },
]

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('Passengers')

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General',
    message: '',
  })
  const [formSent, setFormSent] = useState(false)
  const [formLoading, setFormLoading] = useState(false)

  function handleFaqToggle(key: string) {
    setOpenFaq(openFaq === key ? null : key)
  }

  async function handleContactSubmit() {
    if (!contactForm.name || !contactForm.email || !contactForm.message) return
    setFormLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setFormSent(true)
    setFormLoading(false)
  }

  const inputStyle = {
    width: '100%',
    background: '#F7F7F7',
    border: '1.5px solid #E5E5E5',
    borderRadius: '10px',
    padding: '0.8rem 1rem',
    color: '#111',
    fontSize: '0.92rem',
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
    color: '#999',
    marginBottom: '0.4rem',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>

      {/* Header */}
      <div style={{
        background: '#444',
        padding: '110px 12vw 50px',
      }}>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#eee',
          textDecoration: 'none',
          fontSize: '1rem',
          marginBottom: '2rem',
        }}>
          ← Back to Home
        </Link>
        <div style={{ maxWidth: '600px' }}>
          <span style={{
            fontSize: '1.3rem',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase' as const,
            color: '#2B8659',
            display: 'block',
            marginBottom: '1rem',
          }}>
            Support
          </span>
          <h1 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-1px',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            How can we help?
          </h1>
          <p style={{ color: '#eee', fontSize: '1rem', lineHeight: 1.75 }}>
            Find answers in our FAQ or get in touch with our support team directly.
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '4rem 1.5rem 6rem',
      }}>

        {/* Contact options */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
          marginBottom: '5rem',
        }}
          className="contact-grid"
        >
          {contactOptions.map((opt) => (
            <a
              key={opt.title}
              href={opt.href}
              style={{
                display: 'block',
                background: '#fff',
                border: '1px solid #EFEFEF',
                borderRadius: '16px',
                padding: '1.75rem',
                textDecoration: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#2B8659'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(43,134,89,0.08)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#EFEFEF'
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                width: '48px', height: '48px',
                background: 'rgba(43,134,89,0.08)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.1rem',
              }}>
                {opt.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#0A0A0A',
                marginBottom: '0.4rem',
              }}>
                {opt.title}
              </h3>
              <p style={{
                fontSize: '0.83rem',
                color: '#888',
                lineHeight: 1.6,
                marginBottom: '1.1rem',
              }}>
                {opt.desc}
              </p>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.83rem',
                fontWeight: 700,
                color: '#2B8659',
              }}>
                {opt.action} <ArrowRight size={13} />
              </span>
            </a>
          ))}
        </div>

        {/* FAQ section */}
        <div style={{ marginBottom: '5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '1.8rem',
            fontWeight: 800,
            color: '#0A0A0A',
            marginBottom: '0.5rem',
          }}>
            Frequently Asked Questions
          </h2>
          <p style={{
            color: '#888',
            fontSize: '0.92rem',
            marginBottom: '2rem',
          }}>
            Select a category to find answers.
          </p>

          {/* Category tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2rem',
            flexWrap: 'wrap' as const,
          }}>
            {faqs.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '50px',
                  border: `1.5px solid ${activeCategory === cat.category ? '#2B8659' : '#E5E5E5'}`,
                  background: activeCategory === cat.category ? 'rgba(43,134,89,0.08)' : '#fff',
                  color: activeCategory === cat.category ? '#2B8659' : '#666',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* FAQ items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {faqs
              .find((c) => c.category === activeCategory)
              ?.items.map((item, i) => {
                const key = `${activeCategory}-${i}`
                const isOpen = openFaq === key
                return (
                  <div
                    key={key}
                    style={{
                      border: `1px solid ${isOpen ? '#2B8659' : '#EFEFEF'}`,
                      borderRadius: '14px',
                      overflow: 'hidden',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleFaqToggle(key)}
                      style={{
                        width: '100%',
                        background: isOpen ? '#F7FFF9' : '#fff',
                        border: 'none',
                        padding: '1.1rem 1.25rem',
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
                        fontSize: '0.95rem',
                        color: '#0A0A0A',
                        paddingRight: '1rem',
                      }}>
                        {item.q}
                      </span>
                      <ChevronDown
                        size={18}
                        color="#2B8659"
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s',
                          flexShrink: 0,
                        }}
                      />
                    </button>
                    {isOpen && (
                      <div style={{
                        padding: '0 1.25rem 1.1rem',
                        fontSize: '0.88rem',
                        color: '#555',
                        lineHeight: 1.75,
                        background: '#F7FFF9',
                      }}>
                        {item.a}
                      </div>
                    )}
                  </div>
                )
              })}
          </div>
        </div>

        {/* Contact form */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
        }}
          className="support-form-grid"
        >
          <div>
            <h2 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#0A0A0A',
              marginBottom: '0.5rem',
            }}>
              Still need help?
            </h2>
            <p style={{ color: '#888', fontSize: '0.92rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              Send us a message and our team will get back to you within 24 hours.
            </p>

            {formSent ? (
              <div style={{
                background: '#F7FFF9',
                border: '1px solid #C5E8D4',
                borderRadius: '16px',
                padding: '2.5rem',
                textAlign: 'center' as const,
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 700,
                  color: '#2B8659',
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem',
                }}>
                  Message Sent!
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#666' }}>
                  We&apos;ll get back to you at {contactForm.email} within 24 hours.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={labelStyle}>Your Name *</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Muhammad Ahmed"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="03XX-XXXXXXX"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Email *</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="you@email.com"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Category</label>
                  <select
                    value={contactForm.category}
                    onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option>General</option>
                    <option>Booking Issue</option>
                    <option>Driver Issue</option>
                    <option>Payment Issue</option>
                    <option>Fleet Registration</option>
                    <option>Driver Registration</option>
                    <option>Safety Concern</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Describe your issue or question in detail..."
                    rows={5}
                    style={{
                      ...inputStyle,
                      resize: 'vertical' as const,
                      minHeight: '120px',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleContactSubmit}
                  disabled={formLoading || !contactForm.name || !contactForm.email || !contactForm.message}
                  style={{
                    width: '100%',
                    background: formLoading || !contactForm.name || !contactForm.email || !contactForm.message
                      ? '#E5E5E5' : '#2B8659',
                    color: formLoading || !contactForm.name || !contactForm.email || !contactForm.message
                      ? '#aaa' : '#fff',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '0.95rem',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    cursor: formLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {formLoading ? 'Sending...' : 'Send Message →'}
                </button>
              </div>
            )}
          </div>

          {/* Right side info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{
              background: '#444',
              borderRadius: '16px',
              padding: '2rem',
            }}>
              <h4 style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 700,
                fontSize: '1.3rem',
                color: '#fff',
                marginBottom: '1.25rem',
              }}>
                Support Hours
              </h4>
              {[
                { day: 'Monday – Friday', hours: '8:00 AM – 10:00 PM' },
                { day: 'Saturday', hours: '9:00 AM – 9:00 PM' },
                { day: 'Sunday', hours: '10:00 AM – 8:00 PM' },
              ].map((row) => (
                <div key={row.day} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0',
                  borderBottom: '1px solid #333',
                  fontSize: '1rem',
                }}>
                  <span style={{ color: '#eee' }}>{row.day}</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{row.hours}</span>
                </div>
              ))}
            </div>

            <div style={{
              background: 'rgba(43,134,89,0.06)',
              border: '1px solid rgba(43,134,89,0.2)',
              borderRadius: '16px',
              padding: '1.75rem',
            }}>
              <h4 style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#0A0A0A',
                marginBottom: '0.5rem',
              }}>
                Emergency — In-ride SOS
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.65, marginBottom: '1rem' }}>
                If you&apos;re in an active ride and feel unsafe, use the SOS button in the app. Your location is sent immediately to our emergency response team and your emergency contacts.
              </p>
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#2B8659',
              }}>
                Available 24/7 inside the app
              </span>
            </div>

            <div style={{
              background: '#F9F9F9',
              borderRadius: '16px',
              padding: '1.75rem',
              border: '1px solid #EFEFEF',
            }}>
              <h4 style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#0A0A0A',
                marginBottom: '0.5rem',
              }}>
                Quick Links
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { label: 'Book a Ride', href: '/book' },
                  { label: 'Become a Driver', href: '/driver/register' },
                  { label: 'Register Fleet', href: '/#fleet' },
                  { label: 'City Coverage', href: '/cities' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.85rem',
                      color: '#2B8659',
                      textDecoration: 'none',
                      fontWeight: 600,
                      padding: '0.3rem 0',
                    }}
                  >
                    <ArrowRight size={13} /> {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .support-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}