
import { useEffect, useRef, useState } from 'react';
import { TodoType } from '../../types/todoList';
import { CancelButton, CheckButton, DeleteButton, DeleteCancelButton, DeleteConfirmButton, ModifyButton } from './buttons';
import deleteTodo from '../../apis/todo/deleteTodo';
import putTodo from '../../apis/todo/putTodo';
import onKeyPressEvent from '../../util/onKeyPressEvent';
import * as S from './Todo.style';
import { useToken } from '../../hooks/useToken';

type TodoProps = {
    todo: TodoType,
    isAddTodoInputFocusing: boolean,
    isTodoModifing: boolean,
    setIsTodoModifing: (isTodoModifing:boolean) => void,
    todoList: TodoType[],
    setTodoList: (todoList:TodoType[]) => void,
}
const Todo = ({ todo, isAddTodoInputFocusing, isTodoModifing, setIsTodoModifing, todoList, setTodoList }:TodoProps) => {
    const [isModify, setIsModify] = useState<boolean>(false); // 수정 모드 결정
    const [isDelete, setIsDelete] = useState<boolean>(false); // 삭제 모드 결정
    const [modifiedTodo, setModifiedTodo] = useState<string>('');
    const [modifiedTodoCheck, setModifiedTodoCheck] = useState<boolean>(false);
    const isPreventUpdateCheckButtonWhenFirstRender = useRef<boolean>(true); // 처음 렌더링 시, checkBox 수정 업데이트 되는것을 방지하기위한 플래그
    const thisTodo = useRef<HTMLLIElement>(null);
    const { getToken } = useToken();

    const onClickCancelButton = () => { // 수정 취소
        setModifiedTodoCheck(todo.isCompleted);
        setModifiedTodo(todo.todo);
        setIsModify(false);
        setIsTodoModifing(false);
    }
    const onClickCheckButton = () => { // 수정 완료
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
        <S.TodoLi 
            ref={thisTodo}
            className="flex"
            checked={todo.isCompleted}
            isAddTodoInputFocusing={isAddTodoInputFocusing}
            isTodoModifing={isTodoModifing}
            isModify={isModify}
            isDelete={isDelete}
        >
            <S.CheckBoxWrapper className="flex">
                {isDelete ? (
                    <S.BinIcon src={`${process.env.PUBLIC_URL}/img/icon/ic-bin.svg`} alt="bin-icon" />
                ) : (
                    <S.CheckBox
                        id={`checkbox${todo.id}`}
                        type="checkbox"
                        checked={modifiedTodoCheck}
                        readOnly
                        onClick={() => {setModifiedTodoCheck(!modifiedTodoCheck)}}
                        path={`${process.env.PUBLIC_URL}/img/icon/ic-check-green.svg`}
                    />
                )}
            </S.CheckBoxWrapper>
            <S.TextWrapper className="flex">
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
            </S.TextWrapper>
            <S.ButtonWrapper className="flex">
                {isModify ? (
                    isDelete ? (
                        <> {/* 삭제모드 버튼들 */}
                            <DeleteCancelButton dataTestid="delete-cancel-button" onClickButton={onClickDeleteCancelButton} />
                            <DeleteConfirmButton dataTestid="delete-button" onClickButton={onClickDeleteConfirmButton} disabled={modifiedTodo===''} />
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
                        <DeleteButton dataTestid="delete-mode-button" onClickButton={onClickDeleteButton} />
                    </>
                )}
            </S.ButtonWrapper>
        </S.TodoLi>
    );
};

export default Todo;
