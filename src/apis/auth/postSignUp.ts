
import axios from "axios";
import { AUTH_URL } from "../url";
import { SignUpDataType } from "../../types/todoList";

const postSignUp = async (email:string, password:string) => {
    const response:SignUpDataType = await axios.post(
        `${AUTH_URL}/signup`,
        {
            email,
            password
        }
    ).then ( res => ({ statusCode: 201, message: "회원가입 성공" })
    ).catch ( e => e.response.data );

    return response;
};

export default postSignUp;