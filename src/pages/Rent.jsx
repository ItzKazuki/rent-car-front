import { useEffect, useState } from "react";
import { Page } from "./App";
import http, { changeRp } from "../api/http";

export default function Rent() {
    const [rents, setRents] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        http.post("/rent/show", {}).then(res => {
            setRents(res.rent);
            setLoading(true);
        });
    }, [setRents]);

    return (
        <Page>
            <h1>You Rent List:</h1>
            {rents.map(rent => (
                <div key={rent.id} className="mx-8 my-5">
                    <p>Car Name: </p>
                    <p>Rent Name: {rent.rent_name}</p>
                    <p>Price: {changeRp(rent.total_price)}</p>
                    <p>Discount: {changeRp(rent.discount)}</p>
                    <p>Down Payment: {changeRp(rent.down_payment)}</p>
                    <p>Return Date: {rent.date_return}</p>
                    <p>Must Pay: {changeRp(rent.total_price - rent.discount - rent.down_payment)}</p>
                </div>
            ))}
        </Page>
    );
}