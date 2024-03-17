import { useNavigate } from "react-router-dom";
import http, { cookie } from "../../api/http";
import { useEffect } from "react";

export default function Logout() {
    const navigate = useNavigate();
    if(!cookie.get("token")) {
        navigate("/", { replace: true });
    }

    useEffect(() => {
        http.get("/auth/logout").then(res => {
            if(!res.message) {
                return;
            }
            cookie.remove("token");
            return navigate("/", { replace: true });
        }).catch(err => {
            console.error(err)
            alert("failed logging out, please check logs!")
        })
    })
    return <h1>Logging out....</h1>;
}