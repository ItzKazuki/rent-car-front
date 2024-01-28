import { useEffect, useState } from "react";
import http, { cookie } from '../api/http';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "./Home";
import AvailableCars from "./AvailableCars";
import CarInfo from "./CarInfo";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Rent from "./Rent";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/cars" element={<AvailableCars/>}/>
                <Route path="/cars/:id" element={<CarInfo/>}/>
                <Route path="/rent" element={<Rent/>}/>
                <Route path="/auth/login" element={<Login/>}/>
                <Route path="/auth/register" element={<Register/>}/>
                <Route path="/auth/logout" element={<Logout/>}/>
                <Route path="*" element={<h1>Not Found</h1>}/>
            </Routes>
        </BrowserRouter>
    );
}

export function Page({ children }) {
    const { pathname } = useLocation();
    const [user, setUser] = useState({});
    useEffect(() => {
        if(!cookie.get("token")) {
            setUser({});
            return;
        }
        http.get("/user/info").then(data => setUser(data.user));
    }, [setUser]);
    return (
        <>
            <Navbar activePath={pathname} user={user}/>
            <div className="mt-4 mr-8 ml-8">
                { children }
            </div>
        </>
    )
}