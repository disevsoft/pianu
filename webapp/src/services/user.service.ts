import { authHeader } from '../helpers/authHeader';
export const userService = {
    login,
    logout,
    getAll
};

async function login(username:string, password:string) {
    console.log('login');
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    const response = await fetch('/api/md', requestOptions);
    const user = await handleResponse(response);
    // login successful if there's a jwt token in the response
    if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

async function getAll() {
    const requestOptions:any = {
        method: 'GET',
        headers: authHeader()
    };

    const response = await fetch('/api/md', requestOptions);
    return handleResponse(response);
}

function handleResponse(response:any) {
    return response.text().then((text:any) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}