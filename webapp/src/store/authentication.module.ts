import { userService } from '../services/user.service';
import  router  from '../router';

const user = localStorage.getItem('user');
let userData = {};
if(user){
    userData = JSON.parse(user);
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
                const userData = await userService.login(username, password);
                await commit('loginSuccess', userData);
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
