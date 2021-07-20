export function authHeader() {
    // return authorization header with jwt token
    const user = localStorage.getItem('user');
    if(user){
        const userData = JSON.parse(user);
        if (userData && userData.token) {
            return { 'x-access-token': userData.token };
        } else {
            return {};
        }
    }else{
        return {};      
    }
}