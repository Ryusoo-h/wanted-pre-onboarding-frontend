import Todo from "./Todo";
import { TodoType } from '../../types/todoList';
import styled, { css } from "styled-components";
import Title from "../common/Title";
import { KeyboardEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import postNewTodo from "../../apis/todo/postNewTodo";
import getAccessToken from "../../util/getAccessToken";
import onKeyPressEvent from "../../util/onKeyPressEvent";

const TodoWrapper = styled.div`
    width: 338px;
    position: absolute;
    top: 90px;
    left: 50%;
    transform: translateX(-50%);
`;

const CheckWrapper = styled.div`
    align-items: center;
    flex-shrink: 0;
    flex-grow: 0;
    padding: 8px 5px 8px 2px;
    width: 37px;
    border-right: solid 3px var(--light-green);
`;
const ButtonWrapper = styled.div`
    flex-shrink: 0;
    flex-grow: 0;
    width: 93px;
    padding: 8px;
    border-left: solid 3px var(--light-green);
    align-items: center;
`;

const TodoTopBox = styled.div`
    position: relative;
    z-index: 3;
    margin-top: 20px;
    width: 100%;
    border-top: solid 3px var(--light-green);
    border-bottom: solid 3px var(--light-green);
    height: 54px;
    align-items: stretch;
    font-size: 20px;
    background-color: #FFFBF8;
    .text {
        align-items: center;
        flex-grow: 1;
        padding: 11px 8px;
        font-size: 24px;
        color: #4D837F;
    }
`;

const TodoListUl = styled.ul`
    max-height: 375px;
    width: 370px;
    padding: 16px;
    transform: translate(-16px, -16px);
    position: relative;
    z-index:2;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const TodoAddBox = styled('div')<{isAddTodoInputFocusing:boolean, isTodoModifing:boolean}>`
    width: 100%;
    background-color: #fff;
    border-top: solid 1px var(--light-green);
    border-bottom: solid 3px var(--light-green);
    height: 52px;
    align-items: stretch;
    font-size: 20px;
    transform: translateY(-32px);
    transition: box-shadow 0.2s ease-in-out;
    position: relative;
    z-index: 3;
    ${props => (props.isTodoModifing) &&
        css`
            filter: opacity(0.4);
            pointer-events: none;
    `}
    ${props => props.isAddTodoInputFocusing &&
        css`
            z-index: 4;
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
    ${props =>
        props.disabled &&
        css`
            background-color: #EFEFEF;
            color: #CDCDCD;
            &:hover {
                background-color: #EFEFEF;
                color: #CDCDCD;
            }
    `}
`;

type TodoListProps = {
    todoList: TodoType[],
    setTodoList: (todoList: TodoType[]) => void;
}

const TodoList = ({ todoList, setTodoList }:TodoListProps) => {
    const [ isAddTodoInputFocusing, setIsAddTodoInputFocusing ] = useState<boolean>(false);
    const [ isTodoModifing, setIsTodoModifing ] = useState<boolean>(false);
    const [ newTodo, setNewTodo ] = useState<string>("");
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
                    setTodoList(todoList.concat(response));
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

    return (
        <TodoWrapper>
            <Title />
            <TodoTopBox className="flex">
                <CheckWrapper />
                <span className="text">할일</span>
                <ButtonWrapper />
            </TodoTopBox>
            <TodoListUl>
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
            </TodoListUl>
            <TodoAddBox className="flex" isAddTodoInputFocusing={isAddTodoInputFocusing} isTodoModifing={isTodoModifing}>
                <CheckWrapper />
                <span className="text flex">
                    <label htmlFor="add-todo" style={{display: "none"}}>TODO 추가하기</label>
                    <AddTodoInput 
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
                <ButtonWrapper>
                    <AddButton data-testid="new-todo-add-button" className="font-net" onClick={onClickAddTodoButton} disabled={newTodo===""}>추가</AddButton>
                </ButtonWrapper>
            </TodoAddBox>
        </TodoWrapper>
    );
};

export default TodoList;