import Veux from "vuex";

const createStore = () => {
    return new Veux.Store({
        state: {
            data: []
        },
        mutations: {
            changedata(state, data) {
                //console.log('mutations changedata ');
                //console.log(data);
                state.data = data;
            }
        },
        actions: {
            getdata({ commit }, username) {
                    //console.log('actions getdata ', username);
                    this.$axios.$get('/api/userdata/' + username).then((res) => {
                        //console.log(res.data.user);
                        commit('changedata', res.data.user);
                    }).catch(err => {
                        console.error(err);
                    });
            }
        },
        getters: {
            getdata: (state) => (state.data),
        }
    });
}

export default createStore;