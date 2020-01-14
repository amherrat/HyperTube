// import Veux from "vuex";
import createPersistedState from "vuex-persistedstate";

// const createStore = () => {
//     return new Veux.Store({
        export const state = () => ({
            data: [],
            token: ''
        })
        export const plugins = [createPersistedState()]
        export const mutations = {
            changedata(state, data) {
                state.data = data;
            }
            , changelang(state, lang) {
                state.data.preferedlang = lang;
            },
            changeToken(state){
                state.token = localStorage.getItem('token');
            }
        }
        export const actions = {
            changelang({ commit }, lang) {   
                    commit('changelang', lang);
            },
            deleteToken({ commit }){
                localStorage.removeItem('token');
            },
            changeToken({ commit }){
                commit('changeToken');
            },
            getdata({ commit }, username) {
                return (new Promise((resolve, reject) => {
                    this.$axios.$get('/api/userdata/' + username).then((res) => {
                            commit('changedata', res.data.user);
                            resolve(res.data.user);
                        }).catch(err => {
                            // console.error(err);
                            localStorage.removeItem('token');
                            this.$router.push('/');
                            reject(err);
                        });

                })); 
            }
        }
        export const getters = {
            getdata: (state) => (state.data),
        }
//     });
// }

// export default createStore;