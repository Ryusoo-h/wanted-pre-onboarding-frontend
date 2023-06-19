
import { useEffect, useRef, useState } from 'react';
import { TodoType } from '../../types/todoList';
import styled, { css } from 'styled-components';
import { CancelButton, CheckButton, DeleteButton, ModifyButton } from './buttons';
import deleteTodo from '../../apis/todo/deleteTodo';
import getAccessToken from '../../util/getAccessToken';

const TodoLi = styled('li')<{checked:boolean, isAddTodoInputFocusing:boolean, isTodoModifing:boolean, isModify: boolean}>`
    border-bottom: solid 1px var(--light-green);
    min-height: 50px;
    align-items: stretch;
    font-size: 20px;
    transition: opacity 0.2s ease-in-out;
    ${props => props.checked &&
        css`
            background-color: #EBFBE8;
    `}
    ${props => (props.isAddTodoInputFocusing || props.isTodoModifing) &&
        css`
            opacity: 0.4;
            pointer-events: none;
    `}
    ${props => props.isModify &&
        css`
            background-color: #fff;
            opacity: 1;
            pointer-events: auto;
            box-shadow: 0px 2px 12px rgba(110, 106, 150, 0.5);
            position: relative;
            z-index: 2;
    `}
`;

const CheckBoxWrapper = styled.span`
    flex-shrink: 0;
    flex-grow: 0;
    align-items: center;
    padding: 8px 4px;
    width: 37px;
    min-height: 50px;
    border-right: solid 3px var(--light-green);
`;
const CheckBox = styled('input')<{path:string}>`
    width: 26px;
    height: 26px;
    position: relative;
    &:checked::after {
        content: '';
        display: block;
        width: 26px;
        height: 26px;
        background-image: url(${props => props.path});
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const TextWrapper = styled.span`
    align-items: center;
    flex-grow: 1;
    .text {
        width: 100%;
        padding: 10px 8px 6px;
        display: inline-block;
        line-height: 140%;
        word-spacing: -2px;
        font-size: 20px;
        border: none;
        outline: none;
    }
`;

const ButtonWrapper = styled.span`
    flex-shrink: 0;
    flex-grow: 0;
    padding: 8px;
    min-height: 50px;
    border-left: solid 3px var(--light-green);
    align-items: center;
    gap: 6px;
`;

type TodoProps = {
    todo: TodoType,
    isAddTodoInputFocusing: boolean,
    isTodoModifing: boolean,
    setIsTodoModifing: (isTodoModifing:boolean) => void,
    todoList: TodoType[],
    setTodoList: (todoList:TodoType[]) => void,
}
const Todo = ({ todo, isAddTodoInputFocusing, isTodoModifing, setIsTodoModifing, todoList, setTodoList }:TodoProps) => {
    const [isModify, setIsModify] = useState(false);
    const [modifiedTodo, setModifiedTodo] = useState('');
    const thisTodo = useRef(null);

    const onClickCheckBox = (id:number) => {
        console.log(`id${id} checkbox 클릭됨`);
    }

    const onClickCancelButton = () => { // 수정 취소
        setIsModify(false);
        setIsTodoModifing(false);
        setModifiedTodo(todo.todo);
        console.log('CancelButton 클릭됨');
    }
    const onClickCheckButton = () => { // 수정 완료
        setIsModify(false);
        setIsTodoModifing(false);
        console.log('CheckButton 클릭됨');
    }
    const onClickModifyButton = () => { // 수정 모드로
        setIsModify(true);
        setIsTodoModifing(true);
        if(thisTodo.current) {
            isExternalClickModifiedTodo(thisTodo.current);
        };
        console.log('ModifyButton 클릭됨');
    }
    const onClickDeleteButton = () => { // 삭제
        const token = getAccessToken();
        const id = todo.id;
        if (token) {
            deleteTodo(token, id)
            .then ( response => {
                if (Array.isArray(response)) {
                    const newTodoList = todoList.filter(todo => todo.id !== id);
                    setTodoList(newTodoList);
                }
            }).catch ( e => {
                console.log('todo 삭제 에러: ', e);
            })
        }
        console.log('DeleteButton 클릭됨');
    }

    const isExternalClickModifiedTodo = (target:HTMLElement): void => {
        // 수정모드일 때 수정모드인 TODO 밖을 눌렀을때

        const handleExternalClick = (e: MouseEvent) => {
            if (!target.contains(e.target as Node)) {
                setIsModify(false);
                setIsTodoModifing(false);
                window.removeEventListener('mousedown', handleExternalClick);
            };
        }
            window.addEventListener('mousedown', handleExternalClick);
    };

    const onChangeModifyInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setModifiedTodo(value);
    }

    useEffect(() => {
        setModifiedTodo(todo.todo);
    },[])
    return (
        <TodoLi ref={thisTodo} className="flex" checked={todo.isCompleted} isAddTodoInputFocusing={isAddTodoInputFocusing} isTodoModifing={isTodoModifing} isModify={isModify} >
            <CheckBoxWrapper className="flex">
                <CheckBox
                    id={`checkbox${todo.id}`}
                    type="checkbox"
                    checked={todo.isCompleted}
                    readOnly
                    onClick={() => {onClickCheckBox(todo.id)}}
                    path={`${process.env.PUBLIC_URL}/img/icon/ic-check-green.svg`}
                    />
            </CheckBoxWrapper>
            <TextWrapper className="flex">
                {isModify ? (
                    <input 
                        data-testid="modify-input"
                        className="text"
                        autoFocus={isModify}
                        value={modifiedTodo}
                        onChange={(e) => {onChangeModifyInput(e)}} />
                ) : (
                    <label htmlFor={`checkbox${todo.id}`} className="text">{todo.todo}</label>
                )}
            </TextWrapper>
            <ButtonWrapper className="flex">
                {isModify ? (
                    <> {/* 수정시 버튼들 */}
                        <CancelButton dataTestid="cancel-button" onClickButton={onClickCancelButton} />
                        <CheckButton dataTestid="submit-button" onClickButton={onClickCheckButton} />
                    </>
                ) : (
                    <> {/* 기본 버튼들 */}
                        <ModifyButton dataTestid="modify-button" onClickButton={onClickModifyButton}/>
                        <DeleteButton dataTestid="delete-button" onClickButton={onClickDeleteButton} />
                    </>
                )}
            </ButtonWrapper>
            
        </TodoLi>
    );
};

export default Todo;
