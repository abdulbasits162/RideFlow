'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Upload, Car, User, Phone, CreditCard, MapPin } from 'lucide-react'

type Step = 1 | 2 | 3

interface FormData {
  // Step 1 — Personal
  fullName: string
  phone: string
  cnic: string
  email: string
  city: string

  // Step 2 — Vehicle
  vehicleMake: string
  vehicleModel: string
  vehicleYear: string
  licensePlate: string
  vehicleType: string

  // Step 3 — Payout
  payoutNumber: string
  payoutMethod: string
}

export default function DriverRegisterPage() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormData>({
    fullName: '',
    phone: '',
    cnic: '',
    email: '',
    city: 'Rawalpindi',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    licensePlate: '',
    vehicleType: 'sedan',
    payoutNumber: '',
    payoutMethod: 'jazzcash',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState('')

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError('')
  }

  function validateStep1() {
    if (!form.fullName || !form.phone || !form.cnic || !form.city) {
      setError('Please fill in all required fields.')
      return false
    }
    if (form.cnic.replace(/[-\s]/g, '').length !== 13) {
      setError('Please enter a valid 13-digit CNIC.')
      return false
    }
    return true
  }

  function validateStep2() {
    if (!form.vehicleMake || !form.vehicleModel || !form.vehicleYear || !form.licensePlate) {
      setError('Please fill in all vehicle details.')
      return false
    }
    return true
  }

  function validateStep3() {
    if (!form.payoutNumber) {
      setError('Please enter your payout number.')
      return false
    }
    return true
  }

  function nextStep() {
    setError('')
    if (step === 1 && !validateStep1()) return
    if (step === 2 && !validateStep2()) return
    setStep((prev) => (prev + 1) as Step)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit() {
    setError('')
    if (!validateStep3()) return
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
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
    color: '#888',
    marginBottom: '0.4rem',
  }

  const steps = [
    { num: 1, label: 'Personal Info', icon: <User size={16} /> },
    { num: 2, label: 'Vehicle Info', icon: <Car size={16} /> },
    { num: 3, label: 'Payout Setup', icon: <CreditCard size={16} /> },
  ]

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
            Application Submitted!
          </h1>
          <p style={{ color: '#666', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Your driver application has been received. Our team will review your documents and contact you within 24 hours.
          </p>
          <div style={{
            background: '#F7FFF9',
            border: '1px solid #C5E8D4',
            borderRadius: '12px',
            padding: '1rem 1.5rem',
            marginBottom: '2rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.25rem' }}>
              Your Application ID
            </div>
            <div style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 800,
              fontSize: '1.2rem',
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
    <div style={{ minHeight: '100vh', background: '#fff' }}>

      {/* Top banner */}
      <div style={{
        background: '#444',
        padding: '100px 5vw 60px',
        textAlign: 'center' as const,
      }}>
        <span style={{
          fontSize: '1.3rem',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase' as const,
          color: '#2B8659',
          display: 'block',
          marginBottom: '1rem',
        }}>
          Join the Team
        </span>
        <h1 style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-1px',
          marginBottom: '1rem',
          lineHeight: 1.1,
        }}>
          Start driving with RideFlow.
        </h1>
        <p style={{ color: '#999', fontSize: '1.2rem', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto' }}>
          Register in under 10 minutes. Get approved in 24 hours. Start earning immediately.
        </p>
      </div>

      {/* Progress steps */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #EFEFEF',
        padding: '1.5rem 5vw',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          maxWidth: '500px',
          width: '100%',
        }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{
                  width: '40px', height: '40px',
                  borderRadius: '50%',
                  background: step >= s.num ? '#2B8659' : '#F0F0F0',
                  color: step >= s.num ? '#fff' : '#aaa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  transition: 'all 0.3s',
                  marginBottom: '0.4rem',
                }}>
                  {step > s.num ? <CheckCircle size={18} /> : s.icon}
                </div>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: step >= s.num ? '#2B8659' : '#aaa',
                  whiteSpace: 'nowrap',
                }}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  height: '2px',
                  flex: 1,
                  background: step > s.num ? '#2B8659' : '#EFEFEF',
                  margin: '-1rem 0 0',
                  transition: 'background 0.3s',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form area */}
      <div style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: '3rem 1.5rem 5rem',
      }}>

        {/* Step 1 — Personal Info */}
        {step === 1 && (
          <div>
            <h2 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#0A0A0A',
              marginBottom: '0.4rem',
            }}>
              Personal Information
            </h2>
            <p style={{ color: '#888', fontSize: '0.88rem', marginBottom: '2rem' }}>
              This must match your CNIC exactly.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={labelStyle}>Full Name (as per CNIC) *</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  placeholder="Muhammad Ahmed Khan"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="03XX-XXXXXXX"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@email.com"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>CNIC Number *</label>
                <input
                  type="text"
                  value={form.cnic}
                  onChange={(e) => update('cnic', e.target.value)}
                  placeholder="XXXXX-XXXXXXX-X"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                />
              </div>

              <div>
                <label style={labelStyle}>City *</label>
                <select
                  value={form.city}
                  onChange={(e) => update('city', e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Islamabad">Islamabad</option>
                </select>
              </div>

              {/* Document upload placeholders */}
              <div>
                <label style={labelStyle}>CNIC Front (upload coming soon)</label>
                <div style={{
                  border: '2px dashed #E5E5E5',
                  borderRadius: '10px',
                  padding: '1.5rem',
                  textAlign: 'center' as const,
                  cursor: 'not-allowed',
                  background: '#FAFAFA',
                }}>
                  <Upload size={20} color="#ccc" style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.8rem', color: '#bbb' }}>
                    Document upload will be available in the app
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Vehicle Info */}
        {step === 2 && (
          <div>
            <h2 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#0A0A0A',
              marginBottom: '0.4rem',
            }}>
              Vehicle Information
            </h2>
            <p style={{ color: '#888', fontSize: '0.88rem', marginBottom: '2rem' }}>
              Vehicle must be 2015 or newer and pass a roadworthiness check.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

              {/* Vehicle type selector */}
              <div>
                <label style={labelStyle}>Vehicle Type *</label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {[
                    { value: 'sedan', label: '🚗 Sedan' },
                    { value: 'suv', label: '🚙 SUV' },
                    { value: 'van', label: '🚐 Van' },
                  ].map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => update('vehicleType', t.value)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        borderRadius: '10px',
                        border: `1.5px solid ${form.vehicleType === t.value ? '#2B8659' : '#E5E5E5'}`,
                        background: form.vehicleType === t.value ? 'rgba(43,134,89,0.06)' : '#F7F7F7',
                        color: form.vehicleType === t.value ? '#2B8659' : '#555',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontFamily: 'var(--font-inter), sans-serif',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Vehicle Make *</label>
                  <input
                    type="text"
                    value={form.vehicleMake}
                    onChange={(e) => update('vehicleMake', e.target.value)}
                    placeholder="Toyota"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Vehicle Model *</label>
                  <input
                    type="text"
                    value={form.vehicleModel}
                    onChange={(e) => update('vehicleModel', e.target.value)}
                    placeholder="Corolla"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Year *</label>
                  <input
                    type="number"
                    value={form.vehicleYear}
                    onChange={(e) => update('vehicleYear', e.target.value)}
                    placeholder="2019"
                    min="2015"
                    max="2026"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>License Plate *</label>
                  <input
                    type="text"
                    value={form.licensePlate}
                    onChange={(e) => update('licensePlate', e.target.value)}
                    placeholder="RWP-1234"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                  />
                </div>
              </div>

              {/* What you'll need */}
              <div style={{
                background: '#F7FFF9',
                border: '1px solid #C5E8D4',
                borderRadius: '12px',
                padding: '1.25rem',
              }}>
                <h4 style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#0A0A0A',
                  marginBottom: '0.75rem',
                }}>
                  Documents you will need:
                </h4>
                {[
                  'Valid vehicle registration certificate',
                  'Valid vehicle insurance',
                  'Roadworthiness certificate',
                  'Driving licence (at least 2 years old)',
                ].map((doc) => (
                  <div key={doc} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.4rem',
                    fontSize: '0.83rem',
                    color: '#555',
                  }}>
                    <span style={{ color: '#2B8659', fontWeight: 700 }}>✓</span>
                    {doc}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Payout */}
        {step === 3 && (
          <div>
            <h2 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#0A0A0A',
              marginBottom: '0.4rem',
            }}>
              Payout Setup
            </h2>
            <p style={{ color: '#888', fontSize: '0.88rem', marginBottom: '2rem' }}>
              Your earnings will be transferred here every Sunday.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

              <div>
                <label style={labelStyle}>Payout Method *</label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {[
                    { value: 'jazzcash', label: 'JazzCash' },
                    { value: 'easypaisa', label: 'EasyPaisa' },
                  ].map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => update('payoutMethod', m.value)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        borderRadius: '10px',
                        border: `1.5px solid ${form.payoutMethod === m.value ? '#2B8659' : '#E5E5E5'}`,
                        background: form.payoutMethod === m.value ? 'rgba(43,134,89,0.06)' : '#F7F7F7',
                        color: form.payoutMethod === m.value ? '#2B8659' : '#555',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontFamily: 'var(--font-inter), sans-serif',
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>
                  {form.payoutMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'} Number *
                </label>
                <input
                  type="tel"
                  value={form.payoutNumber}
                  onChange={(e) => update('payoutNumber', e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                />
              </div>

              {/* Summary */}
              <div style={{
                background: '#444',
                borderRadius: '14px',
                padding: '1.5rem',
                marginTop: '0.5rem',
              }}>
                <h4 style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 700,
                  color: '#fff',
                  fontSize: '0.95rem',
                  marginBottom: '1rem',
                }}>
                  Application Summary
                </h4>
                {[
                  { label: 'Name', value: form.fullName },
                  { label: 'Phone', value: form.phone },
                  { label: 'City', value: form.city },
                  { label: 'Vehicle', value: `${form.vehicleMake} ${form.vehicleModel} ${form.vehicleYear}` },
                  { label: 'Plate', value: form.licensePlate },
                ].map((row) => (
                  <div key={row.label} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #333',
                    fontSize: '0.85rem',
                  }}>
                    <span style={{ color: '#999' }}>{row.label}</span>
                    <span style={{ color: '#fff', fontWeight: 600 }}>{row.value || '—'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p style={{
            fontSize: '0.85rem',
            color: '#e53e3e',
            marginTop: '1.25rem',
            padding: '0.75rem 1rem',
            background: '#FFF5F5',
            borderRadius: '8px',
            border: '1px solid #FED7D7',
          }}>
            {error}
          </p>
        )}

        {/* Navigation buttons */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginTop: '2rem',
        }}>
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((prev) => (prev - 1) as Step)}
              style={{
                flex: 1,
                padding: '0.9rem',
                borderRadius: '50px',
                border: '1.5px solid #E5E5E5',
                background: '#fff',
                color: '#333',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), sans-serif',
                transition: 'border-color 0.2s',
              }}
            >
              ← Back
            </button>
          )}
          <button
            type="button"
            onClick={step === 3 ? handleSubmit : nextStep}
            disabled={loading}
            style={{
              flex: 2,
              padding: '0.9rem',
              borderRadius: '50px',
              border: 'none',
              background: loading ? '#ccc' : '#2B8659',
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-inter), sans-serif',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Submitting...' : step === 3 ? 'Submit Application →' : 'Continue →'}
          </button>
        </div>

        {/* Step indicator */}
        <p style={{
          textAlign: 'center' as const,
          fontSize: '0.78rem',
          color: '#bbb',
          marginTop: '1rem',
        }}>
          Step {step} of 3
        </p>
      </div>
    </div>
  )
}