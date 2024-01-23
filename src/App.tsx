import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from "./pages/auth/Login.tsx";
import Home from "./pages/Home/Home.tsx";
import Header from "./components/nav/NavHeader.tsx";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Header/>}>
            <Route index element={<Home/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
        </Route>
    )
)

function App() {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App;