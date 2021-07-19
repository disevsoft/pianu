export function authHeader() {
    // return authorization header with jwt token
    let user = localStorage.getItem('user');
    if(user){
        const userData = JSON.parse(user);
        if (userData && userData.token) {
            return { 'Authorization': 'Bearer ' + userData.token };
        } else {
            return {};
        }
    }else{
        return {};       
    }
}