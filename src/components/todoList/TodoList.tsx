import Todo from "./Todo";
import { TodoType } from '../../types/todoList';
import styled, { css } from "styled-components";
import Title from "../common/Title";
import { useState } from "react";


const TodoWrapper = styled.div`
    width: 338px;
    position: absolute;
    top: 90px;
    left: 50%;
    transform: translateX(-50%);
`;

const CheckWrapper = styled.span`
    align-items: center;
    flex-shrink: 0;
    flex-grow: 0;
    padding: 8px 5px 8px 2px;
    width: 37px;
    border-right: solid 3px var(--light-green);
`;
const ButtonWrapper = styled.span`
    flex-shrink: 0;
    flex-grow: 0;
    width: 93px;
    padding: 8px;
    border-left: solid 3px var(--light-green);
    align-items: center;
`;

const TodoListUl = styled.ul`
    max-height: 500px;
`;
const TodoTopLi = styled.li`
    border-top: solid 3px var(--light-green);
    border-bottom: solid 3px var(--light-green);
    height: 54px;
    align-items: stretch;
    font-size: 20px;
    .text {
        align-items: center;
        flex-grow: 1;
        padding: 11px 8px;
        font-size: 24px;
        color: #4D837F;
    }
`;
const TodoAddLi = styled('li')<{isAddTodoInputFocusing:boolean, isTodoModifing:boolean}>`
    background-color: #fff;
    border-bottom: solid 3px var(--light-green);
    height: 52px;
    align-items: stretch;
    font-size: 20px;
    transition: box-shadow 0.2s ease-in-out;
    ${props => (props.isTodoModifing) &&
        css`
            opacity: 0.4;
            pointer-events: none;
    `}
    ${props => props.isAddTodoInputFocusing &&
        css`
            box-shadow: 0px 2px 12px rgba(110, 106, 150, 0.5);
    `}
    .text {
        align-items: center;
        flex-grow: 1;
        input {
            width: 100%;
            padding: 10px 8px 6px;
            display: inline-block;
            line-height: 140%;
            word-spacing: -2px;
            font-size: 20px;
            border: none;
            outline: none;
        }
    }
`;

const AddTodoInput = styled.input`
    &::placeholder {
        color: var(--light-green);
    }
`;
const AddButton = styled.button`
    padding: 4px;
    width: 74px;
    border-radius: 4px;
    background-color: #91DBE0;
    color: #fff;
    font-size: 20px;
    &:hover {
        background-color: #14DDD1;
    }
`;

type TodoListProps = {
    todoList: TodoType[],
}

const TodoList = ({ todoList }:TodoListProps) => {
    const [ isAddTodoInputFocusing, setIsAddTodoInputFocusing ] = useState(false);
    const [ isTodoModifing, setIsTodoModifing ] = useState(false);

    return (
        <TodoWrapper>
            <Title />
            <TodoListUl>
                <TodoTopLi className="flex">
                    <CheckWrapper />
                    <span className="text">할일</span>
                    <ButtonWrapper />
                </TodoTopLi>
                {todoList.map((todo) => {
                    return (
                        <Todo 
                            key={todo.id}
                            todo={todo}
                            isAddTodoInputFocusing={isAddTodoInputFocusing}
                            isTodoModifing={isTodoModifing}
                            setIsTodoModifing={setIsTodoModifing}
                        />
                    )
                })}

                <TodoAddLi className="flex" isAddTodoInputFocusing={isAddTodoInputFocusing} isTodoModifing={isTodoModifing}>
                    <CheckWrapper />
                    <span className="text flex">
                        <label htmlFor="add-todo" style={{display: "none"}}>TODO 추가하기</label>
                        <AddTodoInput 
                            data-testid="new-todo-input"
                            type="text"
                            id="add-todo"
                            placeholder="새 할일 입력하기"
                            onFocus={() => {setIsAddTodoInputFocusing(true)}}
                            onBlur={() => {setIsAddTodoInputFocusing(false)}}
                            />
                    </span>
                    <ButtonWrapper>
                        <AddButton data-testid="new-todo-add-button" className="font-net">추가</AddButton>
                    </ButtonWrapper>
                </TodoAddLi>
            </TodoListUl>
        </TodoWrapper>
    );
};

export default TodoList;