import Axios from "axios";

const getAllCountries = () => Axios.get("https://restcountries.com/v3.1/all");

export {
    getAllCountries,
};