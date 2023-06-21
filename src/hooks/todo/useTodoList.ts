
import { useEffect, useState } from "react";
import { TodoType } from "../../types/todoList";
import { useToken } from "../useToken";
import getTodoList from "../../apis/todo/getTodoList";

const useTodoList = ():[
    TodoType[],
    (todoList:TodoType[]) => void,
    string
] => {
    const [ todoList, setTodoList ] = useState<TodoType[]>([]);
    const [ alert, setAlert ] = useState<string>("");
    const { getToken, checkTokenAndInvoke } = useToken();

    useEffect(() => {
        const token = getToken();
        checkTokenAndInvoke(() => {
            token &&
            getTodoList(token)
            .then ( response => {
                if (Array.isArray(response)){
                    setTodoList(response);
                } else {
                    setAlert("✅오류 : 데이터를 가져올 수 없습니다");
                    console.log("✅getTodoList 에러", response);
                }
            }).catch ( e => {
                console.log("✅todo list 가져오기 에러", e);
            })
        });
    }, []);

    return [ todoList, setTodoList, alert ];
};

export default useTodoList;