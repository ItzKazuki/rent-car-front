import { useNavigate } from "react-router-dom";

export default function Button({ children, to, className, disabledBtn = false }) {
    const navigate = useNavigate();
    const handleBtnClick = (path) => navigate(path);

    return (
        <button className={`px-[36px] py-[10px] rounded-[47px] ${className}`} onClick={() => handleBtnClick(to)} disabled={disabledBtn}>
            { children }
        </button>
    );
}