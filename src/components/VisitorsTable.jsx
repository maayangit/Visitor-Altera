import { useState, useEffect } from 'react'

const visitTypeLabels = {
  'private': 'אורח פרטי',
  'business': 'ביקור עסקי',
  'interview': 'ראיון עבודה',
  'contractor': 'קבלן חד יומי',
  'supplier': 'ספק'
}

const gateLabels = {
  'main': 'שער ראשי אינטל',
  'altera': 'שער דרום אלטרה'
}

function VisitorsTable({ visitors, onVisitorDeleted }) {
  const [deletingId, setDeletingId] = useState(null)
  const [adminCode, setAdminCode] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem('adminCode')
    if (saved) {
      setAdminCode(saved)
      setIsAdmin(true)
    }
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  const handleCheckAdmin = () => {
    if (!adminCode) {
      alert('יש להזין קוד מנהל')
      return
    }
    // במערכת אמיתית מומלץ לאמת מהשרת. כאן אנו בודקים רק בצד הלקוח
    setIsAdmin(true)
    sessionStorage.setItem('adminCode', adminCode)
  }

  const handleDelete = async (id) => {
    if (!isAdmin) {
      alert('רק מנהלים יכולים למחוק רשומות. נא להזין קוד מנהל.')
      return
    }

    if (!window.confirm('האם אתה בטוח שברצונך למחוק את המבקר הזה?')) {
      return
    }

    setDeletingId(id)
    try {
      const response = await fetch(`/api/visitors/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-token': adminCode,
        },
      })

      if (response.status === 403) {
        alert('קוד מנהל שגוי או חסר. אין הרשאה למחוק רשומות.')
      } else if (response.ok) {
        onVisitorDeleted()
      } else {
        alert('שגיאה במחיקת המבקר')
      }
    } catch (error) {
      console.error('Error deleting visitor:', error)
      alert('שגיאה במחיקת המבקר')
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
    return <div className="no-data">אין מבקרים רשומים</div>
  }

  return (
    <div className="table-container">
      <div className="admin-bar">
        <input
          type="password"
          className="admin-input"
          placeholder="קוד מנהל למחיקת רשומות"
          value={adminCode}
          onChange={(e) => setAdminCode(e.target.value)}
        />
        <button type="button" className="admin-btn" onClick={handleCheckAdmin}>
          אישור
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>תאריך</th>
            <th>סוג ביקור</th>
            <th>שם האורח</th>
            <th>טלפון</th>
            <th>המלווה</th>
            <th>דרך הגעה</th>
            <th>פרטים נוספים</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {sortedVisitors.map(visitor => {
            const visitTypeClass = `visit-type-${visitor.visit_type}`
            const visitTypeText = visitTypeLabels[visitor.visit_type] || visitor.visit_type

            let details = ''
            if (visitor.arrival_method === 'vehicle') {
              details = `<strong>רכב:</strong> ${visitor.vehicle_number}<br>`
              details += `<strong>שער:</strong> ${gateLabels[visitor.entry_gate] || visitor.entry_gate}`
            } else {
              details = 'רגלית'
            }
            if (visitor.id_number) {
              details += details ? '<br>' : ''
              details += `<strong>ת.ז:</strong> ${visitor.id_number}`
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
                <td>{visitor.arrival_method === 'vehicle' ? 'רכב' : 'רגלית'}</td>
                <td className="details-cell" dangerouslySetInnerHTML={{ __html: details }} />
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(visitor.id)}
                    disabled={deletingId === visitor.id}
                  >
                    {deletingId === visitor.id ? 'מוחק...' : 'מחק'}
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


