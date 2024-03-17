import { useNavigate } from "react-router-dom";

export default function ErrorCode({ code }) {
    switch(code) {
        case 404: 
            return <NotFound />
        case 401:
            return <NotAllowed />
        case 403:
            return <Forbidden />
        default:
            return <h1>Something Error</h1>
    }
}

const ErrStyle = "text-5xl font-bold text-center my-[270px]";

function NotFound() {
    return <h1 className={ErrStyle}>Not Found, <span className="text-red-600">404</span></h1>
}

function Forbidden() {
    const navigate = useNavigate();
    setTimeout(() => navigate("/auth/login", {replace: true}), 1000);
}

function NotAllowed() {
    return <h1 className={ErrStyle}>Not Allowed, <span className="text-red-600">401</span></h1>
}