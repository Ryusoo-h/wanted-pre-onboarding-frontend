

import { TodoType } from '../../types/todoList';
import { CancelButton, CheckButton, DeleteButton, DeleteCancelButton, DeleteConfirmButton, ModifyButton } from './buttons';
import onKeyPressEvent from '../../util/onKeyPressEvent';
import * as S from './Todo.style';
import useModifyTodo from '../../hooks/todo/useModifyTodo';
import useDeleteTodo from '../../hooks/todo/useDeleteTodo';
import React, { useRef } from 'react';
import useOnMode from '../../hooks/todo/useOnMode';

type TodoProps = {
    todo: TodoType,
    isAddingNewTodo: boolean,
    isModifingTodo: boolean,
    setIsModifingTodo: (isTodoModifing:boolean) => void,
    todoList: TodoType[],
    setTodoList: (todoList:TodoType[]) => void,
}
const Todo = ({ todo, isAddingNewTodo, isModifingTodo, setIsModifingTodo, todoList, setTodoList }:TodoProps) => {
    const thisTodo = useRef<HTMLLIElement>(null);
    const [ isModify, setIsModify, onModifyMode] = useOnMode(thisTodo);
    const [ isDelete, setIsDelete, onDeleteMode] = useOnMode(thisTodo);
    
    const [ modifiedTodoCheck, setModifiedTodoCheck, modifiedTodo, onModificationCancle, onModificationConfirm, onChangeModifyInput
    ] = useModifyTodo(isModify, setIsModify, todo, todoList, setTodoList, setIsModifingTodo);

    const [ onDeletionCancel, onDeletionConfirm 
    ] = useDeleteTodo(isDelete, setIsDelete, todo, todoList, setTodoList, setIsModifingTodo);

    return (
        <S.TodoLi
            ref={thisTodo}
            className="flex"
            checked={todo.isCompleted}
            isAddingNewTodo={isAddingNewTodo}
            isModifingTodo={isModifingTodo}
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
                {isModify && // 수정모드
                    <input 
                        data-testid="modify-input"
                        className="text"
                        autoFocus={isModify}
                        value={modifiedTodo}
                        onChange={(e) => {onChangeModifyInput(e)}} 
                        onKeyPress={(e) => {onKeyPressEvent(e, "Enter", () => {
                            onModificationConfirm();
                        })}}
                    />
                }
                {isDelete && // 삭제 모드
                    <input 
                        data-testid="modify-input"
                        className="text"
                        value={todo.todo}
                        disabled={true}
                    />
                }
                {!isModify && !isDelete &&
                    <label htmlFor={`checkbox${todo.id}`} className="text" onClick={(e)=> e.preventDefault()}>{modifiedTodo}</label>
                }
            </S.TextWrapper>
            <S.ButtonWrapper className="flex">
                {isModify &&
                    <> {/* 수정모드 버튼들 */}
                        <CancelButton dataTestid="cancel-button" onClickButton={onModificationCancle} />
                        <CheckButton dataTestid="submit-button" onClickButton={onModificationConfirm} disabled={modifiedTodo===''} />
                    </>
                }
                {isDelete &&
                    <> {/* 삭제모드 버튼들 */}
                        <DeleteCancelButton dataTestid="delete-cancel-button" onClickButton={onDeletionCancel} />
                        <DeleteConfirmButton dataTestid="delete-button" onClickButton={onDeletionConfirm} disabled={modifiedTodo===''} />
                    </>
                }
                {!isModify && !isDelete &&
                    <> {/* 기본 버튼들 */}
                        <ModifyButton dataTestid="modify-button" onClickButton={onModifyMode} />
                        <DeleteButton dataTestid="delete-mode-button" onClickButton={onDeleteMode} />
                    </>
                }
            </S.ButtonWrapper>
        </S.TodoLi>
    );
};

export default React.memo(Todo);
