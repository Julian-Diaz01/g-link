import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login.tsx'
import Home from './pages/Home/Home.tsx'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import PageStructure from './components/Page.tsx'

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
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>,
  ),
)

function App() {
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)
  console.log(analytics)
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
