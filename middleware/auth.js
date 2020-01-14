import axios from 'axios'
export default async function ({ route, store, redirect }) {
    store.dispatch("changeToken");
    var routes = [
        "home",
        "movie-id",
        "video-hash",
        "profile-login",
        "settings",
        "settings-update_password"
    ]
    var token = store.state.token;
    if (routes.includes(route.name)) {
        try {
            let res = await axios.get(`/api/whoAmi/${token}`);
            if (res.data.success){
                await store.dispatch("getdata", res.data.data.user);
            }
            else {
                await store.dispatch("deleteToken");
                redirect('/login');
            }
        } catch (error) {
            store.dispatch("deleteToken");
            redirect('/login');
        }
    }
}
