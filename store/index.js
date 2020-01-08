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
                //console.log('mutations changedata ');
                //console.log(data);
                state.data = data;
            }
            , changelang(state, lang) {
                //console.log('mutations changedata ');
                //console.log(data);
                state.data.preferedlang = lang;
            }
        }
        export const actions = {
            changelang({ commit }, lang) {   
                    commit('changelang', lang);
            },
            getdata({ commit }, username) {
                    //console.log('actions getdata ', username);
                    this.$axios.$get('/api/userdata/' + username).then((res) => {
                        //console.log(res.data.user);
                        commit('changedata', res.data.user);
                    }).catch(err => {
                        console.error(err);
                    });
            }
        }
        export const getters = {
            getdata: (state) => (state.data),
        }
//     });
// }

// export default createStore;