import { useEffect, useState } from "react";
import http from "../../api/http";

export default function AccountInfo() {

    const [user, setUser] = useState({});
    useEffect(() => {
        http.get("/user/info").then(data => {
            setUser(data.user);
        });
    }, [setUser]);

    console.log(user)

    return (
        <div>
            <h1>Your account</h1>
            <p>Nama: {user.name}</p>
            <p>Birthday: {user.birthday}</p>
            <p>Nama: </p>
            <p>Nama: </p>
            <p>Nama: </p>
            <p>Nama: </p>
            <p>Nama: </p>
        </div>
    );
}