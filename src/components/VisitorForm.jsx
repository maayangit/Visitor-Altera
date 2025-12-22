import { useState } from 'react'

const visitTypeOptions = [
  { value: 'private', label: 'אורח פרטי' },
  { value: 'business', label: 'ביקור עסקי' },
  { value: 'interview', label: 'ראיון עבודה' },
  { value: 'contractor', label: 'קבלן חד יומי' },
  { value: 'supplier', label: 'ספק' }
]

const gateOptions = [
  { value: 'main', label: 'שער ראשי אינטל' },
  { value: 'altera', label: 'שער דרום אלטרה' }
]

function VisitorForm({ onVisitorAdded }) {
  const [formData, setFormData] = useState({
    visitType: '',
    idNumber: '',
    visitDate: new Date().toISOString().split('T')[0],
    guestName: '',
    guestPhone: '',
    escortName: '',
    escortPhone: '',
    arrivalMethod: '',
    vehicleNumber: '',
    entryGate: ''
  })

  const [submitting, setSubmitting] = useState(false)

  const showIdField = formData.visitType === 'contractor'
  const showVehicleFields = formData.arrivalMethod === 'vehicle'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (formData.visitType === 'contractor' && !formData.idNumber) {
      alert('יש למלא תעודת זהות עבור קבלן חד יומי')
      return
    }

    if (formData.arrivalMethod === 'vehicle') {
      if (!formData.vehicleNumber || !formData.entryGate) {
        alert('יש למלא את כל שדות הרכב')
        return
      }
    }

    setSubmitting(true)

    try {
      const response = await fetch('/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          idNumber: formData.idNumber || null,
          vehicleNumber: formData.vehicleNumber || null,
          entryGate: formData.entryGate || null,
        }),
      })

      if (response.ok) {
        // Reset form
        setFormData({
          visitType: '',
          idNumber: '',
          visitDate: new Date().toISOString().split('T')[0],
          guestName: '',
          guestPhone: '',
          escortName: '',
          escortPhone: '',
          arrivalMethod: '',
          vehicleNumber: '',
          entryGate: ''
        })
        alert('המבקר נרשם בהצלחה!')
        onVisitorAdded()
      } else {
        const error = await response.json()
        alert(`שגיאה: ${error.message || 'לא ניתן לשמור את המבקר'}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('שגיאה בשמירת המבקר. נסה שוב.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="visitType">סוג הביקור *</label>
        <select
          id="visitType"
          name="visitType"
          value={formData.visitType}
          onChange={handleChange}
          required
        >
          <option value="">בחר סוג ביקור</option>
          {visitTypeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {showIdField && (
        <div className="form-group">
          <label htmlFor="idNumber">תעודת זהות *</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
            placeholder="הזן תעודת זהות"
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="visitDate">תאריך הביקור *</label>
        <input
          type="date"
          id="visitDate"
          name="visitDate"
          value={formData.visitDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="guestName">שם האורח *</label>
        <input
          type="text"
          id="guestName"
          name="guestName"
          value={formData.guestName}
          onChange={handleChange}
          required
          placeholder="הזן שם מלא"
        />
      </div>

      <div className="form-group">
        <label htmlFor="guestPhone">טלפון האורח *</label>
        <input
          type="tel"
          id="guestPhone"
          name="guestPhone"
          value={formData.guestPhone}
          onChange={handleChange}
          required
          placeholder="הזן מספר טלפון"
        />
      </div>

      <div className="form-group">
        <label htmlFor="escortName">מי המלווה (שם העובד) *</label>
        <input
          type="text"
          id="escortName"
          name="escortName"
          value={formData.escortName}
          onChange={handleChange}
          required
          placeholder="הזן שם העובד המלווה"
        />
      </div>

      <div className="form-group">
        <label htmlFor="escortPhone">טלפון המלווה *</label>
        <input
          type="tel"
          id="escortPhone"
          name="escortPhone"
          value={formData.escortPhone}
          onChange={handleChange}
          required
          placeholder="הזן מספר טלפון"
        />
      </div>

      <div className="form-group">
        <label htmlFor="arrivalMethod">באיזו דרך מגיע *</label>
        <select
          id="arrivalMethod"
          name="arrivalMethod"
          value={formData.arrivalMethod}
          onChange={handleChange}
          required
        >
          <option value="">בחר דרך הגעה</option>
          <option value="foot">רגלית</option>
          <option value="vehicle">רכב</option>
        </select>
      </div>

      {showVehicleFields && (
        <>
          <div className="form-group">
            <label htmlFor="vehicleNumber">מספר רכב *</label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              required
              placeholder="הזן מספר רכב"
            />
          </div>

          <div className="form-group">
            <label htmlFor="entryGate">מאיזה שער נכנס *</label>
            <select
              id="entryGate"
              name="entryGate"
              value={formData.entryGate}
              onChange={handleChange}
              required
            >
              <option value="">בחר שער כניסה</option>
              {gateOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <button type="submit" className="submit-btn" disabled={submitting}>
        {submitting ? 'שומר...' : 'שמור מבקר'}
      </button>
    </form>
  )
}

export default VisitorForm


