import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Projects from './pages/Projects/Projects.tsx'
import Home from './pages/Home/Home.tsx'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import PageStructure from './components/Page.tsx'
import InteractiveBackground from './components/InteractiveBackground.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

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
    <Route path="/" element={<PageStructure />}>
      <Route index element={<Home />} />
      <Route path="projects" element={<Projects />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
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
