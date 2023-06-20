
import { useEffect, useRef, useState } from 'react';
import { TodoType } from '../../types/todoList';
import styled, { css } from 'styled-components';
import { CancelButton, CheckButton, DeleteButton, DeleteCancelButton, DeleteConfirmButton, ModifyButton } from './buttons';
import deleteTodo from '../../apis/todo/deleteTodo';
import getAccessToken from '../../util/getAccessToken';
import putTodo from '../../apis/todo/putTodo';
import onKeyPressEvent from '../../util/onKeyPressEvent';

const TodoLi = styled('li')<{checked:boolean, isAddTodoInputFocusing:boolean, isTodoModifing:boolean, isModify:boolean, isDelete:boolean}>`
    border-bottom: solid 1px var(--light-green);
    box-sizing: border-box;
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
    ${props => props.isDelete &&
        css`
            box-shadow: 0px 2px 16px rgba(255, 36, 36, 0.69);
            border-top: solid 3px #FC7171;
            border-bottom: solid 1px #ddd;
            transform: translateY(-2px);
            span {
                border: none;
                &:not(:last-child) {
                    border-right: solid 3px #ddd;
                }
            }
    `}
`;

const CheckBoxWrapper = styled.span`
    flex-shrink: 0;
    flex-grow: 0;
    align-items: stretch;
    padding: 8px 4px;
    width: 37px;
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
    padding: 0 8px;
    border-left: solid 3px var(--light-green);
    align-items: center;
    gap: 6px;
`;

const BinIcon = styled.img`
    width: 26px;
    height: 30px;
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
    const [isModify, setIsModify] = useState(false); // 수정 모드 결정
    const [isDelete, setIsDelete] = useState(false); // 삭제 모드 결정
    const [modifiedTodo, setModifiedTodo] = useState('');
    const [modifiedTodoCheck, setModifiedTodoCheck] = useState(false);
    const isPreventUpdateCheckButtonWhenFirstRender = useRef(true); // 처음 렌더링 시, checkBox 수정 업데이트 되는것을 방지하기위한 플래그
    const thisTodo = useRef(null);

    const onClickCheckBox = (id:number) => {
        setModifiedTodoCheck(!modifiedTodoCheck);
    }

    const onClickCancelButton = () => { // 수정 취소
        setModifiedTodoCheck(todo.isCompleted);
        setModifiedTodo(todo.todo);
        setIsModify(false);
        setIsTodoModifing(false);
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
    }
    const onClickModifyButton = () => { // 수정 모드로 변경
        setIsModify(true);
        setIsTodoModifing(true);
        if(thisTodo.current) {
            handleEventWhenExternalClick(thisTodo.current, () => {
                setIsModify(false);
                setIsTodoModifing(false);
            });
        };
    }
    const onClickDeleteButton = () => { // 삭제 모드로 변경
        setIsModify(true);
        setIsTodoModifing(true);
        setIsDelete(true);
        if(thisTodo.current) {
            handleEventWhenExternalClick(thisTodo.current, () => {
                setIsModify(false);
                setIsDelete(false);
                setIsTodoModifing(false);
            });
        };
    };
    const onClickDeleteCancelButton = () => { // 삭제 취소
        setIsModify(false);
        setIsTodoModifing(false);
        setIsDelete(false);
    }
    const onClickDeleteConfirmButton = () => { // 삭제 확정
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
        setIsModify(false);
        setIsTodoModifing(false);
        setIsDelete(false);
    }

    const handleEventWhenExternalClick = (target:HTMLElement, handleEvent:() => void): void => {
        // target의 외부요소 클릭시 handleEvent를 실행함

        const handleExternalClick = (e: MouseEvent) => {
            if (!target.contains(e.target as Node)) {
                handleEvent();
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
        <TodoLi 
            ref={thisTodo}
            className="flex"
            checked={todo.isCompleted}
            isAddTodoInputFocusing={isAddTodoInputFocusing}
            isTodoModifing={isTodoModifing}
            isModify={isModify}
            isDelete={isDelete}
        >
            <CheckBoxWrapper className="flex">
                {isDelete ? (
                    <BinIcon src={`${process.env.PUBLIC_URL}/img/icon/ic-bin.svg`} alt="bin-icon" />
                ) : (
                    <CheckBox
                        id={`checkbox${todo.id}`}
                        type="checkbox"
                        checked={modifiedTodoCheck}
                        readOnly
                        onClick={() => {onClickCheckBox(todo.id)}}
                        path={`${process.env.PUBLIC_URL}/img/icon/ic-check-green.svg`}
                    />
                )}
            </CheckBoxWrapper>
            <TextWrapper className="flex">
                {isModify ? (
                    isDelete ? (
                        <> {/* 삭제모드 input */}
                            <input 
                                data-testid="modify-input"
                                className="text"
                                value={todo.todo}
                                disabled={true}
                            />
                        </>
                    ) : (
                        <> {/* 수정모드 input */}
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
                        </>
                    )
                    
                ) : (
                    <label htmlFor={`checkbox${todo.id}`} className="text" onClick={(e)=> e.preventDefault()}>{todo.todo}</label>
                )}
            </TextWrapper>
            <ButtonWrapper className="flex">
                {isModify ? (
                    isDelete ? (
                        <> {/* 삭제모드 버튼들 */}
                            <DeleteCancelButton dataTestid="cancel-button" onClickButton={onClickDeleteCancelButton} />
                            <DeleteConfirmButton dataTestid="submit-button" onClickButton={onClickDeleteConfirmButton} disabled={modifiedTodo===''} />
                        </>
                    ) : (
                        <> {/* 수정모드 버튼들 */}
                            <CancelButton dataTestid="cancel-button" onClickButton={onClickCancelButton} />
                            <CheckButton dataTestid="submit-button" onClickButton={onClickCheckButton} disabled={modifiedTodo===''} />
                        </>
                    )
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
