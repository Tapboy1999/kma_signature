import axios from "axios";

export async function post_data_axios(url, params) {
    try {
        const domain = 'http://kmakyso.online:8000/' ;
        const urlRequest = domain + url;
        const response = await axios.post(urlRequest, params);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export async function get_data_axios(url, params) {

}