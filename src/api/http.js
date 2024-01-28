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
    try {
        const token = cookie.get('token');
        let headers;

        if(!token) {
            headers = {
                'Content-Type': 'application/json'
            }
        } else {
            headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        const response = await fetch(backendUrl + path, {
            method: 'GET',
            headers
        });

        if(!response.ok) throw response.code;

        return response.json();
    } catch(err) {
        console.error(err);
        throw err;
    }
}

async function post(path, data) {
    try {
        const token = cookie.get('token');
        let headers;

        if(!token) {
            headers = {
                'Content-Type': 'application/json'
            }
        } else {
            headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        const response = await fetch(backendUrl + path, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        if(!response.ok) throw response.code;

        return response.json();
    } catch(err) {
        console.error(err);
        throw err;
    }
}

async function patch(path, data) {
    try {
        const token = cookie.get("token");
        if(!token) throw "Token Missing!";
        const response = await fetch(backendUrl + path, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        if(!response.ok) throw response.code;
        return response.json();
    } catch(err) {
        console.log(err);
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
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        });

        if(!response.ok) throw response.code;
        return response.json();
    } catch (err) {
        console.error(err);
    }
}

export default {
    get,
    post,
    patch,
    delete: deleteMethod,
}