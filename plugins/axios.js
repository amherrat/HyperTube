export default function ({ $axios }) {
    $axios.onRequest( (config) => {
      if (window.localStorage.getItem('token')) {
        config.headers.common['x-access-token'] = window.localStorage.getItem('token');
      }
    })
  }