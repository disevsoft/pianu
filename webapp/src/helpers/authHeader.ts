export function authHeader() {
    // return authorization header with jwt token
    const user = localStorage.getItem('user');
    const headers = new Headers();
    if(user){
        const userData = JSON.parse(user);
        if (userData && userData.token) {
            headers.set('x-access-token', userData.token)
        }  
    }
    return headers;
}