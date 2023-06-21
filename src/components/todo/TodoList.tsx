import Todo from "./Todo";
import { TodoType } from '../../types/todoList';
import Title from "../common/Title";
import onKeyPressEvent from "../../util/onKeyPressEvent";
import * as S from './TodoList.style';
import useNewTodoList from "../../hooks/todo/useNewTodoList";
import useModes from "../../hooks/todo/useModes";

type TodoListProps = {
    todoList: TodoType[],
    setTodoList: (todoList: TodoType[]) => void,
    isLatestSort: boolean,
}

const TodoList = ({ todoList, setTodoList, isLatestSort }:TodoListProps) => {
    const { isAddTodoInputFocusing, setIsAddTodoInputFocusing, isTodoModifing, setIsTodoModifing } = useModes();
    const { todoListEl, newTodo, setNewTodo, onChangeAddTodoInput, addNewTodo } = useNewTodoList(todoList, setTodoList, isLatestSort);

    return (
        <S.TodoWrapper>
            <Title />
            <S.TodoTopBox className="flex" isTodoModifing={isTodoModifing}>
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

export default TodoList;