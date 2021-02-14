import axios from "axios";

axios.defaults.withCredentials = false;

const axiosInstance = axios.create({
  // baseURL: "http://172.105.17.123:4100"
  // baseURL: "http://127.0.0.1:5001",
  // baseURL: "http://192.168.0.21:9876"
  // baseURL: "https://api.apps.com.pe"
  // baseURL: "http://192.168.0.33:9876"
  baseURL: `${process.env.API_URL}`
  // headers: {
  //   'Authorization': `Bearer ${this.$q.localStorage.getItem('_token')}`,
  // }
});

// // Add a request interceptor
// axiosInstance.interceptors.request.use((config) => {
//   // Do something before request is sent
//   return config;
// }, (error) => {
//   // Do something with request error
//
//   return Promise.reject(error);
// });
//
// // Add a response interceptor
// axiosInstance.interceptors.response.use((response: any) => {
//   // Do something with response data
//   return response;
// }, (error) => {
//   // Do something with response error
//
//   return Promise.reject(error);
// });

const axiosInstanceImagen = axios.create({
  // baseURL: "http://172.105.17.123:4100"
  // baseURL: "http://192.168.0.32:9876"
  // baseURL: "http://192.168.0.21:9876"
  // baseURL: "https://api.apps.com.pe"
  // baseURL: "http://192.168.0.33:9876"
  baseURL: `${process.env.Imagen_URL}`,
  headers: { Authorization: `${process.env.AUTH_BASIC}` }
});

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance;
};

export { axiosInstance, axiosInstanceImagen };
