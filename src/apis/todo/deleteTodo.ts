
import axios from "axios";
import { TODO_URL } from "../url";
import { ErrorDataType } from "../../types/todoList";

const deleteTodo = async (token:string, id:number) => {
    const response = await axios.delete(
        `${TODO_URL}/${id}`,
        {
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    ).then ( res => []
    ).catch ( e => {
        const errorData:ErrorDataType = e.response.data;
        console.log("deleteTodo 에러: ", errorData);
        return errorData;
    });

    return response;
};

export default deleteTodo;