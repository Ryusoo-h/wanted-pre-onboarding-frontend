
import { useCallback, useEffect, useRef, useState } from "react";
import { TodoType } from "../../types/todoList";
import { useToken } from "../useToken";
import putTodo from "../../apis/todo/putTodo";

const useModifyTodo = (
    isModify:boolean,
    setIsModify:(isModify:boolean) => void,
    todo:TodoType,
    todoList:TodoType[],
    setTodoList:(todoList:TodoType[]) => void,
    setIsTodoModifing:(isTodoModifing:boolean) => void
): [
    modifiedTodoCheck:boolean,
    setModifiedTodoCheck:(modifiedTodoCheck:boolean) => void,
    modifiedTodo:string,
    onModificationCancle:() => void,
    onModificationConfirm:() => void,
    onChangeModifyInput:(e:React.ChangeEvent<HTMLInputElement>) => void,
] => {
    const isFirstRender = useRef<boolean>(true); // 처음 렌더링 시, checkBox 수정 업데이트 되는것을 방지하기위한 플래그
    const [ modifiedTodoCheck, setModifiedTodoCheck ] = useState<boolean>(false);
    const [ modifiedTodo, setModifiedTodo ] = useState<string>('');
    const { getToken } = useToken();

    const onModificationCancel = useCallback(() => { // 수정 취소
        setModifiedTodoCheck(todo.isCompleted);
        setModifiedTodo(todo.todo);
        setIsModify(false);
    }, [setIsModify, todo.isCompleted, todo.todo]);

    const onModificationConfirm = () => { // 수정 완료
        const token = getToken();
        const id = todo.id;
        if (token) {
            putTodo(token, id, modifiedTodo, modifiedTodoCheck)
            .then ( response => {
                if (!Array.isArray(response)) {
                    const newTodoList = todoList.map(todo => todo.id === id ? response : todo);
                    setTodoList(newTodoList);
                }
            }).catch ( e => {
                console.log("✅todo 수정 에러: ", e)
            });
        };
        setIsModify(false);
    };

    const onChangeModifyInput = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setModifiedTodo(value);
    }, []);

    useEffect(() => {
        setModifiedTodo(todo.todo);
        setModifiedTodoCheck(todo.isCompleted);
    },[]);
    
    useEffect(() => {
        setIsTodoModifing(isModify);
    },[isModify]);

    useEffect(() => { // 기본모드일때 체크박스 클릭시 바로 반영
        if (isFirstRender.current) { 
            isFirstRender.current = false;
        } else if (!isModify && modifiedTodoCheck !== todo.isCompleted) { 
            onModificationConfirm();
        }
    }, [modifiedTodoCheck]);

    return [
        modifiedTodoCheck,
        setModifiedTodoCheck,
        modifiedTodo,
        onModificationCancel,
        onModificationConfirm,
        onChangeModifyInput
    ];
};

export default useModifyTodo;