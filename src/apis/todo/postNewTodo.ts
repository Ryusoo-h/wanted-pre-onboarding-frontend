
import axios from "axios";
import { TODO_URL } from "../url";
import { TodoType, ErrorDataType } from "../../types/todoList";

const postNewTodo = async (token:string, todo:string) => {
    const response = await axios.post(
        TODO_URL,
        {
            todo
        },
        {
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    ).then ( res => {
        const data:TodoType = res.data;
        return data;
    }
    ).catch ( e => {
        const errorData:ErrorDataType = e.response.data;
        console.log('postNewTodo 오류: ', errorData);
        return [];
    });

    return response;
};

export default postNewTodo;