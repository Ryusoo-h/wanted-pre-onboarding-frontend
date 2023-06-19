
import axios from "axios";
import { AUTH_URL } from "../url";
import { SignInDataType } from "../../types/todoList";

const postSignIn = async (email:string, password:string) => {
    const response:SignInDataType = await axios.post(
        `${AUTH_URL}/signin`,
        {
            email,
            password
        }
    ).then ( res => ({ statusCode: res.status, access_token: res.data.access_token })
    ).catch ( e => e.response.data);

    return response;
};

export default postSignIn;