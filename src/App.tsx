import React, { Suspense } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import PageStructure from './pages/Wireframe/Page.tsx'
import InteractiveBackground from './components/InteractiveBackground.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import Home from './pages/Home/Home.tsx'

// Lazy load routes for code splitting
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
      <Route path="/" element={<PageStructure />}>
        <Route index element={<Home />} />
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
