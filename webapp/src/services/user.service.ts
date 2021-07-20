import { authHeader } from '../helpers/authHeader';
export const userService = {
    login,
    logout,
    getAll
};

async function login(username:string, password:string) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    const response = await fetch('/api/login', requestOptions);
    const user = await handleResponse(response);
    // login successful if there's a jwt token in the response
    if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
}

async function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

async function getAll() {
    const requestOptions:any = {
        method: 'GET',
        headers: authHeader()
    };

    const response = await fetch('/api/md', requestOptions);
    return await handleResponse(response);
}

async function handleResponse(response:any) {
    
    const text = await response.text();
    const data = text && await JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload();
            }
            const error = (data && data.message) || response.statusText;
            
            throw new Error(error);
        }
        return data;
}