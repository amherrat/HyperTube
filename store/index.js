// import Veux from "vuex";
import createPersistedState from "vuex-persistedstate";

// const createStore = () => {
//     return new Veux.Store({
        export const state = () => ({
            data: []
        })
        export const plugins = [createPersistedState()]
        export const mutations = {
            changedata(state, data) {
                state.data = data;
            }
            , changelang(state, lang) {
                state.data.preferedlang = lang;
            }
        }
        export const actions = {
            changelang({ commit }, lang) {   
                    commit('changelang', lang);
            },
            getdata({ commit }, username) {
                    this.$axios.$get('/api/userdata/' + username).then((res) => {
                        commit('changedata', res.data.user);
                    }).catch(err => {
                        // console.error(err);
                        localStorage.removeItem('token');
                        this.$router.push('/');
                    });
            }
        }
        export const getters = {
            getdata: (state) => (state.data),
        }
//     });
// }

// export default createStore;