import Cookies from "universal-cookie";

const backendUrl = "http://backend-lks.kazukikun.space/a1";
export const cookie = new Cookies();

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

        return response.json();
    } catch(err) {
        console.error(err);
        throw err;
    }
}

export default {
    get,
    post
}