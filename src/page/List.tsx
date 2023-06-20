
import Container from '../components/common/Container';
import { useEffect, useState } from 'react';
import TodoList from '../components/todoList/TodoList';
import { TodoType } from '../types/todoList';
import { useNavigate } from 'react-router-dom';
import getTodoList from '../apis/todo/getTodoList';
import getAccessToken from '../util/getAccessToken';
import * as S from './List.style';

const List = () => {
    const [ todoList, setTodoList ] = useState<TodoType[]>([]);
    const [ alert, setAlert ] = useState<string>("");
    const navigate = useNavigate();

    const onClickLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/signin");
    }

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            return navigate("/signin");
        } else {
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
        }
    }, []);

    return (
    <>
        <S.BackgroundImage path={`${process.env.PUBLIC_URL}/img/background.jpg`}/>
        <Container>
            <>
                <S.MemoPad src={`${process.env.PUBLIC_URL}/img/memo-pad.svg`} alt="complete-Sign-Up-badge" />
                <TodoList todoList={todoList} setTodoList={setTodoList} />
                <S.Alert>{alert}</S.Alert>
                <S.RightButtonsWrapper className="flex">
                    <div className="top">

                    </div>
                    <div className="bottom">
                        <S.LogoutButton onClick={onClickLogout}>
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