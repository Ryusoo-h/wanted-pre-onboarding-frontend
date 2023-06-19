
import { useEffect, useRef, useState } from 'react';
import { TodoType } from '../../types/todoList';
import styled, { css } from 'styled-components';
import { CancelButton, CheckButton, DeleteButton, ModifyButton } from './buttons';
import deleteTodo from '../../apis/todo/deleteTodo';
import getAccessToken from '../../util/getAccessToken';
import putTodo from '../../apis/todo/putTodo';
import onKeyPressEvent from '../../util/onKeyPressEvent';

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
    align-items: stretch;
    padding: 8px 4px;
    width: 37px;
    min-height: 50px;
    border-right: solid 3px var(--light-green);
`;
const CheckBox = styled('input')<{path:string}>`
    width: 26px;
    height: 100%;
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
    const [modifiedTodoCheck, setModifiedTodoCheck] = useState(false);
    const isPreventUpdateCheckButtonWhenFirstRender = useRef(true); // 처음 렌더링 시, checkBox 수정 업데이트 되는것을 방지하기위한 플래그
    const thisTodo = useRef(null);

    const onClickCheckBox = (id:number) => {
        setModifiedTodoCheck(!modifiedTodoCheck);
        console.log(`id${id} checkbox 클릭됨`);
    }

    const onClickCancelButton = () => { // 수정 취소
        setModifiedTodoCheck(todo.isCompleted);
        setModifiedTodo(todo.todo);
        setIsModify(false);
        setIsTodoModifing(false);
        console.log('CancelButton 클릭됨');
    }
    const onClickCheckButton = () => { // 수정 완료
        const token = getAccessToken();
        const id = todo.id;
        if (token) {
            putTodo(token, id, modifiedTodo, modifiedTodoCheck)
            .then ( response => {
                if (!Array.isArray(response)) {
                    const newTodoList = todoList.map(todo => todo.id === id ? response : todo);
                    setTodoList(newTodoList);
                }
            }).catch ( e => {
                console.log('todo 수정 에러: ', e)
            });
        }
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
        setModifiedTodoCheck(todo.isCompleted);
    },[]);

    useEffect(() => {
        if (isPreventUpdateCheckButtonWhenFirstRender.current) {
            isPreventUpdateCheckButtonWhenFirstRender.current = false;
        } else if (!isModify && modifiedTodoCheck !== todo.isCompleted) {
            onClickCheckButton();
        }
    }, [modifiedTodoCheck]);

    return (
        <TodoLi ref={thisTodo} className="flex" checked={todo.isCompleted} isAddTodoInputFocusing={isAddTodoInputFocusing} isTodoModifing={isTodoModifing} isModify={isModify} >
            <CheckBoxWrapper className="flex">
                <CheckBox
                    id={`checkbox${todo.id}`}
                    type="checkbox"
                    checked={modifiedTodoCheck}
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
                        onChange={(e) => {onChangeModifyInput(e)}} 
                        onKeyPress={(e) => {onKeyPressEvent(e, "Enter", () => {
                            onClickCheckButton();
                        })}}
                    />
                ) : (
                    <label htmlFor={`checkbox${todo.id}`} className="text" onClick={(e)=> e.preventDefault()}>{todo.todo}</label>
                )}
            </TextWrapper>
            <ButtonWrapper className="flex">
                {isModify ? (
                    <> {/* 수정시 버튼들 */}
                        <CancelButton dataTestid="cancel-button" onClickButton={onClickCancelButton} />
                        <CheckButton dataTestid="submit-button" onClickButton={onClickCheckButton} disabled={modifiedTodo===''} />
                    </>
                ) : (
                    <> {/* 기본 버튼들 */}
                        <ModifyButton dataTestid="modify-button" onClickButton={onClickModifyButton} />
                        <DeleteButton dataTestid="delete-button" onClickButton={onClickDeleteButton} />
                    </>
                )}
            </ButtonWrapper>
            
        </TodoLi>
    );
};

export default Todo;
