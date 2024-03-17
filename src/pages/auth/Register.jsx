import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import http, { cookie } from "../../api/http";

export default function Register() {
    const [userForm, setUserForm] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = e => setUserForm({
        ...userForm,
        [e.target.name]: e.target.value
    });

    // biar ga login2x
    useEffect(() => {
        if(cookie.get("token")) navigate("/", { replace: true });
    })

    const handleSubmit = e => {
        e.preventDefault();

        // set loading true
        setLoading(true);
        // post data
        http.post("/auth/register", userForm).then((res) => {
            //set loading false
            console.log(res)
            setLoading(false);
            navigate("/", { replace: true });
        }).catch((err) => {
            alert(err.error);
        });
    }

    return (
        <div className="w-full h-full max-w-xl mx-auto">
            <div className="my-10 mx-auto">
                <h1 className="mb-4 text-4xl font-bold text-center ">Register</h1>
                <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-grey-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="name" name="name" placeholder="Name"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-grey-700 text-sm font-bold mb-2" htmlFor="nik">Nik</label>
                        <input onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="nik" name="nik" placeholder="****************"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-grey-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="username" name="username" placeholder="Username"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-grey-700 text-sm font-bold mb-2" htmlFor="telephone">Telephone</label>
                        <input onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="telephone" name="telephone" placeholder="081234567890"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-grey-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="email" name="email" placeholder="someone@domain.tld"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-grey-700 text-sm font-bold mb-2" htmlFor="birthday">Date of Birth</label>
                        <input onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" id="birthday" name="birthday"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-grey-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" name="password" placeholder="******"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold" disabledBtn={loading ? true : false}>
                            {loading ?
                            "loading" :
                            "Register"}
                        </Button>
                        <a className="font-bold text-blue-500 inline-block align-baseline text-sm hover:text-blue-700">Forgot Password?</a>
                    </div>
                </form>
                <p className="text-gray-700 font-semibold text-center" >&copy; 2023 Kazukikun</p>
            </div>
        </div>
    );
}