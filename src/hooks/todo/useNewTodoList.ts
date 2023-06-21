
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useToken } from "../useToken";
import postNewTodo from "../../apis/todo/postNewTodo";
import { TodoType } from "../../types/todoList";

const useNewTodoList = (
        todoList: TodoType[],
        setTodoList: (todoList: TodoType[]) => void,
        isLatestSort: boolean,
    ):{
        todoListEl: RefObject<HTMLUListElement>,
        newTodo:string,
        setNewTodo:(newTodo:string) => void,
        onChangeAddTodoInput:(e:React.ChangeEvent<HTMLInputElement>) => void,
        addNewTodo:() => void,
    } => {
    const todoListEl = useRef<HTMLUListElement>(null);
    const prevTodoListElHeight = useRef<number>(0);
    const [ newTodo, setNewTodo ] = useState<string>("");
    const { getToken, checkTokenAndInvoke } = useToken();
    
    const onChangeAddTodoInput = useCallback((e:React.ChangeEvent<HTMLInputElement>):void => {
        const value = e.target.value;
        setNewTodo(value);
    }, []);

    const addNewTodo = () => {
        checkTokenAndInvoke(() => {
            const token = getToken();
            if (token) {
                postNewTodo(token, newTodo)
                .then ( response => {
                    if (!Array.isArray(response)) {
                        if (isLatestSort) {
                            setTodoList([response, ...todoList]);
                        } else {
                            setTodoList(todoList.concat(response));
                        }
                        setNewTodo("");
                    }
                }).catch ( e => {
                    console.log("✅새 Todo 등록 에러: ", e);
                })
            }
        });
    }

    useEffect(() => {
        // todoList에 새 todo가 추가되면 스크롤을 이동시켜 추가된 todo를 보여줌
        if (todoListEl.current && prevTodoListElHeight.current < (todoListEl.current?.scrollHeight || 0)) {
            const { scrollHeight, clientHeight } = todoListEl.current;
            todoListEl.current.scrollTop = isLatestSort ? 0 : scrollHeight - clientHeight;
        }
        prevTodoListElHeight.current = todoListEl.current?.scrollHeight || 0;
    }, [todoList]);

    return { todoListEl, newTodo, setNewTodo, onChangeAddTodoInput, addNewTodo };
}

export default useNewTodoList;