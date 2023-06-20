import Todo from "./Todo";
import { TodoType } from '../../types/todoList';
import Title from "../common/Title";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import postNewTodo from "../../apis/todo/postNewTodo";
import getAccessToken from "../../util/getAccessToken";
import onKeyPressEvent from "../../util/onKeyPressEvent";
import * as S from './TodoList.style';

type TodoListProps = {
    todoList: TodoType[],
    setTodoList: (todoList: TodoType[]) => void,
    isLatestSort: boolean,
}

const TodoList = ({ todoList, setTodoList, isLatestSort }:TodoListProps) => {
    const [ isAddTodoInputFocusing, setIsAddTodoInputFocusing ] = useState<boolean>(false);
    const [ isTodoModifing, setIsTodoModifing ] = useState<boolean>(false);
    const [ newTodo, setNewTodo ] = useState<string>("");
    const todoListEl = useRef<HTMLUListElement>(null);
    const prevTodoListElHeight = useRef<number>(0);
    const navigate = useNavigate();

    const onChangeAddTodoInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewTodo(value);
    }

    const onClickAddTodoButton = () => {
        const token = getAccessToken();
        if (!token) {
            navigate("/signin");
        } else {
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
    }

    useEffect(() => {
        if (!getAccessToken()) {
            navigate("/signin");
        } 
    }, [isAddTodoInputFocusing, isTodoModifing]);

    useEffect(() => {
        // todoList에 새 todo가 추가되면 스크롤을 가장아래로 이동시킴
        if (todoListEl.current && prevTodoListElHeight.current < (todoListEl.current?.scrollHeight || 0)) {
            const { scrollHeight, clientHeight } = todoListEl.current;
            todoListEl.current.scrollTop = isLatestSort ? 0 : scrollHeight - clientHeight;
        }
        prevTodoListElHeight.current = todoListEl.current?.scrollHeight || 0;
    }, [todoList]);
    
    return (
        <S.TodoWrapper>
            <Title />
            <S.TodoTopBox className="flex">
                <S.CheckWrapper />
                <span className="text">할일</span>
                <S.ButtonWrapper />
            </S.TodoTopBox>
            <S.TodoListUl ref={todoListEl}>
                {todoList.map((todo) => {
                    return (
                        <Todo 
                            key={todo.id}
                            todo={todo}
                            isAddTodoInputFocusing={isAddTodoInputFocusing}
                            isTodoModifing={isTodoModifing}
                            setIsTodoModifing={setIsTodoModifing}
                            todoList={todoList}
                            setTodoList={setTodoList}
                        />
                    )
                })}
            </S.TodoListUl>
            <S.TodoAddBox className="flex" isAddTodoInputFocusing={isAddTodoInputFocusing} isTodoModifing={isTodoModifing}>
                <S.CheckWrapper />
                <span className="text flex">
                    <label htmlFor="add-todo" style={{display: "none"}}>TODO 추가하기</label>
                    <S.AddTodoInput 
                        data-testid="new-todo-input"
                        type="text"
                        id="add-todo"
                        placeholder="새 할일 입력하기"
                        value={newTodo}
                        onChange={(e) => {onChangeAddTodoInput(e)}}
                        onFocus={() => {setIsAddTodoInputFocusing(true)}}
                        onBlur={() => {setIsAddTodoInputFocusing(false)}}
                        onKeyPress={(e) => {onKeyPressEvent(e, "Enter", () => {
                            onClickAddTodoButton();
                            setNewTodo("");
                        })}}
                    />
                </span>
                <S.ButtonWrapper>
                    <S.AddButton data-testid="new-todo-add-button" className="font-net" onClick={onClickAddTodoButton} disabled={newTodo===""}>추가</S.AddButton>
                </S.ButtonWrapper>
            </S.TodoAddBox>
        </S.TodoWrapper>
    );
};

export default TodoList;