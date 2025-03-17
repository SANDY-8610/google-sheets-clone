import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}/data`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const updateCell = async (cell, value) => {
    try {
        const response = await axios.post(`${API_URL}/update`, { cell, value });
        return response.data;
    } catch (error) {
        console.error("Error updating cell:", error);
        return null;
    }
};
