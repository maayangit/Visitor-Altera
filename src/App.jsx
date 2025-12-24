import { useState, useEffect } from 'react'
import './App.css'
import VisitorForm from './components/VisitorForm'
import VisitorsTable from './components/VisitorsTable'

function App() {
  const [visitors, setVisitors] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState(null) // null | 'list' | 'form'
  const [viewAdminCode, setViewAdminCode] = useState('')
  const [isViewAdmin, setIsViewAdmin] = useState(false)

  // Check if view admin code is saved
  useEffect(() => {
    const saved = sessionStorage.getItem('viewAdminCode')
    if (saved) {
      setViewAdminCode(saved)
      setIsViewAdmin(true)
    }
  }, [])

  // Fetch visitors from API
  const fetchVisitors = async (adminToken) => {
    try {
      setLoading(true)
      const response = await fetch('/api/visitors', {
        headers: {
          'x-view-admin-token': adminToken || ''
        }
      })
      if (response.ok) {
        const data = await response.json()
        setVisitors(data)
      } else if (response.status === 403) {
        setVisitors([])
        alert('אין הרשאה לצפות ברשימת מבקרים. נא להזין קוד מנהל.')
      } else {
        console.error('Failed to fetch visitors')
      }
    } catch (error) {
      console.error('Error fetching visitors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewList = () => {
    if (!isViewAdmin) {
      // Show admin code input
      const code = prompt('יש להזין קוד מנהל לצפייה ברשימת מבקרים:')
      if (code) {
        setViewAdminCode(code)
        setIsViewAdmin(true)
        sessionStorage.setItem('viewAdminCode', code)
        setActiveView('list')
        fetchVisitors(code)
      }
    } else {
      setActiveView('list')
      fetchVisitors(viewAdminCode)
    }
  }

  const handleVisitorAdded = () => {
    if (isViewAdmin) {
      fetchVisitors(viewAdminCode)
      setActiveView('list')
    }
  }

  const handleVisitorDeleted = () => {
    if (isViewAdmin) {
      fetchVisitors(viewAdminCode)
    }
  }

  return (
    <div className="container">
      <header>
        <div className="brand brand-top">
          <img src="/logo.png" alt="לוגו אלטרה" className="logo" />
        </div>
        <h1>מערכת ניהול מבקרים</h1>
        <p>אלטרה - בקרת ביטחון ואישור מבקרים</p>

        <div className="view-toggle">
          <button
            type="button"
            className={`toggle-btn ${activeView === 'form' ? 'toggle-btn-active' : ''}`}
            onClick={() => setActiveView('form')}
          >
            הוסף ביקור חדש
          </button>
          <button
            type="button"
            className={`toggle-btn ${activeView === 'list' ? 'toggle-btn-active' : ''}`}
            onClick={handleViewList}
          >
            הצג רשימת מבקרים
          </button>
        </div>
      </header>

      <div className="content-wrapper single-column">
        {activeView === 'form' && (
          <section className="form-section">
            <h2>טופס רישום מבקר</h2>
            <VisitorForm onVisitorAdded={handleVisitorAdded} />
          </section>
        )}

        {activeView === 'list' && (
          <section className="table-section">
            <h2>רשימת מבקרים</h2>
            {loading ? (
              <div className="loading">טוען נתונים...</div>
            ) : (
              <VisitorsTable 
                visitors={visitors} 
                onVisitorDeleted={handleVisitorDeleted}
              />
            )}
          </section>
        )}
      </div>
    </div>
  )
}

export default App


