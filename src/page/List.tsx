
import Container from '../components/common/Container';
import { useEffect, useState } from 'react';
import TodoList from '../components/todoList/TodoList';
import { TodoType } from '../types/todoList';
import getTodoList from '../apis/todo/getTodoList';
import * as S from './List.style';
import { useToken } from '../hooks/useToken';

const List = () => {
    const [ todoList, setTodoList ] = useState<TodoType[]>([]);
    const [ alert, setAlert ] = useState<string>("");
    const [ isLatestSort, setIsLatestSort ] = useState<boolean>(false);
    const { getToken, logout, checkTokenAndInvoke } = useToken();

    const onClickSort = () => {
        setIsLatestSort(!isLatestSort);
        const newTodoList = todoList.reverse();
        setTodoList(newTodoList);
    }

    useEffect(() => {
        const token = getToken();
        checkTokenAndInvoke(() => {
            token &&
            getTodoList(token)
            .then ( response => {
                if (Array.isArray(response)){
                    setTodoList(response);
                } else {
                    setAlert("✅오류 : 데이터를 가져올 수 없습니다");
                    console.log("✅getTodoList 에러", response);
                }
            }).catch ( e => {
                console.log("✅todo list 가져오기 에러", e);
            })
        });
    }, []);

    return (
    <>
        <S.BackgroundImage path={`${process.env.PUBLIC_URL}/img/background.jpg`}/>
        <Container>
            <>
                <S.MemoPad src={`${process.env.PUBLIC_URL}/img/memo-pad.svg`} alt="complete-Sign-Up-badge" />
                <TodoList todoList={todoList} setTodoList={setTodoList} isLatestSort={isLatestSort} />
                <S.Alert>{alert}</S.Alert>
                <S.RightButtonsWrapper className="flex">
                    <div className="top">
                        <S.SortButton onClick={onClickSort} isLatestSort={isLatestSort}>
                            <img src={`${process.env.PUBLIC_URL}/img/icon/ic-blue-arrow.svg`} alt="arrow-icon" />
                        </S.SortButton>
                    </div>
                    <div className="bottom">
                        <S.LogoutButton onClick={() => {logout()}}>
                            <img src={`${process.env.PUBLIC_URL}/img/icon/ic-logout.svg`} alt="logout-icon" />
                        </S.LogoutButton>
                    </div>
                </S.RightButtonsWrapper>
            </>
        </Container>
    </>
    );
};

export default List;