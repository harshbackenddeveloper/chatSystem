import axios from "axios";
export const makeApi = async (req, url, body) => {
    const getToken = localStorage.getItem('Usertoken')
    const previousUrl = "http://localhost:3020"
    var config = {
        method: req,
        url: previousUrl + url,
        data: body,
        headers: {
            Authorization: `Bearer ${getToken}`
        }
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}