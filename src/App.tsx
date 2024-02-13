import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login.tsx'
import Home from './pages/Home/Home.tsx'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import PageStructure from './components/Page.tsx'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
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
