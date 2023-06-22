import Todo from "./Todo";
import { TodoType } from '../../types/todoList';
import Title from "../common/Title";
import onKeyPressEvent from "../../util/onKeyPressEvent";
import * as S from './TodoList.style';
import useNewTodoList from "../../hooks/todo/useNewTodoList";
import React from "react";
import useTodosMode from "../../hooks/todo/useTodosMode";

type TodoListProps = {
    todoList: TodoType[],
    setTodoList: (todoList: TodoType[]) => void,
    isLatestSort: boolean,
}

const TodoList = ({ todoList, setTodoList, isLatestSort }:TodoListProps) => {
    const [ isAddingNewTodo, setIsAddingNewTodo ] = useTodosMode();// 새 todo 추가중 === true
    const [ isModifingTodo, setIsModifingTodo ] = useTodosMode();// todo 수정모드 === true
    const { todoListEl, newTodo, setNewTodo, onChangeAddTodoInput, addNewTodo } = useNewTodoList(todoList, setTodoList, isLatestSort);

    return (
        <S.TodoWrapper>
            <Title />
            <S.TodoTopBox className="flex" isModifingTodo={isModifingTodo}>
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
                            isAddingNewTodo={isAddingNewTodo}
                            isModifingTodo={isModifingTodo}
                            setIsModifingTodo={setIsModifingTodo}
                            todoList={todoList}
                            setTodoList={setTodoList}
                        />
                    )
                })}
            </S.TodoListUl>
            <S.TodoAddBox className="flex" isAddingNewTodo={isAddingNewTodo} isModifingTodo={isModifingTodo}>
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
                        onFocus={() => {setIsAddingNewTodo(true)}}
                        onBlur={() => {setIsAddingNewTodo(false)}}
                        onKeyPress={(e) => {onKeyPressEvent(e, "Enter", () => {
                            addNewTodo();
                            setNewTodo("");
                        })}}
                    />
                </span>
                <S.ButtonWrapper>
                    <S.AddButton data-testid="new-todo-add-button" className="font-net" onClick={addNewTodo} disabled={newTodo===""}>추가</S.AddButton>
                </S.ButtonWrapper>
            </S.TodoAddBox>
        </S.TodoWrapper>
    );
};

export default React.memo(TodoList);