import { userService } from '../services/user.service';
import  router  from '../router';

const userData = localStorage.getItem('user');
let user = {};
if(userData){
    try{
        user = JSON.parse(userData);        
    }
   catch(e){
       console.log(e); 
       user = {};     
   }
    
}
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        async login({ dispatch, commit }:any, user:any) { 
            const username = user.username;
            const password = user.password;
            commit('loginRequest', { username });
            try {
                const user = await userService.login(username, password);
                await commit('loginSuccess', user);
                router.push('/');
            }catch(e) {  
                const errMsg = e.message;                          
                await commit('loginFailure', errMsg);
                await dispatch('alert/error', errMsg, { root: true });
            }
                
        },
        logout({ commit }:any) {
            userService.logout();
            commit('logout');
            location.reload();
        }
    },
    mutations: {
        loginRequest(state:any, user:any) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state:any, user:any) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginFailure(state:any) {
            state.status = {};
            state.user = null;
        },
        logout(state:any) {
            state.status = {};
            state.user = null;
        }
    }
}
