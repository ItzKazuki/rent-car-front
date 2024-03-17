import Cookies from "universal-cookie";

const backendUrl = "http://backend-lks.kazukikun.space/a1"; // set your backend here!
export const cookie = new Cookies();

export function changeRp(num) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(num);
}

async function get(path) {
    const token = cookie.get('token');
    let headers = {
        'Content-Type': 'application/json'
    };

    if(token) headers["Authorization"] = `Bearer ${token}`

    const response = await fetch(backendUrl + path, {
        method: 'GET',
        headers
    });

    if(!response.ok) throw response.status == 503 ? { error: response.statusText } : await response.json();
    console.log(response)

    return await response.json();
}

async function post(path, data) {
    const token = cookie.get("token");
    
    let headers = {
        'Content-Type': 'application/json'
    };

    if(token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(backendUrl + path, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    });
    console.log(response)

    if(!response.ok) throw response.status == 503 ? { error: response.statusText } : await response.json();

    return await response.json();
}

async function patch(path, data) {
    try {
        const token = cookie.get("token");
        if(!token) throw "Token Missing!";
        const response = await fetch(backendUrl + path, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        if(!response.ok) throw await response;
        return await response.json();
    } catch(err) {
        console.log(err);
        return err;
    }
}

async function deleteMethod(path, data) {
    try {
        const token = cookie.get('token');

        if(!token) throw "Token Missing!";

        const response =await  fetch(backendUrl + path, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok) throw await response;
        return await response.json();
    } catch (err) {
        console.error(err);
        return err;
    }
}

export default {
    get,
    post,
    patch,
    delete: deleteMethod,
}