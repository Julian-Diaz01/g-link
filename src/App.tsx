import React, { Suspense } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import theme from './theme.tsx'
import InteractiveBackground from './components/InteractiveBackground.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

// Lazy load routes for code splitting
const PageStructure = React.lazy(() => import('./pages/Wireframe/Page.tsx'))
const Home = React.lazy(() => import('./pages/Home/Home.tsx'))
const Projects = React.lazy(() => import('./pages/Projects/Projects.tsx'))
const PortfolioDesign = React.lazy(() => import('./pages/Version2/version2'))

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Version2 is now the default */}
      <Route
        path="/"
        element={
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="text-lg">Loading Portfolio...</div>
              </div>
            }
          >
            <PortfolioDesign />
          </Suspense>
        }
      />
      {/* Old version accessible at /home */}
      <Route
        path="/home"
        element={
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading Version 1...</div>
              </div>
            }
          >
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <PageStructure />
            </ThemeProvider>
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-lg">Loading Home...</div>
                </div>
              }
            >
              <Home />
            </Suspense>
          }
        />
        <Route
          path="projects/*"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-lg">Loading Projects...</div>
                </div>
              }
            >
              <Projects />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Keep /version2 as alias for backwards compatibility */}
      <Route
        path="/version2"
        element={
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="text-lg">Loading Portfolio...</div>
              </div>
            }
          >
            <PortfolioDesign />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </>,
  ),
)

function App() {
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)
  console.log(analytics)
  return (
    <>
      <InteractiveBackground />
      <RouterProvider router={router} />
    </>
  )
}

export default App
