import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;

document.addEventListener("DOMContentLoaded", () => {
    const token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
});
