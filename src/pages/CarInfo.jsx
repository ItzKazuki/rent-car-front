import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../api/http";

export default function CarInfo() {
    const { id } = useParams();
    const [car, setCar] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = (path, id) => navigate(path + id);

    useEffect(() => {
        http.post("/car/show", {car_id: id}).then(res => {
            setLoading(true);
            setCar(res.car);
            setLoading(false)
        })
    }, [setCar]);

    return (
        <div className="w-full h-full max-w-xl mx-auto">
            <div className="my-40 mx-auto">
            {loading ? "getting data" : (
                <>
                <h1 className="inline-block mb-5 font-bold text-4xl text-center">Car Info</h1>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img src={car.car_photo} alt="photo_car" />
                    <div className="my-5 mx-5">
                        <p>Name: {car.name}</p>
                        <p>Manufacture: {car.manufacture}</p>
                        <p>Description: {car.description}</p>
                        <p>Price: {car.price}</p>
                    </div>
                    <div className="mb-5 mx-[120px]">
                        <button className="inline-flex items-center px-5 py-2 text-sm font-medium text-white text-center bg-blue-700 rounded-lg hover:bg-blue-800" onClick={() => handleClick("/rent/", car.id)}>Rent Now!</button>
                    </div>
                </div>
                </>
            )}
            </div>
        </div>
    );
}