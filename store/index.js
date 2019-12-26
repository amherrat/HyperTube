import Veux from "vuex";

const createStore = () => {
    return new Veux.Store({
        state: {
            data: []
        },
        mutations: {
            changedata(state, data) {
                console.log('mutations changedata ');
                console.log(data);
                state.data = data;
                return;
            }
        },
        actions: {
            getdata({ commit }, username) {
                return new Promise(async (resolve, reject) => {
                    console.log('actions getdata ', username);
                    await this.$axios.$get('/api/userdata/' + username).then(async (res) => {
                        console.log(res.data.user);
                        await commit('changedata', res.data.user);
                        resolve();
                    }).catch(err => {
                        console.error(err);
                        reject();
                    });
                });
            }
        },
        getters: {
            getdata: state => {
                return state.data;
            }
        }
    });
}

export default createStore;