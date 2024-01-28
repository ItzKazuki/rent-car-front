import { useEffect, useState } from "react";
import http, { cookie } from '../api/http';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "./Home";
import AvailableCars from "./AvailableCars";
import CarInfo from "./CarInfo";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Rent from "./Rent";
import CreateCar from './dashboard/CreateCar';
import CreateRent from './dashboard/CreateRent';
import About from "./About";
import Dashboard from "./dashboard/Dashboard";
import ErrorCode from "../components/ErrorCode";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/cars" element={<AvailableCars/>}/>
                <Route path="/cars/:id" element={<CarInfo/>}/>
                <Route path="/rent" element={<Rent/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/auth/login" element={<Login/>}/>
                <Route path="/auth/register" element={<Register/>}/>
                <Route path="/auth/logout" element={<Logout/>}/>
                <Route element={<AdminRoute/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/dashboard/car/create" element={<CreateCar/>}/>
                    <Route path="/dashboard/rent/create" element={<CreateRent/>}/>
                </Route>
                <Route path="*" element={<ErrorCode code={404} />}/>
            </Routes>
        </BrowserRouter>
    );
}

const AdminRoute = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(!cookie.get("token")) {
            setUser({});
            setLoading(false);
            return;
        }
        http.get("/user/info").then(data => {
            setUser(data.user);
            setLoading(false);
        });
    }, [setUser]);

    if(loading) return;

    if(!user.is_admin) return <ErrorCode code={401} />;

    return <Outlet/>;
}

export function Page({ children }) {
    const { pathname } = useLocation();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(!cookie.get("token")) {
            setUser({});
            setLoading(false);
            return;
        }
        http.get("/user/info").then(data => {
            setUser(data.user);
            setLoading(false);
        });
    }, [setUser]);

    if(loading) return;

    return (
        <>
            <Navbar activePath={pathname} user={user}/>
            <div className="mt-4 mr-8 ml-8">
                { children }
            </div>
        </>
    )
}