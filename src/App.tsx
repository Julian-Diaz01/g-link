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
  apiKey: 'AIzaSyCJsDstMAzyu8zVjXS-0ULxoA9y_SDYk68',
  authDomain: 'myportfolio-16d89.firebaseapp.com',
  projectId: 'myportfolio-16d89',
  storageBucket: 'myportfolio-16d89.appspot.com',
  messagingSenderId: '252505600556',
  appId: '1:252505600556:web:2db99446336490bbdbd789',
  measurementId: 'G-PE794FJPE6',
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
