
import axios from "axios";
import { AUTH_URL } from "../url";

const postSignIn = async (email:string, password:string) => {
    const response = await axios.post(
        `${AUTH_URL}/signin`,
        {
            email,
            password
        }
    ).then ( res => (res) // access_token
    ).catch ( e => e.response.data );

    return response;
};

export default postSignIn;