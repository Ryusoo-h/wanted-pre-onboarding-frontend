import styled from 'styled-components';
import Container from '../components/common/Container';
import { useEffect, useState } from 'react';
import TodoList from '../components/todoList/TodoList';
import { TodoType } from '../types/todoList';
import { useNavigate } from 'react-router-dom';
import getTodoList from '../apis/todo/getTodoList';

const BackgroundImage = styled('div')<{path:string}>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    background-image: url(${props => props.path});
    background-position: center;
    background-size: 1920px 980px;
    background-repeat: no-repeat;
    animation-duration: 2.5s;
    animation-name: zoom-out;
    transition-timing-function: ease-out;
    @keyframes zoom-out {
        from {
            opacity: 0;
            background-size: 2016px 1029px;
        }
        to {
            opacity: 1;
            background-size: 1920px 980px;
        }
    }
`;

const MemoPad = styled.img`
    margin-top: -36px;
    width: 430px;
    height: 756px;
`;

const Alert = styled.p`
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 338px;
    text-align: center;
    color: #FF6868;
`;

const RightButtonsWrapper = styled.div`
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 0;
    right: -32px;
    transform: translateX(100%);
    height: 720px;
    padding: 20px 0 125px;
`;

const LogoutButton = styled.button`
    width: 66px;
    height: 66px;
    border-radius: 33px;
    background-color: #7B81A1;
    box-shadow: 0px 2px 8px rgba(110, 106, 150, 0.24);
    transition: all 0.2s ease-in;
    &:hover {
        background-color: #5162B9;
    }
`;

const List = () => {
    const [ todoList, setTodoList ] = useState<TodoType[]>([]);
    const [ alert, setAlert ] = useState<string>("");
    const navigate = useNavigate();

    const onClickLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/signin");
    }

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return navigate("/signin");
        } else {
            getTodoList(token)
            .then ( response => {
                if (Array.isArray(response)){
                    setTodoList(response);
                } else {
                    setAlert("오류 : 데이터를 가져올 수 없습니다");
                    console.log("getTodoList 에러", response);
                }
            }).catch ( e => {
                console.log("todo list 가져오기 에러", e);
            })
        }
    }, []);

    return (
    <>
        <BackgroundImage path={`${process.env.PUBLIC_URL}/img/background.jpg`}/>
        <Container>
            <>
                <MemoPad src={`${process.env.PUBLIC_URL}/img/memo-pad.svg`} alt="complete-Sign-Up-badge" />
                <TodoList todoList={todoList} />
                <Alert>{alert}</Alert>
                <RightButtonsWrapper className="flex">
                    <div className="top">

                    </div>
                    <div className="bottom">
                        <LogoutButton onClick={onClickLogout}>
                            <img src={`${process.env.PUBLIC_URL}/img/icon/ic-logout.svg`} alt="logout-icon" />
                        </LogoutButton>
                    </div>
                </RightButtonsWrapper>
            </>
        </Container>
    </>
    );
};

export default List;