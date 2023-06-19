
import axios from "axios";
import { TODO_URL } from "../url";
import { TodoType, ErrorDataType } from "../../types/todoList";

const putTodo = async (token:string, id:number, todo:string, isCompleted:boolean) => {
    const response = await axios.put(
        `${TODO_URL}/${id}`,
        {
            todo,
            isCompleted
        },
        {
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    ).then ( res => {
        const data:TodoType = res.data;
        console.log('1', data);
        return data;
    }
    ).catch ( e => {
        const errorData:ErrorDataType = e.response.data;
        console.log('putTodo 오류: ', errorData);
        return [];
    });

    return response;
};

export default putTodo;