import { createContext, useContext, useState, useEffect } from 'react'
import { getTranslation } from './translations'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Load from localStorage or default to Hebrew
    return localStorage.getItem('language') || 'he'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    // Update HTML dir attribute
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [language])

  const t = (key) => getTranslation(language, key)

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'he' ? 'en' : 'he')
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

