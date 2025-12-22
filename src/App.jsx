import { useState, useEffect } from 'react'
import './App.css'
import VisitorForm from './components/VisitorForm'
import VisitorsTable from './components/VisitorsTable'

function App() {
  const [visitors, setVisitors] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch visitors from API
  const fetchVisitors = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/visitors')
      if (response.ok) {
        const data = await response.json()
        setVisitors(data)
      } else {
        console.error('Failed to fetch visitors')
      }
    } catch (error) {
      console.error('Error fetching visitors:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVisitors()
  }, [])

  const handleVisitorAdded = () => {
    fetchVisitors()
  }

  const handleVisitorDeleted = () => {
    fetchVisitors()
  }

  return (
    <div className="container">
      <header>
        <h1>מערכת ניהול מבקרים</h1>
        <p>אלטרה - בקרת ביטחון ואישור מבקרים</p>
      </header>

      <div className="content-wrapper">
        <section className="form-section">
          <h2>טופס רישום מבקר</h2>
          <VisitorForm onVisitorAdded={handleVisitorAdded} />
        </section>

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
      </div>
    </div>
  )
}

export default App


