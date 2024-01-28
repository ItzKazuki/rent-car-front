import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http, { cookie } from "../api/http";
import Button from "../components/Button";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        // fetch to api
        setLoading(true);
        http.post("/auth/login", {username, password}).then(res => {
            // set cookie
            cookie.set('token', res.token)
            // set loading
            setLoading(false);
            // redirect home
            navigate("/");
        })
    }
    return (
        <div className="w-full h-full max-w-xl mx-auto">
            <div className="my-40 mx-auto">
                <h1 className="mb-4 text-4xl font-bold text-center ">Login</h1>
                <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-grey-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input onChange={e => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="username" name="username" placeholder="Username"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-grey-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" name="password" placeholder="******"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold">
                            {loading ?
                            "loading" :
                            "Login"}
                        </Button>
                        <a className="font-bold text-blue-500 inline-block align-baseline text-sm hover:text-blue-700">Forgot Password?</a>
                    </div>
                </form>
                <p className="text-gray-700 font-semibold text-center" >&copy; 2023 Kazukikun</p>
            </div>
        </div>
    );
}