import React from 'react'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import '@/styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark

    setIsDarkMode(isDark)
    updateTheme(isDark)
  }, [])

  const updateTheme = (isDark: boolean) => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const toggleTheme = () => {
    const newIsDark = !isDarkMode
    setIsDarkMode(newIsDark)
    updateTheme(newIsDark)
  }

  // Prevent hydration mismatch
  if (!isHydrated) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-dark-neutral-50 transition-colors duration-200">
      <Component {...pageProps} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </div>
  )
}

export default App
