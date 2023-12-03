
const SERVER_URL : string = "http://localhost:3000"

export async function get<T>(url : string) : Promise<T> {
    const api : string = SERVER_URL + url; 

    return (await fetch(api)).json();
}

export async function post<T, K>(url : string, data : T) : Promise<K> {
    const api : string = SERVER_URL + url

    return (await fetch(api, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })).json();
}