import axios from "axios";
import { deleteToken, getAccessToken, getRefreshToken, saveToken } from "./serviceUtils";

let isAuthLogout = false;
let isRefreshing = false;
let isLogout = false;
let failedQueue = [];

const processQueue = ({ error, token }) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL_API,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
    },
});

axiosClient.interceptors.request.use(
    function (config) {
        if (!config.url?.includes("/token")) {
            config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

axiosClient.interceptors.response.use(
    response => {
        const url = response.config.url;
        if (url?.includes("/token")) {
            axiosClient.defaults.headers["Authorization"] =
                `Bearer ${response?.data?.access_token}`;
        }

        return response?.data ?? response;
    },
    async error => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            originalRequest.url !== "/logout" &&
            !isLogout
        ) {
            isLogout = true;
            try {
                await axiosClient({
                    method: "GET",
                    url: `/logout`,
                });
            } catch (error) {
                console.error(error);
            } finally {
                await deleteToken();
                window.location.href = window.location.origin + "/login";
            }
        }
        if (
            isAuthLogout &&
            error.response?.status === 403 &&
            originalRequest.url !== "/refresh-token"
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        if (originalRequest.headers) {
                            originalRequest.headers["Authorization"] =
                                `Bearer ${token}`;
                        }
                        return axios(originalRequest).then(res => {
                            return res?.data ?? res;
                        });
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise((resolve, reject) => {
                axiosClient
                    .get("/refresh-token", {
                        params: {
                            refresh_token: getRefreshToken(),
                        },
                    })
                    .then(async response => {
                        if (response.access_token) {
                            saveToken({
                                token: response.access_token,
                                refreshToken: response.refresh_token || "",
                            });
                            if (originalRequest.headers) {
                                originalRequest.headers["Authorization"] =
                                    `Bearer ${response.access_token}`;
                            }
                            processQueue({ token: response.access_token });
                            return resolve(axiosClient(originalRequest));
                        } else {
                            deleteToken();
                            window.location.href = window.location.origin + "/login";
                            await axiosClient({
                                method: "GET",
                                url: `/logout`,
                            });
                        }
                    })
                    .catch(err => {
                        processQueue({ error: err });
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }

        // Handle responses that are not 401 or are for refresh token request
        return Promise.reject(error);
    },
);

export default axiosClient;
