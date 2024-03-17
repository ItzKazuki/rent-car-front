import { Link } from "react-router-dom"
import Button from "./Button"

export default function Navbar({ activePath, user }) {
    const userPath = [
        {
            path: '/',
            name: 'Home'
        },        
        {
            path: '/cars',
            name: 'Available Cars'
        },
        {
            path: '/about',
            name: 'About Us'
        },
    ]
    return (
        <nav className="flex justify-center h-[80px] bg-slate-200">
            <div className="w-[1240px] flex items-center justify-between">
                <div className="flex justify-center">
                    <img src="vite.svg" alt="" />
                    <h3 className="text-3xl ml-8 font-semibold">Rent Car</h3>
                </div>
                <div className={`flex w-[380px] justify-between text-xl`}>
                    {userPath.map(path => {
                        return <Link key={path.name} to={path.path} className={activePath === path.path ? "text-blue-700" : "" }>{path.name}</Link>
                    })}
                    {/* <Link to="/" className={activePath === "/" ? "text-blue-700" : "" }>Home</Link>
                    <Link to="/cars" className={activePath === "/cars" ? "text-blue-700" : "" }>Available Cars</Link>
                    <Link to="/about" className={activePath === "/about" ? "text-blue-700" : "" }>About Us</Link> */}
                    {user.name ? (  
                            <Link to="/rent" className={activePath === '/rent' ? "text-blue-700" : "" }>You Rent</Link>
                    ) : ""}
                </div>
                {user.name ?
                (
                    <div className="w-[280px] flex justify-between">
                        {user.is_admin ? (
                            <Button to="/dashboard" className="bg-blue-500 hover:bg-blue-700">
                                <p className="text-white">Dashboard</p>
                            </Button>
                        ): ""}
                        <Button to="/auth/logout" className="bg-blue-200 hover:bg-blue-400">
                            <p className="text-blue-700">Logout</p>
                        </Button>
                    </div>
                ) :
                (
                    <div className="w-[280px] flex justify-between">
                        <Button to="/auth/login" className="bg-blue-200 hover:bg-blue-400">
                            <p className="text-blue-700">Login</p>
                        </Button>
                        <Button to="/auth/register" className="bg-blue-500 hover:bg-blue-700">
                            <p className="text-white">Register</p>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    )
}