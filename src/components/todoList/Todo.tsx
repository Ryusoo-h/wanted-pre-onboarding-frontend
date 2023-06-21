

import { TodoType } from '../../types/todoList';
import { CancelButton, CheckButton, DeleteButton, DeleteCancelButton, DeleteConfirmButton, ModifyButton } from './buttons';
import onKeyPressEvent from '../../util/onKeyPressEvent';
import * as S from './Todo.style';
import useModes from '../../hooks/todo/useModes';
import useModifyTodo from '../../hooks/todo/useModifyTodo';
import useDeleteTodo from '../../hooks/todo/useDeleteTodo';

type TodoProps = {
    todo: TodoType,
    isAddTodoInputFocusing: boolean,
    isTodoModifing: boolean,
    setIsTodoModifing: (isTodoModifing:boolean) => void,
    todoList: TodoType[],
    setTodoList: (todoList:TodoType[]) => void,
}
const Todo = ({ todo, isAddTodoInputFocusing, isTodoModifing, setIsTodoModifing, todoList, setTodoList }:TodoProps) => {
    const { thisTodo, isModify, setIsModify, isDelete, setIsDelete, onModifyMode, onDeleteMode } = useModes();
    const [ modifiedTodoCheck, setModifiedTodoCheck, modifiedTodo, onModificationCancle, onModificationConfirm, onChangeModifyInput
    ] = useModifyTodo(isModify, setIsModify, todo, todoList, setTodoList, setIsTodoModifing);
    const [ onDeletionCancel, onDeletionConfirm 
    ] = useDeleteTodo(isDelete, setIsDelete, todo, todoList, setTodoList, setIsTodoModifing);

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

export default Todo;
