
import { useCallback, useEffect } from "react";
import { TodoType } from "../../types/todoList";
import { useToken } from "../useToken";
import deleteTodo from "../../apis/todo/deleteTodo";

const useDeleteTodo = (
    isDelete:boolean,
    setIsDelete:(isDelete:boolean) => void,
    todo:TodoType,
    todoList:TodoType[],
    setTodoList:(todoList:TodoType[]) => void,
    setIsTodoModifing:(isTodoModifing:boolean) => void,
):[
    onDeletionCancel:() => void,
    onDeletionConfirm:() => void,
] => {
    const { getToken } = useToken();

    const onDeletionCancel = useCallback(() => { // 삭제 취소
        setIsDelete(false);
    }, [setIsDelete]);

    const onDeletionConfirm = () => { // 삭제 완료
        const token = getToken();
        const id = todo.id;
        if (token) {
            deleteTodo(token, id)
            .then ( response => {
                if (Array.isArray(response)) {
                    const newTodoList = todoList.filter(todo => todo.id !== id);
                    setTodoList(newTodoList);
                }
            }).catch ( e => {
                console.log("✅todo 삭제 에러: ", e);
            });
        };
        setIsDelete(false);
    };
    
    useEffect(() => {
        setIsTodoModifing(isDelete);
    },[isDelete]);

    return [ onDeletionCancel, onDeletionConfirm ];
};

export default useDeleteTodo;