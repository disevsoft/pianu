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
        login({ dispatch, commit }:any, { username, password }:any) {
            commit('loginRequest', { username });

            userService.login(username, password)
                .then(
                    user => {
                        commit('loginSuccess', user);
                        router.push('/');
                    },
                    error => {
                        commit('loginFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
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
