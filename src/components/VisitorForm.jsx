import { useState } from 'react'
import { useLanguage } from '../LanguageContext'

function VisitorForm({ onVisitorAdded }) {
  const { t, language } = useLanguage()
  
  const visitTypeOptions = [
    { value: 'private', label: t('visitType.private') },
    { value: 'business', label: t('visitType.business') },
    { value: 'interview', label: t('visitType.interview') },
    { value: 'contractor', label: t('visitType.contractor') },
    { value: 'supplier', label: t('visitType.supplier') }
  ]

  const gateOptions = [
    { value: 'main', label: t('gate.main') },
    { value: 'altera', label: t('gate.altera') }
  ]

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
    entryGate: '',
  })

  const [submitting, setSubmitting] = useState(false)

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
    
    if (formData.arrivalMethod === 'vehicle') {
      if (!formData.vehicleNumber || !formData.entryGate) {
        alert(t('message.vehicleFields'))
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
          idNumber: null,
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
        alert(t('message.success'))
        onVisitorAdded()
      } else {
        const error = await response.json()
        alert(`שגיאה: ${error.message || t('message.error')}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(t('message.error'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="visitType">{t('form.visitType')}</label>
        <select
          id="visitType"
          name="visitType"
          value={formData.visitType}
          onChange={handleChange}
          required
        >
          <option value="">{t('form.selectVisitType')}</option>
          {visitTypeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {formData.visitType === 'contractor' && (
        <div className="form-group">
          <div className="notice-warning">
            {t('form.contractorNotice')}
          </div>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="visitDate">{t('form.visitDate')}</label>
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
        <label htmlFor="guestName">{t('form.guestName')}</label>
        <input
          type="text"
          id="guestName"
          name="guestName"
          value={formData.guestName}
          onChange={handleChange}
          required
          placeholder={t('form.guestNamePlaceholder')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="guestPhone">{t('form.guestPhone')}</label>
        <input
          type="tel"
          id="guestPhone"
          name="guestPhone"
          value={formData.guestPhone}
          onChange={handleChange}
          required
          placeholder={t('form.guestPhonePlaceholder')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="escortName">{t('form.escortName')}</label>
        <input
          type="text"
          id="escortName"
          name="escortName"
          value={formData.escortName}
          onChange={handleChange}
          required
          placeholder={t('form.escortNamePlaceholder')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="escortPhone">{t('form.escortPhone')}</label>
        <input
          type="tel"
          id="escortPhone"
          name="escortPhone"
          value={formData.escortPhone}
          onChange={handleChange}
          required
          placeholder={t('form.escortPhonePlaceholder')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="arrivalMethod">{t('form.arrivalMethod')}</label>
        <select
          id="arrivalMethod"
          name="arrivalMethod"
          value={formData.arrivalMethod}
          onChange={handleChange}
          required
        >
          <option value="">{t('form.selectArrival')}</option>
          <option value="foot">{t('form.foot')}</option>
          <option value="vehicle">{t('form.vehicle')}</option>
        </select>
      </div>

      {showVehicleFields && (
        <>
          <div className="form-group">
            <label htmlFor="vehicleNumber">{t('form.vehicleNumber')}</label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              required
              placeholder={t('form.vehicleNumberPlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="entryGate">{t('form.entryGate')}</label>
            <select
              id="entryGate"
              name="entryGate"
              value={formData.entryGate}
              onChange={handleChange}
              required
            >
              <option value="">{t('form.selectGate')}</option>
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
        {submitting ? t('form.submitting') : t('form.submit')}
      </button>
    </form>
  )
}

export default VisitorForm
