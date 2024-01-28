import { useEffect, useState } from "react";
import http from "../api/http";
import { Page } from "./App";
import CarList from "../components/CarList";

export default function AvailableCars() {
    const [cars, setCars] = useState([]);

    // function handleClick(id) {
    //     // navigate("/car/" + id)
    //     window.location.href = "/car/" + id;
    // }

    useEffect(() => {
        //het from api
        http.get("/car/show").then(data => {
            setCars(data.cars)
        })
    }, [setCars]);
    
    return (
        <Page>
            <h3 className="text-3xl font-bold">Available cars</h3>
            <p>Rent your car now!</p>
            <div className="flex flex-row flex-wrap justify-center">
                {cars.map(car => (
                    <CarList 
                    key={car.id}
                    id={car.id}
                    title={car.name}
                    photo={car.car_photo}
                    description={car.description}
                    price={car.price}/>
                ))}
            </div>
        </Page>
    );
}