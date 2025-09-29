import axios from "axios";
import Cookies from "js-cookie";
//import https from "https";
// variable for Docker container

// queueing request variable
let authTokenRequest;
let domain = window.location.hostname;
//let port = '8015'
let uri = '/api/'
//
let url = 'https://' + domain;
//let url = 'http://' + domain +':8015'
//
//console.log("PISC api call", url);
let axiosInstance;

axiosInstance = axios.create({
  //httpsAgent: new https.Agent({  
  //  rejectUnauthorized: false
 /// }),
  // modify before going to production
  ///baseURL: "http://127.0.0.1:8012",
  //baseURL: "http://localhost:8004",
  baseURL:  url,
  //baseURL: "https://vmwres-outi055/api/",
  //baseURL: "http://res-outi055/",
  https: true,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "X-CSRFTOKEN": Cookies.get("csrftoken"),
  },
  withCredentials: true,
  credentials: "include",
  xsrfHeaderName: "X-CSRFTOKEN", //"X-CSRFTOKEN",
  xsrfCookieName: "csrftoken",
});

// This function makes a call to get the auth token
// or it returns the same promise as an in-progress call to get the auth token
function getAuthToken() {
  if (!authTokenRequest) {
    authTokenRequest = axiosInstance.post("api_auth/token/refresh/");
    //authTokenRequest = axiosInstance.post("authentication/token/refresh/");

    authTokenRequest.then(resetAuthTokenRequest, resetAuthTokenRequest);
  }

  return authTokenRequest;
}

function resetAuthTokenRequest() {
  authTokenRequest = null;
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  function (error) {
    const originalRequest = error;

    // Check if refresh_token has expired;

    if (
      error.response.status === 401 &&
      //originalRequest.config.url === "authentication/token/refresh/"
      originalRequest.config.url === "api_auth/token/refresh/"
    ) {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      localStorage.clear();
      window.location = "/";
    }

    if (
      error.response.status === 401 &&
      !originalRequest.config._retry &&
      error.response.data.detail !==
        "No active account found with the given credentials"
    ) {
      return getAuthToken().then((response) => {
        originalRequest.config._retry = true;
        return axiosInstance(originalRequest.config);
      });
    }
    return Promise.reject(error); 
  }
);

export default axiosInstance;
