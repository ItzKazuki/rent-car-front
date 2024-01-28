import { useNavigate } from "react-router-dom";
import http, { cookie } from "../api/http";
import { useEffect } from "react";

export default function Logout() {
    const navigate = useNavigate();
    if(!cookie.get("token")) {
        navigate("/");
    }

    useEffect(() => {
        http.get("/auth/logout").then(res => {
            if(!res.message) {
                return;
            }
            cookie.remove("token");
            return navigate("/");
        })
    })
    return <h1>Logging out....</h1>;
}