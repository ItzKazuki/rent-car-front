import { useNavigate } from "react-router-dom";
import { changeRp } from "../api/http";

export default function CarList({ id, title, description, price, photo }) {
    const navigate = useNavigate();

    const handleClick = (path, id) => navigate(path + id);

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mr-5 ">
            <div onClick={() => handleClick("/cars/", id)}>
                <img className="h-[200px]" src={photo} alt="photo_card" />
                <div className="px-6 py-4">
                    <h3 className="font-bold text-xl mb-2">{title}</h3>
                    <p className="text-gray-700 text-base mb-3">{description}</p>
                    <p className="text-gray-700 text-base font-semibold">{changeRp(price)}</p>
                </div>

            </div>
            <div className="mb-3 ml-6">
                <button className="inline-flex items-center px-2 py-2 text-sm font-medium text-white text-center bg-blue-700 rounded-lg hover:bg-blue-800" onClick={() => handleClick("/rent/", id)}>Rent Now!</button>
            </div>
        </div>
    );
}