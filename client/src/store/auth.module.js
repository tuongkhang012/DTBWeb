import AuthService from "../services/auth.services";

const user = JSON.parse(localStorage.getItem("user"));

export const auth = {
    namespaced: true,
    state() {
        return user
            ? { status: { loggedIn: true }, user }
            : { status: { loggedIn: false }, user: null };
    },
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                (user) => {
                    return new Promise((resolve) => {
                        commit("loginSuccess", user);
                        resolve(user);
                    });
                },
                (error) => {
                    commit("loginFailure");
                    return Promise.reject(error);
                }
            );
        },

        logout({ commit }) {
            AuthService.logout();
            commit("logout");
        },

        register({ commit }, user) {
            return AuthService.register(user).then(
                (response) => {
                    commit("registerSuccess");
                    return Promise.resolve(response.data);
                },
                (error) => {
                    commit("registerFailure");
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        },
    },
};