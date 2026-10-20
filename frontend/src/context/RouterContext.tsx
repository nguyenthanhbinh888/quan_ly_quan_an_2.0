import React, { createContext, useContext, useState, useEffect } from 'react'

interface RouterContextType {
  path: string
  navigate: (newPath: string) => void
}

const RouterContext = createContext<RouterContextType | undefined>(undefined)

const normalizePath = (hash: string): string => {
  const clean = hash.replace(/^#/, '')
  return clean.startsWith('/') ? clean : `/${clean}`
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<string>(() => {
    return window.location.hash ? normalizePath(window.location.hash) : '/'
  })

  useEffect(() => {
    const handleHashChange = () => {
      setPath(normalizePath(window.location.hash))
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (newPath: string) => {
    const target = newPath.startsWith('/') ? newPath : `/${newPath}`
    window.location.hash = target
    setPath(target)
  }

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>
}

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider')
  }
  return context
}
