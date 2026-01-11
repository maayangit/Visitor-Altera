import { useState, useEffect } from 'react'
import { useLanguage } from '../LanguageContext'

function VisitorsTable({ visitors, onVisitorDeleted }) {
  const { t, language } = useLanguage()
  const [deletingId, setDeletingId] = useState(null)
  const [deleteAdminCode, setDeleteAdminCode] = useState('')
  const [isDeleteAdmin, setIsDeleteAdmin] = useState(false)

  const visitTypeLabels = {
    'private': t('visitType.private'),
    'business': t('visitType.business'),
    'interview': t('visitType.interview'),
    'contractor': t('visitType.contractor'),
    'supplier': t('visitType.supplier')
  }

  const gateLabels = {
    'main': t('gate.main'),
    'altera': t('gate.altera')
  }

  useEffect(() => {
    const saved = sessionStorage.getItem('deleteAdminCode')
    if (saved) {
      setDeleteAdminCode(saved)
      setIsDeleteAdmin(true)
    }
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  const handleCheckDeleteAdmin = () => {
    if (!deleteAdminCode) {
      alert(t('admin.codeRequired'))
      return
    }
    setIsDeleteAdmin(true)
    sessionStorage.setItem('deleteAdminCode', deleteAdminCode)
  }

  const handleDelete = async (id) => {
    if (!isDeleteAdmin) {
      alert(t('admin.deleteError'))
      return
    }

    if (!window.confirm(t('admin.deleteConfirm'))) {
      return
    }

    setDeletingId(id)
    try {
      const response = await fetch(`/api/visitors/${id}`, {
        method: 'DELETE',
        headers: {
          'x-delete-admin-token': deleteAdminCode,
        },
      })

      if (response.status === 403) {
        alert(t('admin.deleteCodeError'))
      } else if (response.ok) {
        onVisitorDeleted()
      } else {
        alert(t('admin.deleteFailed'))
      }
    } catch (error) {
      console.error('Error deleting visitor:', error)
      alert(t('admin.deleteFailed'))
    } finally {
      setDeletingId(null)
    }
  }

  // Sort visitors by date (newest first)
  const sortedVisitors = [...visitors].sort((a, b) => {
    const dateA = new Date(a.visit_date)
    const dateB = new Date(b.visit_date)
    return dateB - dateA
  })

  if (sortedVisitors.length === 0) {
    return <div className="no-data">{t('table.noData')}</div>
  }

  return (
    <div className="table-container">
      <div className="admin-bar">
        <input
          type="password"
          className="admin-input"
          placeholder={t('table.adminCode')}
          value={deleteAdminCode}
          onChange={(e) => setDeleteAdminCode(e.target.value)}
        />
        <button type="button" className="admin-btn" onClick={handleCheckDeleteAdmin}>
          {t('table.adminConfirm')}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>{t('table.date')}</th>
            <th>{t('table.visitType')}</th>
            <th>{t('table.guestName')}</th>
            <th>{t('table.phone')}</th>
            <th>{t('table.escort')}</th>
            <th>{t('table.arrival')}</th>
            <th>{t('table.details')}</th>
            <th>{t('table.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {sortedVisitors.map(visitor => {
            const visitTypeClass = `visit-type-${visitor.visit_type}`
            const visitTypeText = visitTypeLabels[visitor.visit_type] || visitor.visit_type

            let details = ''
            if (visitor.arrival_method === 'vehicle') {
              details = `<strong>${t('table.vehicle')}:</strong> ${visitor.vehicle_number}<br>`
              details += `<strong>${t('table.gate')}:</strong> ${gateLabels[visitor.entry_gate] || visitor.entry_gate}`
            } else {
              details = t('form.foot')
            }
            if (visitor.id_number) {
              details += details ? '<br>' : ''
              details += `<strong>${t('table.idNumber')}:</strong> ${visitor.id_number}`
            }

            return (
              <tr key={visitor.id}>
                <td>{formatDate(visitor.visit_date)}</td>
                <td>
                  <span className={`visit-type-badge ${visitTypeClass}`}>
                    {visitTypeText}
                  </span>
                </td>
                <td>{visitor.guest_name}</td>
                <td>{visitor.guest_phone}</td>
                <td>
                  {visitor.escort_name}
                  <br />
                  <small>{visitor.escort_phone}</small>
                </td>
                <td>{visitor.arrival_method === 'vehicle' ? t('form.vehicle') : t('form.foot')}</td>
                <td className="details-cell" dangerouslySetInnerHTML={{ __html: details }} />
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(visitor.id)}
                    disabled={deletingId === visitor.id}
                  >
                    {deletingId === visitor.id ? t('table.deleting') : t('table.delete')}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default VisitorsTable
