
import axios from "axios";
import { TODO_URL } from "../url";
import { TodoType, ErrorDataType } from "../../types/todoList";

const getTodoList = async (token:string) => {
    const response = await axios.get(
        TODO_URL,
        {
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    ).then ( res => {
        const data:TodoType[] = res.data;
        return data;
    }
    ).catch ( e => {
        const errorData:ErrorDataType = e.response.data;
        return errorData;
    });

    return response;
};

export default getTodoList;