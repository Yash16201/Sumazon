const tokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null

const config  = {
    headers : {
        Authorization : `Bearer ${tokenFromLocalStorage !== null ? tokenFromLocalStorage.token : ""}`,
        Accept : "application/json"
    },
};

export default config;