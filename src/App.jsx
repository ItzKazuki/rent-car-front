import { useEffect, useState } from "react";
import http, { cookie } from './api/http';
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { Navbar, ErrorCode } from "./components";
import { About, AvailableCars, CarInfo, Home, Rent, Login, Register, Logout, Dashboard, AccountInfo, CreateCar, CreateRent } from "./pages";


export default function App() {
    return (
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
                <Route path="/dashboard/" element={<Dashboard/>}/>
                <Route path="/dashboard/account" element={<AccountInfo/>}/>
                <Route path="/dashboard/car/create" element={<CreateCar/>}/>
                <Route path="/dashboard/rent/create" element={<CreateRent/>}/>
            </Route>
            <Route path="*" element={<ErrorCode code={404} />}/>
        </Routes>
    );
}

// export default function App() {
//     const routers = createBrowserRouter([
//         {
//             path: '/',
//             element: <Home />
//         },
//         {
//             path: '/cars',
//             element: <AvailableCars />,
//             children: [
//                 {
//                     path: '/cars/:car_id',
//                     element: <CarInfo />
//                 }
//             ]
//         },
//         {
//             path: '/about',
//             element: <About />
//         },
//         {
//             path: '/rent',
//             element: <Rent />
//         },
//         {
//             path: '/auth',
//             element: <ErrorCode code={404} />,
//             children: [
//                 {
//                     path: '/auth/login',
//                     element: <Login />
//                 },
//                 {
//                     path: '/auth/register',
//                     element: <Register />
//                 },
//                 {
//                     path: '/auth/logout',
//                     element: <Logout />
//                 },
//             ]
//         },
//         {
//             path: '/dashboard',
//             element: <ProtectedRoute>
//                 <Dashboard />
//             </ProtectedRoute>,
//             children: [
//                 {
//                     path: '/dashboard/account',
//                     element: <AccountInfo />
//                 }
//             ]
//         }
//     ]);

//     return (
//         <AuthProvider>
//             <RouterProvider router={routers} />
//         </AuthProvider>
//     );
// }

// function ProtectedRoute({children}) {
//     const user = useAuth();
//     const navigate = useNavigate();
//     if(user === null) {
//         navigate("/", { replace: true })
//     }

//     return children;
// }

const AdminRoute = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(!cookie.get("token")) {
            setUser({});
            setLoading(false);
            return <ErrorCode code={404} />;
        }

        http.get("/user/info").then(data => {
            setUser(data.user);
            setLoading(false);
        }).catch(err => {
            alert(err.error);
        })
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
            // idk how to handle error
        }).catch(err => {
            console.log(err);
            alert(err.error);
        })
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