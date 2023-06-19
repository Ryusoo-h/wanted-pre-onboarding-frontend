
import axios from "axios";
import { AUTH_URL } from "../url";

const postSignUp = async (email:string, password:string) => {
    const response = await axios.post(
        `${AUTH_URL}/signup`,
        {
            email,
            password
        }
    ).then ( res => ({ statusCode: 201 })
    ).catch ( e => e.response.data );

    return response;
};

export default postSignUp;