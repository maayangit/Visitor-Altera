import { useState, useEffect } from 'react'
import './App.css'
import VisitorForm from './components/VisitorForm'
import VisitorsTable from './components/VisitorsTable'
import { LanguageProvider, useLanguage } from './LanguageContext'

function AppContent() {
  const { t, language, toggleLanguage } = useLanguage()
  const [visitors, setVisitors] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState('form') // 'form' | 'list' - default to form
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
        alert(t('admin.viewError'))
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
      const code = prompt(t('admin.viewPrompt'))
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
        <div className="header-top">
          <div className="brand brand-top">
            <img src="/logo.png" alt="Altera Logo" className="logo" />
          </div>
          <button 
            type="button" 
            className="language-toggle"
            onClick={toggleLanguage}
            title={language === 'he' ? 'Switch to English' : 'החלף לעברית'}
          >
            {language === 'he' ? 'EN' : 'עב'}
          </button>
        </div>
        <div className="header-content">
          <div>
            <h1>{t('app.title')}</h1>
            <p>{t('app.subtitle')}</p>
          </div>
        </div>

        <div className="view-toggle">
          <button
            type="button"
            className={`toggle-btn ${activeView === 'form' ? 'toggle-btn-active' : ''}`}
            onClick={() => setActiveView('form')}
          >
            {t('app.addVisit')}
          </button>
          <button
            type="button"
            className={`toggle-btn ${activeView === 'list' ? 'toggle-btn-active' : ''}`}
            onClick={handleViewList}
          >
            {t('app.viewList')}
          </button>
        </div>
      </header>

      <div className="content-wrapper single-column">
        {activeView === 'form' && (
          <section className="form-section">
            <h2>{t('form.title')}</h2>
            <VisitorForm onVisitorAdded={handleVisitorAdded} />
          </section>
        )}

        {activeView === 'list' && (
          <section className="table-section">
            <h2>{t('table.title')}</h2>
            {loading ? (
              <div className="loading">{t('table.loading')}</div>
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

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App


