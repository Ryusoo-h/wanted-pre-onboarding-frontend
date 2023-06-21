
import { useState } from "react";
import { TodoType } from "../../types/todoList";

const useSortTodoList = ():[
    boolean, 
    (isLasttodoList:TodoType[], setTodoList:(todoList:TodoType[]) => void) => void
] => {
    const [ isLatestSort, setIsLatestSort ] = useState<boolean>(false);

    const sortTodoList = (todoList:TodoType[], setTodoList:(todoList:TodoType[]) => void) => {
        setIsLatestSort(!isLatestSort);
        const newTodoList = todoList.reverse();
        setTodoList(newTodoList);
    }

    return [ isLatestSort, sortTodoList ];
};

export default useSortTodoList;
